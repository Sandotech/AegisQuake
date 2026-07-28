<script setup>
import { computed } from "vue";

const props = defineProps({
    nivel: { type: String, required: true },
});

const claseSemaforo = computed(() => {
    return `semaforo semaforo--${props.nivel}`;
});
</script>

<template>
    <div class="semaforo" :class="`semaforo--${nivel}`">
        <div class="semaforo__luces">
            <div class="semaforo__luz semaforo__luz--rojo" :class="{ activa: nivel === 'critico' }"></div>
            <div
                class="semaforo__luz semaforo__luz--amarillo"
                :class="{ activa: nivel === 'advertencia' }"
            ></div>
            <div class="semaforo__luz semaforo__luz--verde" :class="{ activa: nivel === 'exito' }"></div>
        </div>
    </div>
</template>

<style scoped>
.semaforo__luces {
    display: flex;
    gap: var(--espacio-sm);
    background: rgba(0, 0, 0, 0.15);
    padding: var(--espacio-sm);
    border-radius: var(--radio-completo);
}

.semaforo__luz {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    opacity: 0.3;
    transition: all var(--transicion-rapida);
}

.semaforo__luz--rojo {
    background: #ff5252;
}

.semaforo__luz--amarillo {
    background: #ffeb3b;
}

.semaforo__luz--verde {
    background: #69f0ae;
}

.semaforo__luz.activa {
    opacity: 1;
    transform: scale(1.3);
    box-shadow: 0 0 12px currentColor;
}
</style>
