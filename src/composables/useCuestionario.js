import { ref, computed } from "vue";
import { preguntas as bancoPreguntas } from "@/data/preguntas.js";

export function useCuestionario(preguntas = bancoPreguntas) {
    const pasoActual = ref(0);
    const totalPasos = preguntas.length;
    const respuestas = ref(new Array(totalPasos).fill(null));

    const mostrarResultados = ref(false);

    const preguntaActual = computed(() =>
        pasoActual.value > 0 && pasoActual.value <= totalPasos
            ? preguntas[pasoActual.value - 1]
            : null
    );

    const porcentajeProgreso = computed(() => {
        if (mostrarResultados.value) return 100;
        return (pasoActual.value / totalPasos) * 100;
    });

    const textoProgreso = computed(() => {
        if (mostrarResultados.value) return "Completado";
        if (pasoActual.value === 0) return "";
        return `Pregunta ${pasoActual.value} de ${totalPasos}`;
    });

    const respuestasCorrectas = computed(() =>
        respuestas.value.reduce((contador, respuesta, i) => {
            if (respuesta !== null && preguntas[i].opciones[respuesta].correcta) {
                return contador + 1;
            }
            return contador;
        }, 0)
    );

    const porcentajeFinal = computed(() =>
        Math.round((respuestasCorrectas.value / totalPasos) * 100)
    );

    function iniciar() {
        pasoActual.value = 1;
    }

    function avanzar() {
        if (pasoActual.value > totalPasos) return;
        pasoActual.value++;
        if (pasoActual.value > totalPasos) {
            mostrarResultados.value = true;
        }
    }

    function retroceder() {
        if (pasoActual.value <= 0) return;
        pasoActual.value--;
        mostrarResultados.value = false;
    }

    function seleccionar(preguntaIdx, opcionIdx) {
        const pregunta = preguntas[preguntaIdx];
        if (!pregunta) return;
        const yaRespondida =
            respuestas.value[preguntaIdx] !== null &&
            (pregunta.opciones[respuestas.value[preguntaIdx]].correcta ||
                pregunta.opciones[respuestas.value[preguntaIdx]].correcta === false);
        if (yaRespondida) return;

        const nuevasRespuestas = [...respuestas.value];
        nuevasRespuestas[preguntaIdx] = opcionIdx;
        respuestas.value = nuevasRespuestas;
    }

    function reiniciar() {
        pasoActual.value = 0;
        respuestas.value = new Array(totalPasos).fill(null);
        mostrarResultados.value = false;
    }

    function saltar() {
        mostrarResultados.value = false;
        pasoActual.value = 0;
    }

    return {
        pasoActual,
        totalPasos,
        respuestas,
        mostrarResultados,
        preguntaActual,
        preguntas,
        porcentajeProgreso,
        textoProgreso,
        respuestasCorrectas,
        porcentajeFinal,
        iniciar,
        avanzar,
        retroceder,
        seleccionar,
        reiniciar,
        saltar,
    };
}
