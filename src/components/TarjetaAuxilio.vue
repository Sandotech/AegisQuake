<script setup>
defineProps({
    icono: { type: String, required: true },
    titulo: { type: String, required: true },
    tiempo: { type: String, required: true },
    tipoTiempo: { type: String, default: "urgente" },
    pasos: { type: Array, required: true },
});
</script>

<template>
    <details class="aux-card">
        <summary class="aux-card__resumen">
            <span class="aux-card__icono">{{ icono }}</span>
            <span class="aux-card__titulo">{{ titulo }}</span>
            <span class="aux-card__tiempo" :class="`aux-card__tiempo--${tipoTiempo}`">
                {{ tiempo }}
            </span>
        </summary>
        <div class="aux-card__contenido">
            <ol class="aux-card__pasos">
                <li v-for="(paso, idx) in pasos" :key="idx" v-html="paso"></li>
            </ol>
        </div>
    </details>
</template>

<style scoped>
.aux-card {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-lg);
    overflow: hidden;
    transition: all var(--transicion-rapida);
}

.aux-card[open] {
    box-shadow: var(--sombra-md);
}

.aux-card__resumen {
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    padding: var(--espacio-md);
    cursor: pointer;
    list-style: none;
    user-select: none;
    transition: background var(--transicion-rapida);
}

.aux-card__resumen::-webkit-details-marker {
    display: none;
}

.aux-card__resumen:hover {
    background: var(--color-fondo);
}

.aux-card__icono {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radio-md);
    background: var(--color-critico);
    font-weight: 800;
    font-size: 0.8rem;
    color: white;
    flex-shrink: 0;
}

.aux-card__titulo {
    flex: 1;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--color-texto);
}

.aux-card__tiempo {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.5rem;
    border-radius: var(--radio-sm);
}

.aux-card__tiempo--critico {
    background: var(--color-critico-claro);
    color: var(--color-critico-oscuro);
}

.aux-card__tiempo--urgente {
    background: var(--color-advertencia-claro);
    color: var(--color-advertencia-oscuro);
}

.aux-card__tiempo--estable {
    background: var(--color-exito-claro);
    color: var(--color-exito-oscuro);
}

.aux-card__contenido {
    padding: 0 var(--espacio-md) var(--espacio-md);
}

.aux-card__pasos {
    padding-left: var(--espacio-lg);
    margin: 0;
}

.aux-card__pasos li {
    padding: var(--espacio-xs) 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-texto);
}
</style>
