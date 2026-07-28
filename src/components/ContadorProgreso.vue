<script setup>
import { computed } from "vue";
import { usePreparacionStore } from "@/stores/preparacion";

const preparacion = usePreparacionStore();

const color = computed(() => {
    if (preparacion.porcentaje < 30) return "var(--color-critico)";
    if (preparacion.porcentaje < 70) return "var(--color-advertencia-oscuro)";
    return "var(--color-exito)";
});

const offset = computed(
    () => 377 - (377 * preparacion.porcentaje) / 100
);
</script>

<template>
    <div class="contador-progreso">
        <svg class="contador-progreso__anillo" width="140" height="140" viewBox="0 0 140 140">
            <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="var(--color-borde)"
                stroke-width="12"
            />
            <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                :stroke="color"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="377"
                :stroke-dashoffset="offset"
                transform="rotate(-90 70 70)"
            />
        </svg>
        <div class="contador-progreso__numero">
            <span>{{ preparacion.porcentaje }}</span>
            <span class="contador-progreso__simbolo">%</span>
        </div>
    </div>
</template>

<style scoped>
.contador-progreso {
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
}

.contador-progreso__anillo {
    display: block;
    transition: stroke-dashoffset var(--transicion-lenta);
}

.contador-progreso__numero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--fuente-titulos);
    font-weight: 800;
    font-size: 2.25rem;
    color: inherit;
    line-height: 1;
    display: flex;
    align-items: baseline;
    gap: 0.1rem;
}

.contador-progreso__simbolo {
    font-size: 1rem;
    opacity: 0.7;
}
</style>
