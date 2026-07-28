import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useTema } from "@/composables/useTema";
import { useContactos } from "@/composables/useContactos";

export const useConfiguracionStore = defineStore("configuracion", () => {
    const { tema, alternar: alternarTema, establecer: establecerTema } = useTema();
    const { contactos, actualizar: actualizarContacto } = useContactos();

    const linternaActiva = ref(false);

    function alternarLinterna() {
        linternaActiva.value = !linternaActiva.value;
    }

    return {
        tema,
        alternarTema,
        establecerTema,
        contactos,
        actualizarContacto,
        linternaActiva: computed(() => linternaActiva.value),
        alternarLinterna,
    };
});
