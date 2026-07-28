(function () {
    "use strict";

    const STORAGE_TEMA = "expomierda_tema";

    // ==================== TEMA OSCURO ====================
    const botonTema = document.getElementById("botonTema");
    const html = document.documentElement;

    function cargarTema() {
        try {
            const guardado = localStorage.getItem(STORAGE_TEMA);
            const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const tema = guardado || (prefiereOscuro ? "dark" : "light");
            html.setAttribute("data-theme", tema);
        } catch (e) {
            html.setAttribute("data-theme", "light");
        }
    }

    function alternarTema() {
        const actual = html.getAttribute("data-theme");
        const nuevo = actual === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", nuevo);
        try {
            localStorage.setItem(STORAGE_TEMA, nuevo);
        } catch (e) {}
    }

    cargarTema();

    if (botonTema) {
        botonTema.addEventListener("click", alternarTema);
    }

    // ==================== REPETIR DIAGNÓSTICO ====================
    const botonReiniciar = document.getElementById("botonReiniciar");
    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", () => {
            const cuestionario = document.getElementById("cuestionario");
            const resultados = document.getElementById("resultados");

            if (cuestionario) cuestionario.style.display = "";
            if (resultados) resultados.style.display = "none";

            // Reiniciar la instancia del cuestionario si existe
            if (window.__cuestionarioInstancia && typeof window.__cuestionarioInstancia.reiniciar === "function") {
                window.__cuestionarioInstancia.reiniciar();
            } else {
                // Fallback: reinicio manual del DOM
                const todasOpciones = document.querySelectorAll(".opcion");
                todasOpciones.forEach((o) => {
                    o.classList.remove("seleccionada", "correcta", "incorrecta", "desactivada");
                });

                const todasExplicaciones = document.querySelectorAll(".explicacion-container");
                todasExplicaciones.forEach((e) => (e.innerHTML = ""));

                const todosBtnSiguiente = document.querySelectorAll('[data-accion="siguiente"]');
                todosBtnSiguiente.forEach((b) => (b.disabled = true));

                const diapositivas = document.querySelectorAll(".cuestionario__diapositiva");
                diapositivas.forEach((d) => d.classList.remove("activa"));
                const primera = document.querySelector('[data-paso="0"]');
                if (primera) primera.classList.add("activa");

                const rellenoProgreso = document.getElementById("rellenoProgreso");
                const infoProgreso = document.getElementById("infoProgreso");
                if (rellenoProgreso) rellenoProgreso.style.width = "0%";
                if (infoProgreso) infoProgreso.textContent = "";
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==================== ACCESIBILIDAD: ANUNCIAR RESULTADOS ====================
    // Detectar cuando aparecen los resultados para hacer scroll
    const observador = new MutationObserver((mutaciones) => {
        for (const mutacion of mutaciones) {
            if (mutacion.target.id === "resultados" && mutacion.target.style.display !== "none") {
                setTimeout(() => {
                    const tarjeta = document.getElementById("tarjetaResultados");
                    if (tarjeta) {
                        tarjeta.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 100);
                break;
            }
        }
    });

    const resultados = document.getElementById("resultados");
    if (resultados) {
        observador.observe(resultados, { attributes: true, attributeFilter: ["style"] });
    }
})();
