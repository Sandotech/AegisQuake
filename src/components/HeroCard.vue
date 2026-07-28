<script setup>
defineProps({
    etiqueta: { type: String, default: "" },
    titulo: { type: String, required: true },
    descripcion: { type: String, default: "" },
});
</script>

<template>
    <div class="hero-card">
        <div class="hero-card__saludo">
            <span v-if="etiqueta" class="hero-card__etiqueta">{{ etiqueta }}</span>
            <h1 class="hero-card__titulo">{{ titulo }}</h1>
            <p v-if="descripcion" class="hero-card__descripcion">{{ descripcion }}</p>
        </div>
        <div v-if="$slots.tarjetas" class="hero-card__tarjetas">
            <slot name="tarjetas" />
        </div>
        <div v-if="$slots.acciones" class="hero-card__acciones">
            <slot name="acciones" />
        </div>
    </div>
</template>

<style scoped>
.hero-card {
    background: linear-gradient(135deg, #1b4ef5 0%, #3874ff 50%, #5996ff 100%);
    border-radius: var(--radio-xl);
    padding: var(--espacio-2xl) var(--espacio-xl);
    color: white;
    margin-bottom: var(--espacio-2xl);
    position: relative;
    overflow: hidden;
}

.hero-card::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 60%
    );
    pointer-events: none;
}

:global([data-theme="dark"]) .hero-card {
    background: linear-gradient(135deg, #0e2a9a 0%, #1b4ef5 100%);
}

.hero-card__saludo {
    position: relative;
    text-align: center;
    margin-bottom: var(--espacio-xl);
}

.hero-card__etiqueta {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radio-completo);
    margin-bottom: var(--espacio-md);
}

.hero-card__titulo {
    color: white;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 var(--espacio-sm);
}

.hero-card__descripcion {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    margin: 0;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
}

.hero-card__tarjetas,
.hero-card__acciones {
    position: relative;
}

.hero-card__tarjetas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--espacio-sm);
}

@media (max-width: 640px) {
    .hero-card__tarjetas {
        grid-template-columns: 1fr;
    }
}
</style>
