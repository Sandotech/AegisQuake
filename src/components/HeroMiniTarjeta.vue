<script setup>
defineProps({
    icono: { type: String, required: true },
    titulo: { type: String, required: true },
    subtitulo: { type: String, default: "" },
});
</script>

<template>
    <div class="hero-mini-tarjeta">
        <span class="hero-mini-tarjeta__icono" v-html="icono"></span>
        <div class="hero-mini-tarjeta__info">
            <strong>{{ titulo }}</strong>
            <small v-if="subtitulo">{{ subtitulo }}</small>
        </div>
    </div>
</template>

<style scoped>
.hero-mini-tarjeta {
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    background: rgba(255, 255, 255, 0.12);
    padding: var(--espacio-md);
    border-radius: var(--radio-lg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.hero-mini-tarjeta__icono {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--radio-md);
    color: white;
    flex-shrink: 0;
}

.hero-mini-tarjeta__info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    color: white;
    min-width: 0;
}

.hero-mini-tarjeta__info strong {
    font-size: 0.85rem;
    font-weight: 700;
}

.hero-mini-tarjeta__info small {
    font-size: 0.7rem;
    opacity: 0.8;
}
</style>
