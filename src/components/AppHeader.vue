<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useConfiguracionStore } from "@/stores/configuracion";
import BtnTema from "@/components/BtnTema.vue";

const router = useRouter();
const config = useConfiguracionStore();

const mostrarBotonVolver = computed(() => router.currentRoute.value.name !== "inicio");

function irA(ruta) {
    router.push(ruta);
}
</script>

<template>
    <header class="encabezado" id="encabezado">
        <div class="encabezado__interior">
            <a
                href="#"
                class="encabezado__marca"
                aria-label="Inicio"
                @click.prevent="irA('/')"
            >
                <span class="marca__logo" aria-hidden="true">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <defs>
                            <linearGradient
                                id="logoGrad"
                                x1="0"
                                y1="0"
                                x2="36"
                                y2="36"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#E53935" />
                                <stop offset="1" stop-color="#1B4EF5" />
                            </linearGradient>
                        </defs>
                        <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
                        <path
                            d="M18 9L9 25H27L18 9Z"
                            fill="white"
                            fill-opacity="0.95"
                        />
                        <circle cx="18" cy="22" r="2" fill="white" />
                    </svg>
                </span>
                <span class="marca__texto">
                    <span class="marca__titulo">Centro de Emergencia</span>
                    <span class="marca__subtitulo">Tu guía personal</span>
                </span>
            </a>

            <div class="encabezado__acciones">
                <BtnTema />
                <button
                    v-if="mostrarBotonVolver"
                    class="icono-boton"
                    aria-label="Volver al inicio"
                    title="Volver al inicio"
                    @click="irA('/')"
                >
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
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </button>
                <router-link
                    v-if="router.currentRoute.value.name === 'inicio'"
                    to="/emergencia"
                    class="icono-boton"
                    aria-label="Ir a Centro de Emergencia"
                    title="Centro de Emergencia"
                >
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
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                        <path d="M2 17L12 22L22 17" />
                        <path d="M2 12L12 17L22 12" />
                    </svg>
                </router-link>
                <router-link
                    v-else-if="router.currentRoute.value.name === 'emergencia'"
                    to="/monitoreo"
                    class="icono-boton"
                    aria-label="Ir a Panel de Monitoreo"
                    title="Panel de Monitoreo"
                >
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
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                </router-link>
            </div>
        </div>
    </header>
</template>

<style scoped>
.encabezado {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--color-superficie);
    border-bottom: 1px solid var(--color-borde);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: var(--sombra-sm);
}

.encabezado__interior {
    max-width: 880px;
    margin: 0 auto;
    padding: var(--espacio-md) var(--espacio-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--espacio-md);
}

.encabezado__marca {
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    text-decoration: none;
    color: inherit;
    flex: 1;
    min-width: 0;
}

.marca__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.marca__texto {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    min-width: 0;
}

.marca__titulo {
    font-family: var(--fuente-titulos);
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.marca__subtitulo {
    font-size: 0.75rem;
    color: var(--color-texto-secundario);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.encabezado__acciones {
    display: flex;
    gap: var(--espacio-sm);
    align-items: center;
    flex-shrink: 0;
}

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
    text-decoration: none;
}

.icono-boton:hover {
    background: var(--color-fondo);
    border-color: var(--color-principal);
    color: var(--color-principal);
}

@media (max-width: 480px) {
    .marca__subtitulo {
        display: none;
    }
}
</style>
