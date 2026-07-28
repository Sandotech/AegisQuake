<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCuestionario } from "@/composables/useCuestionario";
import { useResultados } from "@/composables/useResultados";
import HeroCard from "@/components/HeroCard.vue";
import HeroMiniTarjeta from "@/components/HeroMiniTarjeta.vue";
import OpcionCuestionario from "@/components/OpcionCuestionario.vue";
import SemaforoResultado from "@/components/SemaforoResultado.vue";

const router = useRouter();
const c = useCuestionario();

const mostrarResultados = computed(() => c.mostrarResultados.value);
const pasoActual = computed(() => c.pasoActual.value);
const totalPasos = c.totalPasos;
const preguntaActual = computed(() => c.preguntaActual.value);
const respuestas = computed(() => c.respuestas.value);
const porcentajeProgreso = computed(() => c.porcentajeProgreso.value);
const textoProgreso = computed(() => c.textoProgreso.value);
const porcentajeFinal = computed(() => c.porcentajeFinal.value);

const porcentajeRef = computed(() => c.porcentajeFinal.value);
const { nivel, claseCss } = useResultados(porcentajeRef);

function getEstadoOpcion(preguntaIdx, opcionIdx) {
    const respuesta = respuestas.value[preguntaIdx];
    if (respuesta === null || respuesta === undefined) return "normal";

    const pregunta = c.preguntas[preguntaIdx];
    if (!pregunta) return "seleccionada";

    const opcionElegida = pregunta.opciones[respuesta];

    if (opcionIdx === respuesta) {
        return opcionElegida.correcta ? "correcta" : "incorrecta";
    }

    if (!opcionElegida.correcta && pregunta.opciones[opcionIdx].correcta) {
        return "correcta";
    }

    return "desactivada";
}

function seleccionarOpcion(preguntaIdx, opcionIdx) {
    c.seleccionar(preguntaIdx, opcionIdx);
}

function iniciar() {
    c.iniciar();
}

function avanzar() {
    c.avanzar();
}

function retroceder() {
    c.retroceder();
}

function reiniciar() {
    c.reiniciar();
}

const iconoReloj = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const iconoCheck = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>`;
const iconoEscudo = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
</script>

<template>
    <div class="inicio">
        <HeroCard
            etiqueta="Diagnóstico Express"
            titulo="¿Qué tan preparado estás?"
            descripcion="Responde 4 preguntas rápidas y descubre tu nivel de preparación ante emergencias naturales."
        >
            <template #tarjetas>
                <HeroMiniTarjeta
                    :icono="iconoReloj"
                    titulo="Solo 2 minutos"
                    subtitulo="4 preguntas rápidas"
                />
                <HeroMiniTarjeta
                    :icono="iconoCheck"
                    titulo="Resultado inmediato"
                    subtitulo="Con recomendaciones"
                />
                <HeroMiniTarjeta
                    :icono="iconoEscudo"
                    titulo="100% privado"
                    subtitulo="Sin registro ni datos"
                />
            </template>
        </HeroCard>

        <section v-if="!mostrarResultados" class="cuestionario-seccion">
            <div class="cuestionario-tarjeta">
                <div class="cuestionario-encabezado">
                    <div
                        class="progreso-barra"
                        role="progressbar"
                        :aria-valuenow="porcentajeProgreso"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progreso-relleno"
                            :style="{ width: porcentajeProgreso + '%' }"
                        ></div>
                    </div>
                    <div class="progreso-info">
                        {{ textoProgreso }}
                    </div>
                </div>

                <div class="cuestionario-viewport">
                    <div v-if="pasoActual === 0" class="diapositiva activa" key="inicio">
                        <span class="diapositiva__categoria">Comencemos</span>
                        <h2 class="diapositiva__titulo">Diagnóstico de Emergencias</h2>
                        <p class="diapositiva__descripcion">
                            Evalúa qué tan preparado estás ante emergencias naturales. Solo
                            4 preguntas rápidas.
                        </p>
                        <div class="cuestionario-acciones cuestionario-acciones--inicio">
                            <button class="boton boton-principal" @click="iniciar">
                                Comenzar Diagnóstico
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                            <button class="boton boton-saltar" @click="router.push('/emergencia')">
                                Ir directo al centro de emergencia →
                            </button>
                        </div>
                    </div>

                    <div
                        v-else-if="preguntaActual"
                        class="diapositiva activa"
                        :key="preguntaActual.id"
                    >
                        <span class="diapositiva__categoria">
                            {{ preguntaActual.categoria }}
                        </span>
                        <h2 class="diapositiva__titulo">
                            {{ preguntaActual.pregunta }}
                        </h2>

                        <div class="opciones">
                            <OpcionCuestionario
                                v-for="(opcion, i) in preguntaActual.opciones"
                                :key="i"
                                :texto="opcion.texto"
                                :es-correcta="opcion.correcta"
                                :estado="getEstadoOpcion(pasoActual - 1, i)"
                                :desactivada="respuestas[pasoActual - 1] !== null"
                                @seleccionar="seleccionarOpcion(pasoActual - 1, i)"
                            />
                        </div>

                        <div
                            v-if="respuestas[pasoActual - 1] !== null"
                            class="explicacion-contenedor"
                        >
                            <div
                                class="explicacion"
                                :class="{
                                    'explicacion--correcta': preguntaActual.opciones[
                                        respuestas[pasoActual - 1]
                                    ].correcta,
                                    'explicacion--incorrecta': !preguntaActual.opciones[
                                        respuestas[pasoActual - 1]
                                    ].correcta,
                                }"
                            >
                                <div class="explicacion__etiqueta">
                                    {{
                                        preguntaActual.opciones[
                                            respuestas[pasoActual - 1]
                                        ].correcta
                                            ? "¡Correcto!"
                                            : "Incorrecto"
                                    }}
                                </div>
                                {{ preguntaActual.explicacion }}
                            </div>
                        </div>

                        <div class="cuestionario-acciones">
                            <button
                                class="boton boton-atras"
                                @click="retroceder"
                            >
                                ← Atrás
                            </button>
                            <button
                                class="boton boton-principal"
                                :disabled="respuestas[pasoActual - 1] === null"
                                @click="avanzar"
                            >
                                {{ pasoActual === totalPasos
                                    ? "Ver resultados"
                                    : "Siguiente" }}
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
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-else class="resultados-seccion">
            <div class="resultados-tarjeta" :class="claseCss" id="tarjetaResultados">
                <div class="resultados-superior">
                    <SemaforoResultado :nivel="nivel.nivel" />
                    <div class="resultados-numero">
                        <span class="resultados-porcentaje">
                            {{ porcentajeFinal }}%
                        </span>
                        <span class="resultados-etiqueta">Tu Índice de Preparación</span>
                    </div>
                </div>

                <div class="resultados-cuerpo">
                    <div class="resultados-divisor"></div>
                    <h3 class="resultados-categoria">{{ nivel.etiqueta }}</h3>
                    <p class="resultados-mensaje">{{ nivel.mensaje }}</p>
                </div>

                <div class="resultados-consejos">
                    <h4 class="resultados-consejos-titulo">
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
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        Recomendaciones
                    </h4>
                    <ul class="resultados-lista-consejos">
                        <li v-for="(consejo, idx) in nivel.consejos" :key="idx">
                            {{ consejo }}
                        </li>
                    </ul>
                </div>

                <div class="resultados-acciones">
                    <router-link to="/emergencia" class="boton boton-principal">
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
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                            <path d="M2 17L12 22L22 17" />
                            <path d="M2 12L12 17L22 12" />
                        </svg>
                        Centro de Emergencia
                    </router-link>
                    <button class="boton boton-secundario" @click="reiniciar">
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
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                        Repetir diagnóstico
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.inicio {
    max-width: 720px;
    margin: 0 auto;
    padding: var(--espacio-xl) var(--espacio-lg) var(--espacio-3xl);
}

.cuestionario-tarjeta {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    box-shadow: var(--sombra-md);
    padding: var(--espacio-xl);
    min-height: 480px;
    display: flex;
    flex-direction: column;
}

.cuestionario-encabezado {
    margin-bottom: var(--espacio-xl);
}

.progreso-barra {
    width: 100%;
    height: 8px;
    background: var(--color-borde);
    border-radius: var(--radio-completo);
    overflow: hidden;
}

.progreso-relleno {
    height: 100%;
    background: linear-gradient(90deg, var(--color-principal), var(--color-secundario));
    border-radius: var(--radio-completo);
    transition: width var(--transicion-normal);
    width: 0%;
}

.progreso-info {
    text-align: center;
    font-size: 0.85rem;
    color: var(--color-texto-secundario);
    margin-top: var(--espacio-sm);
    font-weight: 500;
    min-height: 1.25rem;
}

.cuestionario-viewport {
    flex: 1;
    overflow: hidden;
    position: relative;
}

.diapositiva {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: aparecer var(--transicion-normal) ease forwards;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.diapositiva__categoria {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: var(--color-acento);
    color: var(--color-principal);
    padding: 0.3rem 0.85rem;
    border-radius: var(--radio-completo);
    margin-bottom: var(--espacio-md);
}

.diapositiva__titulo {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800;
    margin: 0 0 var(--espacio-md);
    color: var(--color-texto);
    line-height: 1.2;
}

.diapositiva__descripcion {
    color: var(--color-texto-secundario);
    margin: 0 0 var(--espacio-2xl);
    max-width: 420px;
}

.opciones {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-xl);
}

.explicacion-contenedor {
    width: 100%;
    margin-bottom: var(--espacio-xl);
    animation: aparecer var(--transicion-rapida) ease forwards;
}

.explicacion {
    width: 100%;
    padding: var(--espacio-md) var(--espacio-lg);
    background: var(--color-fondo);
    border-left: 4px solid var(--color-terciario);
    border-radius: var(--radio-md);
    text-align: left;
    font-size: 0.9rem;
    color: var(--color-texto);
    line-height: 1.6;
}

.explicacion__etiqueta {
    font-weight: 700;
    margin-bottom: var(--espacio-xs);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.explicacion--correcta {
    border-left-color: var(--color-exito);
}

.explicacion--correcta .explicacion__etiqueta {
    color: var(--color-exito-oscuro);
}

.explicacion--incorrecta {
    border-left-color: var(--color-critico);
}

.explicacion--incorrecta .explicacion__etiqueta {
    color: var(--color-critico-oscuro);
}

.cuestionario-acciones {
    display: flex;
    justify-content: space-between;
    gap: var(--espacio-md);
    margin-top: auto;
    padding-top: var(--espacio-lg);
    width: 100%;
}

.cuestionario-acciones--inicio {
    flex-direction: column;
    align-items: stretch;
    gap: var(--espacio-sm);
    max-width: 320px;
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

.boton-principal:hover:not(:disabled) {
    background: var(--color-secundario);
    transform: translateY(-2px);
    box-shadow: var(--sombra-lg);
}

.boton-principal:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.boton-secundario {
    background: transparent;
    color: var(--color-principal);
    border: 2px solid var(--color-borde);
}

.boton-secundario:hover {
    border-color: var(--color-principal);
    background: var(--color-acento);
    transform: translateY(-1px);
}

.boton-atras {
    background: transparent;
    color: var(--color-texto-secundario);
    font-weight: 500;
    padding: var(--espacio-md) var(--espacio-lg);
    border: 1px solid var(--color-borde);
}

.boton-atras:hover {
    color: var(--color-principal);
    border-color: var(--color-principal);
}

.boton-saltar {
    background: transparent;
    color: var(--color-texto-secundario);
    font-size: 0.9rem;
    padding: var(--espacio-sm) var(--espacio-md);
}

.boton-saltar:hover {
    color: var(--color-principal);
}

.resultados-seccion {
    width: 100%;
    animation: aparecer 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.resultados-tarjeta {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    box-shadow: var(--sombra-lg);
    overflow: hidden;
    transition: background var(--transicion-normal);
}

.resultados-superior {
    padding: var(--espacio-2xl) var(--espacio-xl);
    text-align: center;
    color: white;
    position: relative;
    transition: background var(--transicion-normal);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--espacio-lg);
}

.resultados-categoria--critico .resultados-superior {
    background: linear-gradient(135deg, #c62828 0%, #e53935 100%);
}

.resultados-categoria--advertencia .resultados-superior {
    background: linear-gradient(135deg, #f57f17 0%, #fdd835 100%);
}

.resultados-categoria--exito .resultados-superior {
    background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
}

.resultados-numero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--espacio-sm);
}

.resultados-porcentaje {
    font-size: clamp(3.5rem, 8vw, 5rem);
    font-weight: 800;
    font-family: var(--fuente-titulos);
    line-height: 1;
    color: white;
}

.resultados-etiqueta {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
}

.resultados-cuerpo {
    padding: var(--espacio-2xl) var(--espacio-xl) var(--espacio-lg);
    text-align: center;
}

.resultados-divisor {
    width: 60px;
    height: 3px;
    border-radius: var(--radio-completo);
    margin: 0 auto var(--espacio-lg);
    background: var(--color-texto-secundario);
}

.resultados-categoria {
    font-family: var(--fuente-titulos);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 var(--espacio-sm);
    color: var(--color-texto);
}

.resultados-categoria--critico .resultados-categoria {
    color: var(--color-critico-oscuro);
}

.resultados-categoria--advertencia .resultados-categoria {
    color: var(--color-advertencia-oscuro);
}

.resultados-categoria--exito .resultados-categoria {
    color: var(--color-exito-oscuro);
}

.resultados-mensaje {
    font-size: 1rem;
    color: var(--color-texto);
    line-height: 1.6;
    margin: 0;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
}

.resultados-consejos {
    margin: 0 var(--espacio-xl) var(--espacio-xl);
    padding: 12px 24px !important;
    background: var(--color-fondo);
    border-radius: var(--radio-lg);
}

.resultados-consejos-titulo {
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    font-size: 0.95rem;
    font-family: var(--fuente-titulos);
    margin: 0 0 var(--espacio-md);
    color: var(--color-texto);
}

.resultados-lista-consejos {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-sm);
    list-style: none;
    padding: 0;
    margin: 0;
}

.resultados-lista-consejos li {
    font-size: 0.9rem;
    color: var(--color-texto);
    padding-left: var(--espacio-lg);
    position: relative;
    line-height: 1.5;
}

.resultados-lista-consejos li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-principal);
}

.resultados-categoria--critico .resultados-lista-consejos li::before {
    background: var(--color-critico);
}

.resultados-categoria--advertencia .resultados-lista-consejos li::before {
    background: var(--color-advertencia-oscuro);
}

.resultados-categoria--exito .resultados-lista-consejos li::before {
    background: var(--color-exito);
}

.resultados-acciones {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-sm);
    padding: 0 var(--espacio-xl) var(--espacio-2xl);
}

.resultados-acciones .boton {
    width: 100%;
}

@media (max-width: 640px) {
    .cuestionario-tarjeta {
        padding: var(--espacio-lg);
    }

    .resultados-superior {
        padding: var(--espacio-xl) var(--espacio-md);
    }

    .resultados-consejos,
    .resultados-acciones {
        margin-left: var(--espacio-md);
        margin-right: var(--espacio-md);
        padding-left: 0;
        padding-right: 0;
    }
}

@media (max-width: 480px) {
    .inicio {
        padding: var(--espacio-md);
    }
}
</style>
