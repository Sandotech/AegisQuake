import { ref, watch } from "vue";

const TEMA_KEY = "expomierda_tema";

function obtenerTemaInicial() {
    try {
        const guardado = localStorage.getItem(TEMA_KEY);
        if (guardado === "dark" || guardado === "light") {
            return guardado;
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
    } catch (e) {
        // localStorage no disponible
    }
    return "light";
}

const tema = ref(obtenerTemaInicial());

function aplicarTema(valor) {
    if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", valor);
    }
}

aplicarTema(tema.value);

watch(tema, (nuevo) => {
    aplicarTema(nuevo);
    try {
        localStorage.setItem(TEMA_KEY, nuevo);
    } catch (e) {
        // localStorage no disponible
    }
});

export function useTema() {
    function alternar() {
        tema.value = tema.value === "dark" ? "light" : "dark";
    }

    function establecer(valor) {
        if (valor === "dark" || valor === "light") {
            tema.value = valor;
        }
    }

    return {
        tema,
        alternar,
        establecer,
    };
}
