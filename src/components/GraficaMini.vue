<script setup>
import { computed } from "vue";

const props = defineProps({
    datos: { type: Array, default: () => [] },
    color: { type: String, default: "var(--color-principal)" },
    maximo: { type: Number, default: null },
});

const ANCHO = 100;
const ALTO = 32;

const puntos = computed(() => {
    const arr = props.datos;
    if (arr.length < 2) return "";

    const max = props.maximo ?? Math.max(...arr);
    const min = props.maximo !== null ? 0 : Math.min(...arr);
    const rango = max - min || 1;

    return arr
        .map((v, i) => {
            const x = (i / (arr.length - 1)) * ANCHO;
            const y = ALTO - ((v - min) / rango) * ALTO;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ");
});
</script>

<template>
    <svg
        class="grafica-mini"
        :viewBox="`0 0 ${ANCHO} ${ALTO}`"
        preserveAspectRatio="none"
        aria-hidden="true"
    >
        <polyline
            :points="puntos"
            fill="none"
            :stroke="color"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<style scoped>
.grafica-mini {
    display: block;
    width: 100%;
    height: 48px;
}
</style>
