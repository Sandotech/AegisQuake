<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const temperatura = ref("--");
const humedad = ref("--");
const conectado = ref(false);
const monitoreoActivo = ref(true);
const ventiladorActivo = ref(false);
const alarmaActiva = ref(false);

let puerto = null;
let lector = null;
let intervalo = null;

async function conectar() {
    if (!("serial" in navigator)) {
        console.warn("Web Serial API no soportada en este navegador");
        return;
    }

    try {
        puerto = await navigator.serial.requestPort();
        await puerto.open({ baudRate: 9600 });
        conectado.value = true;

        const decoder = new TextDecoder();
        let buffer = "";

        while (puerto.readable && conectado.value) {
            lector = puerto.readable.getReader();
            try {
                while (true) {
                    const { value, done } = await lector.read();
                    if (done) break;
                    buffer += decoder.decode(value);
                    if (buffer.includes("\n")) {
                        const lineas = buffer.split("\n");
                        buffer = lineas.pop();
                        for (const linea of lineas) {
                            const partes = linea.trim().split(",");
                            if (partes.length === 2) {
                                temperatura.value = partes[0];
                                humedad.value = partes[1];
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Error leyendo:", e);
            } finally {
                lector.releaseLock();
            }
        }
    } catch (e) {
        console.error("No se pudo conectar al Arduino:", e);
        conectado.value = false;
    }
}

async function enviarComando(comando) {
    if (!puerto || !puerto.writable) return;
    const writer = puerto.writable.getWriter();
    const data = new TextEncoder().encode(comando);
    await writer.write(data);
    writer.releaseLock();
}

async function toggleMonitoreo() {
    monitoreoActivo.value = !monitoreoActivo.value;
    await enviarComando("M");
}

async function toggleVentilador() {
    ventiladorActivo.value = !ventiladorActivo.value;
    await enviarComando("V");
}

async function toggleAlarma() {
    alarmaActiva.value = !alarmaActiva.value;
    await enviarComando("A");
}

async function desconectar() {
    conectado.value = false;
    if (lector) {
        try {
            await lector.cancel();
        } catch (e) {}
    }
    if (puerto) {
        try {
            await puerto.close();
        } catch (e) {}
    }
}

onUnmounted(() => {
    desconectar();
    if (intervalo) clearInterval(intervalo);
});
</script>

<template>
    <div class="monitoreo">
        <section class="hero">
            <div class="hero__contenido">
                <div class="hero__saludo">
                    <span class="hero__etiqueta">Panel de Control</span>
                    <h1 class="hero__titulo">Monitoreo Arduino</h1>
                    <p class="hero__subtitulo">
                        Visualiza los datos de los sensores en tiempo real y controla los actuadores
                        del sistema.
                    </p>
                </div>

                <div class="hero__estado">
                    <div class="estado-card">
                        <span class="estado-card__etiqueta">Estado</span>
                        <span
                            class="estado-card__valor"
                            :class="{ 'estado-card__valor--activo': conectado }"
                        >
                            {{ conectado ? "Conectado" : "Desconectado" }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section class="seccion">
            <div class="tarjeta-conexion">
                <h2 class="seccion__titulo">Conexión Serial</h2>
                <p class="seccion__subtitulo">
                    Conecta tu Arduino vía Web Serial API. Compatible con Chrome, Edge y Opera.
                </p>

                <div class="conexion-acciones">
                    <button
                        v-if="!conectado"
                        class="boton boton-principal"
                        @click="conectar"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        Conectar Arduino
                    </button>
                    <button v-else class="boton boton-secundario" @click="desconectar">
                        Desconectar
                    </button>
                </div>
            </div>
        </section>

        <section v-if="conectado" class="seccion">
            <div class="sensores-grid">
                <div class="sensor-card">
                    <span class="sensor-card__icono">TEMP</span>
                    <div class="sensor-card__info">
                        <strong class="sensor-card__valor">
                            {{ temperatura }}<span class="sensor-card__unidad">°C</span>
                        </strong>
                        <small>Temperatura</small>
                    </div>
                </div>

                <div class="sensor-card">
                    <span class="sensor-card__icono">HUM</span>
                    <div class="sensor-card__info">
                        <strong class="sensor-card__valor">
                            {{ humedad }}<span class="sensor-card__unidad">%</span>
                        </strong>
                        <small>Humedad</small>
                    </div>
                </div>
            </div>

            <div class="controles-grid">
                <button
                    class="control-card"
                    :class="{ 'control-card--activo': monitoreoActivo }"
                    @click="toggleMonitoreo"
                >
                    <span class="control-card__titulo">Monitoreo</span>
                    <span class="control-card__estado">
                        {{ monitoreoActivo ? "Activo" : "Inactivo" }}
                    </span>
                </button>

                <button
                    class="control-card"
                    :class="{ 'control-card--activo': ventiladorActivo }"
                    @click="toggleVentilador"
                >
                    <span class="control-card__titulo">Ventilador</span>
                    <span class="control-card__estado">
                        {{ ventiladorActivo ? "Encendido" : "Apagado" }}
                    </span>
                </button>

                <button
                    class="control-card"
                    :class="{ 'control-card--activo': alarmaActiva }"
                    @click="toggleAlarma"
                >
                    <span class="control-card__titulo">Alarma</span>
                    <span class="control-card__estado">
                        {{ alarmaActiva ? "Activada" : "Desactivada" }}
                    </span>
                </button>
            </div>
        </section>

        <section v-else class="seccion">
            <div class="tarjeta-info">
                <h3>Funcionalidad disponible</h3>
                <ul>
                    <li>Lectura en tiempo real de temperatura y humedad (DHT11)</li>
                    <li>Control remoto del ventilador y alarma buzzer</li>
                    <li>Visualización del estado del sistema en LCD 16x2</li>
                </ul>
                <p>
                    Esta página utiliza la
                    <strong>Web Serial API</strong> para comunicarse directamente con tu
                    Arduino. Asegúrate de tener Chrome, Edge u Opera para poder conectar.
                </p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.monitoreo {
    max-width: 880px;
    margin: 0 auto;
    padding: var(--espacio-xl) var(--espacio-lg) var(--espacio-3xl);
}

/* Reutiliza estilos del hero del emergencia */
.hero {
    background: linear-gradient(135deg, #1b4ef5 0%, #3874ff 50%, #5996ff 100%);
    border-radius: var(--radio-xl);
    padding: var(--espacio-2xl) var(--espacio-xl);
    color: white;
    margin-bottom: var(--espacio-3xl);
    position: relative;
    overflow: hidden;
}

:global([data-theme="dark"]) .hero {
    background: linear-gradient(135deg, #0e2a9a 0%, #1b4ef5 100%);
}

.hero__contenido {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--espacio-xl);
}

.hero__saludo {
    flex: 1;
}

.hero__etiqueta {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radio-completo);
    margin-bottom: var(--espacio-md);
}

.hero__titulo {
    color: white;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 var(--espacio-sm);
}

.hero__subtitulo {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    margin: 0;
    max-width: 480px;
}

.hero__estado {
    flex-shrink: 0;
}

.estado-card {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.12);
    padding: var(--espacio-md) var(--espacio-lg);
    border-radius: var(--radio-xl);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.estado-card__etiqueta {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.8;
    color: white;
}

.estado-card__valor {
    font-family: var(--fuente-titulos);
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
}

.estado-card__valor--activo {
    color: #b9f6ca;
}

.seccion {
    margin-bottom: var(--espacio-3xl);
}

.seccion__titulo {
    font-size: clamp(1.5rem, 3.5vw, 1.875rem);
    font-weight: 700;
    margin: 0 0 var(--espacio-sm);
    color: var(--color-texto);
}

.seccion__subtitulo {
    font-size: 1rem;
    color: var(--color-texto-secundario);
    margin: 0 0 var(--espacio-xl);
    max-width: 540px;
}

.tarjeta-conexion,
.tarjeta-info {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    padding: var(--espacio-xl);
    box-shadow: var(--sombra-md);
}

.tarjeta-info h3 {
    margin: 0 0 var(--espacio-md);
    color: var(--color-texto);
}

.tarjeta-info ul {
    margin: 0 0 var(--espacio-md);
    padding-left: var(--espacio-lg);
    color: var(--color-texto);
}

.tarjeta-info p {
    margin: 0;
    color: var(--color-texto-secundario);
}

.boton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--espacio-sm);
    padding: var(--espacio-md) var(--espacio-xl);
    border-radius: var(--radio-lg);
    font-weight: 600;
    font-size: 1rem;
    transition: all var(--transicion-rapida);
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: var(--fuente-principal);
}

.boton-principal {
    background: var(--color-principal);
    color: white;
    box-shadow: var(--sombra-md);
}

.boton-principal:hover {
    background: var(--color-secundario);
    transform: translateY(-2px);
    box-shadow: var(--sombra-lg);
}

.boton-secundario {
    background: transparent;
    color: var(--color-principal);
    border: 2px solid var(--color-borde);
}

.boton-secundario:hover {
    border-color: var(--color-principal);
    background: var(--color-acento);
}

.sensores-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--espacio-md);
    margin-bottom: var(--espacio-xl);
}

.sensor-card {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-xl);
    padding: var(--espacio-xl);
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    box-shadow: var(--sombra-sm);
}

.sensor-card__icono {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-principal);
    color: white;
    border-radius: var(--radio-md);
    font-weight: 800;
    font-size: 0.85rem;
    flex-shrink: 0;
}

.sensor-card__info {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
}

.sensor-card__valor {
    font-family: var(--fuente-titulos);
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-texto);
}

.sensor-card__unidad {
    font-size: 1.25rem;
    font-weight: 600;
    opacity: 0.6;
}

.sensor-card__info small {
    font-size: 0.85rem;
    color: var(--color-texto-secundario);
    margin-top: 0.2rem;
}

.controles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--espacio-md);
}

.control-card {
    background: var(--color-superficie);
    border: 2px solid var(--color-borde);
    border-radius: var(--radio-xl);
    padding: var(--espacio-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--espacio-sm);
    cursor: pointer;
    font-family: var(--fuente-principal);
    color: var(--color-texto);
    transition: all var(--transicion-rapida);
}

.control-card:hover {
    border-color: var(--color-principal);
    transform: translateY(-2px);
    box-shadow: var(--sombra-md);
}

.control-card--activo {
    border-color: var(--color-exito);
    background: var(--color-exito-claro);
}

:global([data-theme="dark"]) .control-card--activo {
    background: rgba(67, 160, 71, 0.15);
}

.control-card__titulo {
    font-weight: 700;
    font-size: 1rem;
}

.control-card__estado {
    font-size: 0.8rem;
    color: var(--color-texto-secundario);
    font-weight: 500;
}

@media (max-width: 768px) {
    .hero__contenido {
        flex-direction: column;
        text-align: center;
    }

    .sensores-grid,
    .controles-grid {
        grid-template-columns: 1fr;
    }
}
</style>
