import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useTema } from "@/composables/useTema";
import { useContactos } from "@/composables/useContactos";

export const useConfiguracionStore = defineStore("configuracion", () => {
    const tema = useTema();
    const contactosComp = useContactos();

    const linternaActiva = ref(false);

    function alternarLinterna() {
        linternaActiva.value = !linternaActiva.value;
    }

    return {
        tema: tema.tema,
        alternarTema: tema.alternar,
        contactos: contactosComp.contactos,
        actualizarContacto: contactosComp.actualizar,
        linternaActiva: computed(() => linternaActiva.value),
        alternarLinterna,
    };
});
