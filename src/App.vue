<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import FabEmergencia from "@/components/FabEmergencia.vue";
import { useTema } from "@/composables/useTema";

useTema();
</script>

<template>
    <div class="app">
        <AppHeader />
        <main class="app__main">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <AppFooter />
        <FabEmergencia />
    </div>
</template>

<style>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app__main {
    flex: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
