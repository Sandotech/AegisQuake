<script setup>
defineProps({
    categoria: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, default: "sismo" },
    fases: { type: Array, required: true },
});
</script>

<template>
    <article class="guia-card" :class="`guia-card--${tipo}`">
        <header class="guia-card__hero">
            <div class="guia-card__hero-texto">
                <span class="guia-card__categoria">{{ categoria }}</span>
                <h3 class="guia-card__titulo">{{ titulo }}</h3>
                <p class="guia-card__descripcion">{{ descripcion }}</p>
            </div>
            <div class="guia-card__hero-decoracion" aria-hidden="true">
                <slot name="icono">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        opacity="0.4"
                    >
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </slot>
            </div>
        </header>

        <div class="guia-card__fases">
            <section
                v-for="fase in fases"
                :key="fase.numero"
                class="fase"
                :class="`fase--${fase.tipo}`"
            >
                <h4 class="fase__titulo">
                    <span class="fase__numero">{{ fase.numero }}</span>
                    {{ fase.titulo }}
                </h4>
                <ol class="fase__pasos">
                    <li v-for="(paso, idx) in fase.pasos" :key="idx" v-html="paso"></li>
                </ol>
            </section>
        </div>
    </article>
</template>

<style scoped>
.guia-card {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    box-shadow: var(--sombra-md);
    overflow: hidden;
}

.guia-card__hero {
    padding: var(--espacio-xl);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--espacio-lg);
    color: white;
    position: relative;
    overflow: hidden;
}

.guia-card--sismo .guia-card__hero {
    background: linear-gradient(135deg, #c62828 0%, #e53935 100%);
}

.guia-card--inundacion .guia-card__hero {
    background: linear-gradient(135deg, #0d47a1 0%, #1b4ef5 100%);
}

.guia-card--incendio .guia-card__hero {
    background: linear-gradient(135deg, #f57f17 0%, #f9a825 100%);
}

.guia-card__hero-texto {
    flex: 1;
}

.guia-card__categoria {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radio-completo);
    margin-bottom: var(--espacio-sm);
}

.guia-card__titulo {
    color: white;
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 var(--espacio-sm);
    line-height: 1;
}

.guia-card__descripcion {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    margin: 0;
}

.guia-card__hero-decoracion {
    flex-shrink: 0;
    color: white;
}

.guia-card__fases {
    padding: var(--espacio-xl);
    display: flex;
    flex-direction: column;
    gap: var(--espacio-md);
}

.fase {
    padding: var(--espacio-lg);
    border-radius: var(--radio-lg);
    border-left: 4px solid;
    background: var(--color-fondo);
}

.fase--critico {
    border-left-color: var(--color-critico);
    background: var(--color-critico-claro);
}

.fase--advertencia {
    border-left-color: var(--color-advertencia-oscuro);
    background: var(--color-advertencia-claro);
}

.fase--exito {
    border-left-color: var(--color-exito-oscuro);
    background: var(--color-exito-claro);
}

:global([data-theme="dark"]) .fase--critico {
    background: rgba(229, 57, 53, 0.1);
}

:global([data-theme="dark"]) .fase--advertencia {
    background: rgba(253, 216, 53, 0.08);
}

:global([data-theme="dark"]) .fase--exito {
    background: rgba(67, 160, 71, 0.1);
}

.fase__titulo {
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 var(--espacio-md);
    color: var(--color-texto);
}

.fase__numero {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-texto);
    color: white;
    font-size: 0.9rem;
    font-weight: 800;
    flex-shrink: 0;
}

.fase--critico .fase__numero {
    background: var(--color-critico-oscuro);
}

.fase--advertencia .fase__numero {
    background: var(--color-advertencia-oscuro);
}

.fase--exito .fase__numero {
    background: var(--color-exito-oscuro);
}

.fase__pasos {
    padding-left: var(--espacio-lg);
    margin: 0;
}

.fase__pasos li {
    padding: var(--espacio-xs) 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-texto);
}

.fase__pasos li::marker {
    font-weight: 700;
    color: var(--color-texto-secundario);
}

.fase--critico .fase__pasos li::marker {
    color: var(--color-critico-oscuro);
}

.fase--advertencia .fase__pasos li::marker {
    color: var(--color-advertencia-oscuro);
}

.fase--exito .fase__pasos li::marker {
    color: var(--color-exito-oscuro);
}

@media (max-width: 768px) {
    .guia-card__hero {
        flex-direction: column;
    }

    .guia-card__hero-decoracion {
        align-self: flex-end;
    }

    .guia-card__titulo {
        font-size: 1.5rem;
    }
}
</style>
