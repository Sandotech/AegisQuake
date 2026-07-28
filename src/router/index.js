import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "inicio",
        component: () => import("@/views/VistaInicio.vue"),
        meta: { titulo: "Diagnóstico de Emergencias" },
    },
    {
        path: "/emergencia",
        name: "emergencia",
        component: () => import("@/views/VistaEmergencia.vue"),
        meta: { titulo: "Centro de Emergencia" },
    },
    {
        path: "/monitoreo",
        name: "monitoreo",
        component: () => import("@/views/VistaPrincipal.vue"),
        meta: { titulo: "Panel de Monitoreo" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
                top: 100,
            };
        }
        return { top: 0, behavior: "smooth" };
    },
});

router.afterEach((to) => {
    const baseTitle = "Centro de Emergencia | Exposucre";
    document.title = to.meta.titulo ? `${to.meta.titulo} | Exposucre` : baseTitle;
});

export default router;
