<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const anio = new Date().getFullYear();
</script>

<template>
    <footer class="app-footer">
        <p>Centro de Emergencia · Hecho con responsabilidad para la comunidad</p>
        <p class="app-footer__links">
            <router-link to="/">Diagnóstico</router-link>
            <span class="app-footer__separador">·</span>
            <router-link to="/emergencia">Centro de Emergencia</router-link>
            <span class="app-footer__separador">·</span>
            <router-link to="/monitoreo">Monitoreo</router-link>
        </p>
        <p class="app-footer__copy">© {{ anio }} Exposucre</p>
    </footer>
</template>

<style scoped>
.app-footer {
    text-align: center;
    padding: var(--espacio-2xl) var(--espacio-lg);
    border-top: 1px solid var(--color-borde);
    color: var(--color-texto-secundario);
    font-size: 0.85rem;
    background: var(--color-superficie);
}

.app-footer p {
    margin: 0 0 var(--espacio-sm);
}

.app-footer__links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--espacio-sm);
    flex-wrap: wrap;
}

.app-footer__links a {
    color: var(--color-texto-secundario);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transicion-rapida);
}

.app-footer__links a:hover {
    color: var(--color-principal);
}

.app-footer__separador {
    opacity: 0.5;
}

.app-footer__copy {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: var(--espacio-sm);
}
</style>
