<script setup>
defineProps({
    indice: { type: Number, required: true },
    titulo: { type: String, required: true },
    subtitulo: { type: String, default: "" },
    marcado: { type: Boolean, required: true },
});
defineEmits(["toggle"]);
</script>

<template>
    <li class="check-item">
        <label>
            <input
                type="checkbox"
                class="check-item__input"
                :checked="marcado"
                @change="$emit('toggle', indice)"
            />
            <span class="check-item__marca"></span>
            <span class="check-item__contenido">
                <strong>{{ titulo }}</strong>
                <small v-if="subtitulo">{{ subtitulo }}</small>
            </span>
        </label>
    </li>
</template>

<style scoped>
.check-item {
    border-radius: var(--radio-md);
    transition: background var(--transicion-rapida);
}

.check-item label {
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    padding: var(--espacio-sm) var(--espacio-md);
    cursor: pointer;
    border-radius: var(--radio-md);
    transition: background var(--transicion-rapida);
}

.check-item label:hover {
    background: var(--color-fondo);
}

.check-item__input {
    display: none;
}

.check-item__marca {
    width: 24px;
    height: 24px;
    border-radius: var(--radio-sm);
    border: 2px solid var(--color-borde);
    flex-shrink: 0;
    transition: all var(--transicion-rapida);
    position: relative;
}

.check-item__input:checked + .check-item__marca {
    background: var(--color-exito);
    border-color: var(--color-exito);
}

.check-item__input:checked + .check-item__marca::after {
    content: "";
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.check-item__contenido {
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: 1.3;
}

.check-item__contenido strong {
    font-weight: 600;
    font-size: 0.95rem;
}

.check-item__contenido small {
    font-size: 0.8rem;
    color: var(--color-texto-secundario);
}

.check-item__input:checked ~ .check-item__contenido {
    text-decoration: line-through;
    opacity: 0.5;
}
</style>
