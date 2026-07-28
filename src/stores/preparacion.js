import { defineStore } from "pinia";
import { useChecklist } from "@/composables/useChecklist";

export const usePreparacionStore = defineStore("preparacion", () => {
    const checklist = useChecklist();

    return {
        estados: checklist.estados,
        hechos: checklist.hechos,
        porcentaje: checklist.porcentaje,
        nivel: checklist.nivel,
        total: checklist.total,
        alternar: checklist.alternar,
        reiniciar: checklist.reiniciar,
    };
});
