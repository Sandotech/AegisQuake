import { ref, computed, watch } from "vue";

const CHECKLIST_KEY = "expomierda_checklist_v2";
const TOTAL_ITEMS = 14;
const CIRCUNFERENCIA = 2 * Math.PI * 60;

const estados = ref(new Array(TOTAL_ITEMS).fill(false));

function cargarEstados() {
    try {
        const guardado = localStorage.getItem(CHECKLIST_KEY);
        if (guardado) {
            const parsed = JSON.parse(guardado);
            if (Array.isArray(parsed) && parsed.length === TOTAL_ITEMS) {
                estados.value = parsed;
            }
        }
    } catch (e) {
        // localStorage no disponible
    }
}

watch(
    estados,
    (nuevo) => {
        try {
            localStorage.setItem(CHECKLIST_KEY, JSON.stringify(nuevo));
        } catch (e) {
            // localStorage no disponible
        }
    },
    { deep: true }
);

cargarEstados();

function obtenerNivel(porcentaje) {
    if (porcentaje === 0) return { texto: "Empezando", clase: "empezando" };
    if (porcentaje < 30) return { texto: "Inicial", clase: "inicial" };
    if (porcentaje < 60) return { texto: "En progreso", clase: "progreso" };
    if (porcentaje < 90) return { texto: "Casi listo", clase: "casi-listo" };
    return { texto: "Preparado", clase: "preparado" };
}

export function useChecklist() {
    const hechos = computed(() => estados.value.filter((e) => e).length);
    const porcentaje = computed(() =>
        Math.round((hechos.value / TOTAL_ITEMS) * 100)
    );
    const nivel = computed(() => obtenerNivel(porcentaje.value));

    const offset = computed(
        () => CIRCUNFERENCIA - (CIRCUNFERENCIA * porcentaje.value) / 100
    );

    const colorAnillo = computed(() => {
        if (porcentaje.value < 30) return "var(--color-critico)";
        if (porcentaje.value < 70) return "var(--color-advertencia-oscuro)";
        return "var(--color-exito)";
    });

    function alternar(indice) {
        const nuevo = [...estados.value];
        nuevo[indice] = !nuevo[indice];
        estados.value = nuevo;
    }

    function reiniciar() {
        estados.value = new Array(TOTAL_ITEMS).fill(false);
    }

    return {
        estados,
        hechos,
        porcentaje,
        nivel,
        offset,
        colorAnillo,
        total: TOTAL_ITEMS,
        circunferencia: CIRCUNFERENCIA,
        alternar,
        reiniciar,
    };
}
