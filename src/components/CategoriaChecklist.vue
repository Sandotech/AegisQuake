<script setup>
import ChecklistItem from "@/components/ChecklistItem.vue";

defineProps({
    badge: { type: String, required: true },
    titulo: { type: String, required: true },
    items: { type: Array, required: true },
    estados: { type: Array, required: true },
});
defineEmits(["toggle"]);
</script>

<template>
    <div class="categoria-checklist">
        <h3 class="categoria-checklist__titulo">
            <span class="categoria-checklist__badge">{{ badge }}</span>
            {{ titulo }}
        </h3>
        <ul class="categoria-checklist__items">
            <ChecklistItem
                v-for="(item, idx) in items"
                :key="item.id"
                :indice="item.id"
                :titulo="item.titulo"
                :subtitulo="item.subtitulo"
                :marcado="estados[item.id]"
                @toggle="(i) => $emit('toggle', i)"
            />
        </ul>
    </div>
</template>

<style scoped>
.categoria-checklist__titulo {
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-texto-secundario);
    margin: 0 0 var(--espacio-md);
}

.categoria-checklist__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 0.3rem 0.6rem;
    background: var(--color-principal);
    color: white;
    border-radius: var(--radio-sm);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0;
    text-transform: none;
}

.categoria-checklist__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--espacio-xs);
}
</style>
