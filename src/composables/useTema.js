import { ref, watch } from "vue";

const TEMA_KEY = "expomierda_tema";
const tema = ref("light");

function cargarTemaInicial() {
    try {
        const guardado = localStorage.getItem(TEMA_KEY);
        if (guardado === "dark" || guardado === "light") {
            tema.value = guardado;
        } else {
            const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
            tema.value = prefiereOscuro ? "dark" : "light";
        }
    } catch (e) {
        tema.value = "light";
    }
}

function aplicarTema(valor) {
    document.documentElement.setAttribute("data-theme", valor);
}

export function useTema() {
    cargarTemaInicial();
    aplicarTema(tema.value);

    watch(tema, (nuevo) => {
        aplicarTema(nuevo);
        try {
            localStorage.setItem(TEMA_KEY, nuevo);
        } catch (e) {
            // localStorage no disponible
        }
    });

    function alternar() {
        tema.value = tema.value === "dark" ? "light" : "dark";
    }

    return {
        tema,
        alternar,
    };
}
