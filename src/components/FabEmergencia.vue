<script setup>
import { useConfiguracionStore } from "@/stores/configuracion";

const config = useConfiguracionStore();
</script>

<template>
    <a
        href="tel:911"
        class="fab"
        aria-label="Llamar al 911"
        title="Llamar al 911"
    >
        <span class="fab__punto" aria-hidden="true"></span>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            />
        </svg>
        <span class="fab__texto">911</span>
    </a>
</template>

<style scoped>
.fab {
    position: fixed;
    bottom: var(--espacio-xl);
    right: var(--espacio-xl);
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    padding: var(--espacio-md) var(--espacio-lg);
    background: var(--color-critico);
    color: white;
    border-radius: var(--radio-completo);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    box-shadow: 0 8px 24px rgba(229, 57, 53, 0.4);
    z-index: 30;
    transition: all var(--transicion-rapida);
    animation: pulsoFab 2s ease-in-out infinite;
}

.fab:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 32px rgba(229, 57, 53, 0.5);
}

.fab__punto {
    position: absolute;
    top: 8px;
    right: 12px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: pulsoPunto 1.5s ease-in-out infinite;
}

.fab__texto {
    font-family: var(--fuente-titulos);
    font-size: 1.1rem;
}

@keyframes pulsoFab {
    0%,
    100% {
        box-shadow: 0 8px 24px rgba(229, 57, 53, 0.4),
            0 0 0 0 rgba(229, 57, 53, 0.4);
    }
    50% {
        box-shadow: 0 8px 24px rgba(229, 57, 53, 0.4),
            0 0 0 12px rgba(229, 57, 53, 0);
    }
}

@keyframes pulsoPunto {
    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.3);
    }
}

@media (max-width: 640px) {
    .fab {
        bottom: var(--espacio-md);
        right: var(--espacio-md);
        padding: var(--espacio-sm) var(--espacio-md);
    }
}
</style>
