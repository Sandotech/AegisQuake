<script setup>
import { computed } from "vue";

const props = defineProps({
    texto: { type: String, required: true },
    esCorrecta: { type: Boolean, default: false },
    estado: { type: String, default: "normal" },
    desactivada: { type: Boolean, default: false },
});
defineEmits(["seleccionar"]);

const clases = computed(() => ({
    opcion: true,
    seleccionada: props.estado === "seleccionada",
    correcta: props.estado === "correcta",
    incorrecta: props.estado === "incorrecta",
    desactivada: props.desactivada,
}));
</script>

<template>
    <button
        :class="clases"
        :disabled="desactivada"
        type="button"
        @click="$emit('seleccionar')"
    >
        {{ texto }}
    </button>
</template>

<style scoped>
.opcion {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    padding: var(--espacio-md) var(--espacio-lg);
    background: var(--color-superficie);
    border: 2px solid var(--color-borde);
    border-radius: var(--radio-lg);
    text-align: left;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-texto);
    transition: all var(--transicion-rapida);
    box-shadow: var(--sombra-sm);
    cursor: pointer;
    position: relative;
}

.opcion::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-borde);
    border-radius: 50%;
    flex-shrink: 0;
    transition: all var(--transicion-rapida);
}

.opcion:hover {
    border-color: var(--color-terciario);
    transform: translateY(-1px);
    box-shadow: var(--sombra-md);
}

.opcion:hover::before {
    border-color: var(--color-principal);
}

.opcion.seleccionada {
    border-color: var(--color-principal);
    background: var(--color-acento);
    box-shadow: 0 0 0 3px rgba(27, 78, 245, 0.15);
}

.opcion.seleccionada::before {
    background: var(--color-principal);
    border-color: var(--color-principal);
    box-shadow: inset 0 0 0 3px var(--color-superficie);
}

.opcion.correcta {
    border-color: var(--color-exito);
    background: var(--color-exito-claro);
    box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.2);
    cursor: default;
}

.opcion.correcta::before {
    background: var(--color-exito);
    border-color: var(--color-exito);
    box-shadow: inset 0 0 0 3px var(--color-superficie);
}

.opcion.incorrecta {
    border-color: var(--color-critico);
    background: var(--color-critico-claro);
    box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.2);
    cursor: default;
}

.opcion.incorrecta::before {
    background: var(--color-critico);
    border-color: var(--color-critico);
    box-shadow: inset 0 0 0 3px var(--color-superficie);
}

.opcion.desactivada {
    opacity: 0.4;
    pointer-events: none;
}

:global([data-theme="dark"]) .opcion.seleccionada {
    background: rgba(27, 78, 245, 0.15);
}

:global([data-theme="dark"]) .opcion.correcta {
    background: rgba(67, 160, 71, 0.15);
}

:global([data-theme="dark"]) .opcion.incorrecta {
    background: rgba(229, 57, 53, 0.15);
}
</style>
