<script setup>
import { useConfiguracionStore } from "@/stores/configuracion";

const config = useConfiguracionStore();
</script>

<template>
    <button
        class="icono-boton"
        :aria-label="config.tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
        :title="config.tema === 'dark' ? 'Tema claro' : 'Tema oscuro'"
        @click="config.alternarTema"
    >
        <svg
            v-if="config.tema === 'light'"
            class="icono-sol"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg
            v-else
            class="icono-luna"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    </button>
</template>

<style scoped>
.icono-boton {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-md);
    color: var(--color-texto);
    cursor: pointer;
    transition: all var(--transicion-rapida);
}

.icono-boton:hover {
    background: var(--color-fondo);
    border-color: var(--color-principal);
    color: var(--color-principal);
}
</style>
