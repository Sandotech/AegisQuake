import { computed } from "vue";
import { nivelesResultado } from "@/data/preguntas.js";

export function useResultados(porcentaje) {
    const nivel = computed(() => {
        return (
            nivelesResultado.find(
                (n) => porcentaje.value >= n.rango[0] && porcentaje.value <= n.rango[1]
            ) || nivelesResultado[0]
        );
    });

    const claseCss = computed(() => `resultados__categoria--${nivel.value.nivel}`);

    return {
        nivel,
        claseCss,
    };
}
