<script setup>
defineProps({
    numero: { type: String, required: true },
    nombre: { type: String, required: true },
    subtitulo: { type: String, default: "" },
    destacado: { type: Boolean, default: false },
    href: { type: String, default: "#" },
});
</script>

<template>
    <a :href="href" class="contacto-card" :class="{ 'contacto-card--destacado': destacado }">
        <span class="contacto-card__numero">{{ numero }}</span>
        <span class="contacto-card__info">
            <strong>{{ nombre }}</strong>
            <small v-if="subtitulo">{{ subtitulo }}</small>
        </span>
        <span v-if="destacado" class="contacto-card__icono" aria-hidden="true">
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
            </svg>
        </span>
    </a>
</template>

<style scoped>
.contacto-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--espacio-lg) var(--espacio-md);
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-lg);
    text-decoration: none;
    color: var(--color-texto);
    transition: all var(--transicion-rapida);
    position: relative;
}

.contacto-card:hover {
    border-color: var(--color-principal);
    transform: translateY(-2px);
    box-shadow: var(--sombra-md);
}

.contacto-card--destacado {
    background: linear-gradient(135deg, var(--color-critico) 0%, #c62828 100%);
    color: white;
    border-color: transparent;
    grid-row: span 2;
}

.contacto-card--destacado:hover {
    box-shadow: var(--sombra-lg);
    border-color: transparent;
}

.contacto-card__numero {
    font-family: var(--fuente-titulos);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-critico);
    line-height: 1;
    margin-bottom: var(--espacio-sm);
}

.contacto-card--destacado .contacto-card__numero {
    font-size: 2.5rem;
    color: white;
}

.contacto-card__info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.contacto-card__info strong {
    font-size: 0.85rem;
    font-weight: 700;
}

.contacto-card__info small {
    font-size: 0.7rem;
    color: var(--color-texto-secundario);
    margin-top: 0.2rem;
}

.contacto-card--destacado .contacto-card__info small {
    color: rgba(255, 255, 255, 0.8);
}

.contacto-card__icono {
    position: absolute;
    top: var(--espacio-sm);
    right: var(--espacio-sm);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>
