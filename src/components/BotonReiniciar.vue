<script setup>
import { useRouter } from "vue-router";
import { useCuestionario } from "@/composables/useCuestionario";

const router = useRouter();
const cuestionario = useCuestionario();

function saltar() {
    router.push("/emergencia");
}

function reiniciar() {
    cuestionario.reiniciar();
}
</script>

<template>
    <button
        class="boton boton-principal"
        @click="cuestionario.reiniciar()"
    >
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Repetir diagnóstico
    </button>
</template>
