<script setup>
import { computed } from "vue";

const props = defineProps({
    etiqueta: { type: String, default: "" },
    valor: { type: [Number, String], default: "--" },
    unidad: { type: String, default: "" },
    porcentaje: { type: Number, default: 0 },
    estado: { type: String, default: "normal" },
});

const RADIO = 52;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

const offset = computed(() => {
    const pct = Math.min(100, Math.max(0, props.porcentaje));
    return CIRCUNFERENCIA - (CIRCUNFERENCIA * pct) / 100;
});

const color = computed(() => {
    if (props.estado === "critico") return "var(--color-critico)";
    if (props.estado === "advertencia") return "var(--color-advertencia-oscuro)";
    return "var(--color-exito)";
});

const textoEstado = computed(() => {
    if (props.estado === "critico") return "Crítico";
    if (props.estado === "advertencia") return "Atención";
    return "Normal";
});
</script>

<template>
    <div class="medidor">
        <div class="medidor__anillo">
            <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle
                    cx="60"
                    cy="60"
                    :r="RADIO"
                    fill="none"
                    stroke="var(--color-borde)"
                    stroke-width="10"
                />
                <circle
                    cx="60"
                    cy="60"
                    :r="RADIO"
                    fill="none"
                    :stroke="color"
                    stroke-width="10"
                    stroke-linecap="round"
                    :stroke-dasharray="CIRCUNFERENCIA"
                    :stroke-dashoffset="offset"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div class="medidor__numero">
                <span>{{ valor }}</span>
                <span v-if="unidad" class="medidor__unidad">{{ unidad }}</span>
            </div>
        </div>
        <span class="medidor__etiqueta">{{ etiqueta }}</span>
        <span class="medidor__estado" :class="`medidor__estado--${estado}`">
            {{ textoEstado }}
        </span>
    </div>
</template>

<style scoped>
.medidor {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--espacio-sm);
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-xl);
    padding: var(--espacio-xl) var(--espacio-lg);
    box-shadow: var(--sombra-sm);
    transition: border-color var(--transicion-normal), box-shadow var(--transicion-normal);
}

.medidor__anillo {
    position: relative;
    width: 120px;
    height: 120px;
}

.medidor__anillo svg {
    display: block;
    width: 100%;
    height: 100%;
}

.medidor__anillo circle {
    transition: stroke-dashoffset var(--transicion-normal), stroke var(--transicion-normal);
}

.medidor__numero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: baseline;
    gap: 0.15rem;
    font-family: var(--fuente-titulos);
    font-weight: 800;
    font-size: 1.75rem;
    color: var(--color-texto);
    line-height: 1;
    white-space: nowrap;
}

.medidor__unidad {
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.6;
}

.medidor__etiqueta {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-texto-secundario);
}

.medidor__estado {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.15rem 0.6rem;
    border-radius: var(--radio-completo);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.medidor__estado--normal {
    background: var(--color-exito-claro);
    color: var(--color-exito-oscuro);
}

.medidor__estado--advertencia {
    background: var(--color-advertencia-claro);
    color: var(--color-advertencia-oscuro);
}

.medidor__estado--critico {
    background: var(--color-critico-claro);
    color: var(--color-critico-oscuro);
}

:global([data-theme="dark"]) .medidor__estado--normal {
    color: #81c784;
}

:global([data-theme="dark"]) .medidor__estado--advertencia {
    color: #ffe082;
}

:global([data-theme="dark"]) .medidor__estado--critico {
    color: #ef9a9a;
}
</style>
