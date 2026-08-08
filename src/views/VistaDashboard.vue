<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useMonitoreo } from "@/composables/useMonitoreo";
import MedidorCircular from "@/components/MedidorCircular.vue";
import GraficaMini from "@/components/GraficaMini.vue";

const {
    conectado,
    horaActualizacion,
    nivelGlobal,
    motivoAlerta,
    temperatura,
    humedad,
    gas,
    llamaConfirmada,
    gasCalibrado,
    ejes,
    magnitudVibracion,
    estadoTemperatura,
    estadoHumedad,
    estadoGas,
    estadoVibracion,
    porcTemp,
    porcHum,
    porcGas,
    porcSismo,
    historial,
    iniciar,
    detener,
} = useMonitoreo();

onMounted(iniciar);
onUnmounted(detener);

const tituloSemaforo = computed(() => {
    if (nivelGlobal.value === "critico") return "ALERTA";
    if (nivelGlobal.value === "advertencia") return "ADVERTENCIA";
    return "NIVELES NORMALES";
});

const acel = computed(() => [
    { eje: "X", valor: ejes.value.ax },
    { eje: "Y", valor: ejes.value.ay },
    { eje: "Z", valor: ejes.value.az },
]);

const giro = computed(() => [
    { eje: "X", valor: ejes.value.gx },
    { eje: "Y", valor: ejes.value.gy },
    { eje: "Z", valor: ejes.value.gz },
]);

function barraDe(valor, maximo) {
    const pct = Math.min(100, (Math.abs(valor) / maximo) * 100);
    if (valor < 0) return { left: `calc(50% - ${pct}%)`, width: `${pct}%` };
    return { left: "50%", width: `${pct}%` };
}

const histTemperatura = computed(() => historial.value.map((h) => h.temperatura));
const histHumedad = computed(() => historial.value.map((h) => h.humedad));
const histGas = computed(() => historial.value.map((h) => h.gas));
const histVibracion = computed(() => historial.value.map((h) => h.vibracion));
</script>

<template>
    <div class="dashboard">
        <section class="hero">
            <div class="hero__contenido">
                <div class="hero__saludo">
                    <span class="hero__etiqueta">Panel de monitoreo</span>
                    <h1 class="hero__titulo">Dashboard ESP32</h1>
                    <p class="hero__subtitulo">
                        Monitoreo en tiempo real de los sensores conectados al sistema.
                    </p>
                </div>

                <div class="hero__estado">
                    <div class="estado-card">
                        <span class="estado-card__etiqueta">Conexión</span>
                        <span
                            class="estado-card__valor"
                            :class="{ 'estado-card__valor--activo': conectado }"
                        >
                            {{ conectado ? "En vivo" : "Detenido" }}
                        </span>
                        <span class="estado-card__hora">
                            Últ. dato {{ horaActualizacion }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section class="semaforo" :class="`semaforo--${nivelGlobal}`">
            <span class="semaforo__icono" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path v-if="nivelGlobal === 'normal'" d="m9 12 2 2 4-4" />
                    <template v-else>
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                    </template>
                </svg>
            </span>
            <div class="semaforo__texto">
                <strong class="semaforo__titulo">{{ tituloSemaforo }}</strong>
                <span class="semaforo__detalle">{{ motivoAlerta }}</span>
            </div>
        </section>

        <section class="llama" :class="{ 'llama--activa': llamaConfirmada }">
            <span class="llama__icono" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
            </span>
            <div class="llama__texto">
                <strong>
                    {{
                        llamaConfirmada
                            ? "¡Fuego detectado!"
                            : "Sin detección de llama"
                    }}
                </strong>
                <span>
                    {{
                        llamaConfirmada
                            ? "Activa el protocolo de emergencia inmediatamente."
                            : "El sensor de llama no reporta incendios."
                    }}
                </span>
            </div>
        </section>

        <section class="medidores-grid">
            <MedidorCircular
                etiqueta="Temperatura"
                :valor="temperatura"
                unidad="°C"
                :porcentaje="porcTemp"
                :estado="estadoTemperatura"
            />
            <MedidorCircular
                etiqueta="Humedad"
                :valor="humedad"
                unidad="%"
                :porcentaje="porcHum"
                :estado="estadoHumedad"
            />
            <MedidorCircular
                etiqueta="Gas"
                :valor="gas"
                unidad="ppm"
                :porcentaje="porcGas"
                :estado="estadoGas"
            />
            <MedidorCircular
                etiqueta="Sismicidad"
                :valor="magnitudVibracion.toFixed(2)"
                :porcentaje="porcSismo"
                :estado="estadoVibracion"
            />
        </section>

        <p v-if="!gasCalibrado" class="calibracion-nota">
            Calibrando sensor de gas… ({{ gas }} en lectura base)
        </p>

        <section class="mpu-card">
            <div class="mpu-card__encabezado">
                <h2 class="seccion__titulo">MPU6050</h2>
                <p class="seccion__subtitulo">
                    Acelerómetro y giroscopio — actividad por eje del sensor.
                </p>
            </div>

            <div class="mpu-card__grupos">
                <div class="mpu-grupo">
                    <h3 class="mpu-grupo__titulo">
                        Acelerómetro <small>m/s²</small>
                    </h3>
                    <div v-for="eje in acel" :key="`a-${eje.eje}`" class="eje">
                        <span class="eje__etiqueta">{{ eje.eje }}</span>
                        <div class="eje__barra">
                            <div class="eje__relleno" :style="barraDe(eje.valor, 12)"></div>
                        </div>
                        <span class="eje__valor">{{ eje.valor.toFixed(2) }}</span>
                    </div>
                </div>

                <div class="mpu-grupo">
                    <h3 class="mpu-grupo__titulo">
                        Giroscopio <small>rad/s</small>
                    </h3>
                    <div v-for="eje in giro" :key="`g-${eje.eje}`" class="eje">
                        <span class="eje__etiqueta">{{ eje.eje }}</span>
                        <div class="eje__barra">
                            <div class="eje__relleno" :style="barraDe(eje.valor, 0.35)"></div>
                        </div>
                        <span class="eje__valor">{{ eje.valor.toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="seccion">
            <div class="seccion__encabezado">
                <h2 class="seccion__titulo">Tendencias</h2>
                <p class="seccion__subtitulo">
                    Últimas {{ historial.length }} lecturas del sistema.
                </p>
            </div>

            <div class="tendencias-grid">
                <div class="tendencia-card">
                    <div class="tendencia-card__encabezado">
                        <strong>Temperatura</strong>
                        <span>{{ temperatura }} °C</span>
                    </div>
                    <GraficaMini :datos="histTemperatura" :maximo="40" color="var(--color-principal)" />
                </div>

                <div class="tendencia-card">
                    <div class="tendencia-card__encabezado">
                        <strong>Humedad</strong>
                        <span>{{ humedad }}%</span>
                    </div>
                    <GraficaMini :datos="histHumedad" :maximo="100" color="var(--color-exito)" />
                </div>

                <div class="tendencia-card">
                    <div class="tendencia-card__encabezado">
                        <strong>Gas</strong>
                        <span>{{ gas }} ppm</span>
                    </div>
                    <GraficaMini :datos="histGas" :maximo="1024" color="var(--color-advertencia-oscuro)" />
                </div>

                <div class="tendencia-card">
                    <div class="tendencia-card__encabezado">
                        <strong>Vibración</strong>
                        <span>{{ magnitudVibracion.toFixed(2) }}</span>
                    </div>
                    <GraficaMini :datos="histVibracion" :maximo="1.5" color="var(--color-critico)" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.dashboard {
    max-width: 880px;
    margin: 0 auto;
    padding: var(--espacio-xl) var(--espacio-lg) var(--espacio-3xl);
}

.hero {
    background: linear-gradient(135deg, #1b4ef5 0%, #3874ff 50%, #5996ff 100%);
    border-radius: var(--radio-xl);
    padding: var(--espacio-2xl) var(--espacio-xl);
    color: white;
    margin-bottom: var(--espacio-xl);
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
    align-items: center;
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

.estado-card__hora {
    font-size: 0.75rem;
    opacity: 0.85;
    color: white;
    margin-top: 0.2rem;
}

.semaforo {
    display: flex;
    align-items: center;
    gap: var(--espacio-lg);
    border-radius: var(--radio-xl);
    padding: var(--espacio-lg) var(--espacio-xl);
    margin-bottom: var(--espacio-xl);
    border: 1px solid var(--color-borde);
    background: var(--color-superficie);
    box-shadow: var(--sombra-sm);
    transition: border-color var(--transicion-normal),
        box-shadow var(--transicion-normal);
}

.semaforo__icono {
    width: 52px;
    height: 52px;
    border-radius: var(--radio-lg);
    display: grid;
    place-items: center;
    background: var(--color-exito-claro);
    color: var(--color-exito-oscuro);
    flex-shrink: 0;
    transition: background var(--transicion-normal),
        color var(--transicion-normal), box-shadow var(--transicion-normal);
}

.semaforo__icono svg {
    width: 30px;
    height: 30px;
}

.semaforo--advertencia .semaforo__icono {
    background: var(--color-advertencia-claro);
    color: var(--color-advertencia-oscuro);
}

.semaforo--critico .semaforo__icono {
    background: var(--color-critico-claro);
    color: var(--color-critico-oscuro);
    box-shadow: 0 0 0 6px rgba(229, 57, 53, 0.15),
        0 6px 18px rgba(229, 57, 53, 0.35);
}

.semaforo__texto {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.semaforo__titulo {
    font-family: var(--fuente-titulos);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.02em;
}

.semaforo__detalle {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-texto-secundario);
}

.semaforo--normal {
    border-color: var(--color-exito);
}

.semaforo--normal .semaforo__titulo {
    color: var(--color-exito-oscuro);
}

.semaforo--advertencia {
    border-color: var(--color-advertencia);
}

.semaforo--advertencia .semaforo__titulo {
    color: var(--color-advertencia-oscuro);
}

.semaforo--critico {
    border-color: var(--color-critico);
}

.semaforo--critico .semaforo__titulo {
    color: var(--color-critico-oscuro);
}

:global([data-theme="dark"]) .semaforo--normal .semaforo__titulo {
    color: #81c784;
}

:global([data-theme="dark"]) .semaforo--advertencia .semaforo__titulo {
    color: #ffe082;
}

:global([data-theme="dark"]) .semaforo--critico .semaforo__titulo {
    color: #ef9a9a;
}

.medidores-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--espacio-md);
    margin-bottom: var(--espacio-xl);
}

.calibracion-nota {
    margin: -0.5rem 0 var(--espacio-xl);
    font-size: 0.85rem;
    color: var(--color-texto-secundario);
}

.mpu-card {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-xl);
    padding: var(--espacio-xl);
    box-shadow: var(--sombra-sm);
    margin-bottom: var(--espacio-xl);
}

.seccion__titulo {
    font-size: clamp(1.35rem, 3vw, 1.875rem);
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

.mpu-card .seccion__subtitulo {
    margin-bottom: var(--espacio-lg);
}

.mpu-card__grupos {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--espacio-xl);
}

.mpu-grupo__titulo {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-texto);
    margin: 0 0 var(--espacio-md);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.mpu-grupo__titulo small {
    font-weight: 500;
    color: var(--color-texto-secundario);
    text-transform: none;
}

.eje {
    display: grid;
    grid-template-columns: 24px 1fr 56px;
    align-items: center;
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-sm);
}

.eje__etiqueta {
    font-weight: 700;
    color: var(--color-texto-secundario);
    text-align: center;
}

.eje__barra {
    position: relative;
    height: 8px;
    background: var(--color-borde);
    border-radius: var(--radio-completo);
    overflow: hidden;
}

.eje__barra::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(0, 0, 0, 0.12);
}

.eje__relleno {
    position: absolute;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, var(--color-secundario), var(--color-principal));
    border-radius: var(--radio-completo);
    transition: left var(--transicion-normal), width var(--transicion-normal);
}

.eje__valor {
    font-family: var(--fuente-titulos);
    font-weight: 700;
    font-size: 0.85rem;
    text-align: right;
    color: var(--color-texto);
}

.llama {
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    border-radius: var(--radio-xl);
    padding: var(--espacio-lg) var(--espacio-xl);
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    color: var(--color-texto);
    margin-bottom: var(--espacio-xl);
    box-shadow: var(--sombra-sm);
    transition: border-color var(--transicion-normal),
        box-shadow var(--transicion-normal);
}

.llama--activa {
    border-color: var(--color-critico);
    box-shadow: 0 0 0 4px rgba(229, 57, 53, 0.1), var(--sombra-md);
}

.llama__icono {
    width: 52px;
    height: 52px;
    border-radius: var(--radio-lg);
    display: grid;
    place-items: center;
    background: var(--color-exito-claro);
    color: var(--color-exito-oscuro);
    flex-shrink: 0;
    transition: background var(--transicion-normal),
        color var(--transicion-normal);
}

.llama__icono svg {
    width: 28px;
    height: 28px;
}

.llama--activa .llama__icono {
    background: linear-gradient(135deg, #ff9800, var(--color-critico));
    color: #fff;
    box-shadow: 0 0 0 6px rgba(229, 57, 53, 0.15),
        0 6px 18px rgba(229, 57, 53, 0.35);
    animation: llama-fuego 0.8s ease-in-out infinite;
}

.llama__texto {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.llama__texto strong {
    font-family: var(--fuente-titulos);
    font-size: 1.05rem;
    font-weight: 800;
}

.llama__texto span {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-texto-secundario);
}

@keyframes llama-fuego {
    0%,
    100% {
        transform: scale(1) rotate(-3deg);
    }
    25% {
        transform: scale(1.07) rotate(2deg);
    }
    50% {
        transform: scale(0.96) rotate(-2deg);
    }
    75% {
        transform: scale(1.05) rotate(3deg);
    }
}

:global([data-theme="dark"]) .llama {
    border-color: rgba(255, 255, 255, 0.12);
}

:global([data-theme="dark"]) .llama--activa {
    border-color: var(--color-critico);
}

.tendencias-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--espacio-md);
}

.tendencia-card {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-xl);
    padding: var(--espacio-lg);
    box-shadow: var(--sombra-sm);
}

.tendencia-card__encabezado {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-sm);
}

.tendencia-card__encabezado strong {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-texto);
}

.tendencia-card__encabezado span {
    font-family: var(--fuente-titulos);
    font-weight: 700;
    font-size: 1rem;
    color: var(--color-texto);
}

@media (min-width: 640px) {
    .medidores-grid {
        grid-template-columns: 1fr 1fr;
    }

    .mpu-card__grupos {
        grid-template-columns: 1fr 1fr;
    }

    .tendencias-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (min-width: 900px) {
    .medidores-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 640px) {
    .hero__contenido {
        flex-direction: column;
        text-align: center;
    }

    .hero__subtitulo {
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
