(function () {
    "use strict";

    const STORAGE_KEYS = {
        checklist: "expomierda_checklist_v2",
        contactos: "expomierda_contactos_v2",
        tema: "expomierda_tema"
    };

    const TOTAL_ITEMS = 14;
    const CIRCUNFERENCIA = 2 * Math.PI * 60;

    // ==================== TEMA OSCURO ====================
    const botonTema = document.getElementById("botonTema");
    const html = document.documentElement;

    function cargarTema() {
        try {
            const guardado = localStorage.getItem(STORAGE_KEYS.tema);
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
            localStorage.setItem(STORAGE_KEYS.tema, nuevo);
        } catch (e) {}
    }

    cargarTema();

    if (botonTema) {
        botonTema.addEventListener("click", alternarTema);
    }

    // ==================== TABS DE GUÍAS ====================
    const tabs = document.querySelectorAll(".selector-tarjeta");
    const paneles = document.querySelectorAll(".guias__panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => {
                t.classList.remove("activa");
                t.setAttribute("aria-selected", "false");
            });
            paneles.forEach((p) => p.classList.remove("activo"));

            tab.classList.add("activa");
            tab.setAttribute("aria-selected", "true");

            const panelId = tab.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);
            if (panel) panel.classList.add("activo");
        });
    });

    // ==================== CHECKLIST MOCHILA 72 ====================
    const checks = document.querySelectorAll(".check-item__input");
    const anilloProgreso = document.getElementById("anilloProgreso");
    const porcentajeNumero = document.getElementById("porcentajeNumero");
    const nivelTexto = document.getElementById("nivelTexto");
    const detalleTexto = document.getElementById("detalleTexto");
    const hechosNumero = document.getElementById("hechosNumero");
    const estadoMochila = document.getElementById("estadoMochila");
    const rellenoMochila = document.getElementById("rellenoMochila");

    function obtenerNivel(porcentaje) {
        if (porcentaje === 0) return { texto: "Empezando", clase: "empezando" };
        if (porcentaje < 30) return { texto: "Inicial", clase: "inicial" };
        if (porcentaje < 60) return { texto: "En progreso", clase: "progreso" };
        if (porcentaje < 90) return { texto: "Casi listo", clase: "casi-listo" };
        return { texto: "Preparado", clase: "preparado" };
    }

    function cargarChecklist() {
        try {
            const guardado = localStorage.getItem(STORAGE_KEYS.checklist);
            if (guardado) {
                const estados = JSON.parse(guardado);
                checks.forEach((check, i) => {
                    if (estados[i]) check.checked = true;
                });
            }
        } catch (e) {}
    }

    function guardarChecklist() {
        const estados = Array.from(checks).map((c) => c.checked);
        try {
            localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(estados));
        } catch (e) {}
    }

    function actualizarTodo() {
        const total = checks.length;
        const hechos = Array.from(checks).filter((c) => c.checked).length;
        const porcentaje = total > 0 ? Math.round((hechos / total) * 100) : 0;

        // Anillo de progreso en el hero
        if (anilloProgreso) {
            const offset = CIRCUNFERENCIA - (CIRCUNFERENCIA * porcentaje) / 100;
            anilloProgreso.style.strokeDashoffset = offset;

            if (porcentaje < 30) {
                anilloProgreso.style.stroke = "var(--color-critico)";
            } else if (porcentaje < 70) {
                anilloProgreso.style.stroke = "var(--color-advertencia-oscuro)";
            } else {
                anilloProgreso.style.stroke = "var(--color-exito)";
            }
        }

        if (porcentajeNumero) porcentajeNumero.textContent = porcentaje;
        if (hechosNumero) hechosNumero.textContent = hechos;

        const nivel = obtenerNivel(porcentaje);
        if (nivelTexto) nivelTexto.textContent = nivel.texto;
        if (detalleTexto) detalleTexto.textContent = `${hechos} de ${TOTAL_ITEMS} elementos listos`;
        if (estadoMochila) estadoMochila.textContent = `${nivel.texto} · ${porcentaje}%`;

        if (rellenoMochila) rellenoMochila.style.width = `${porcentaje}%`;
    }

    cargarChecklist();
    actualizarTodo();

    checks.forEach((check) => {
        check.addEventListener("change", () => {
            guardarChecklist();
            actualizarTodo();
        });
    });

    // ==================== CONTACTOS PERSONALES ====================
    const inputsContactos = document.querySelectorAll(".contacto-input__campo");
    const botonesLlamar = document.querySelectorAll(".contacto-input__llamar");

    function cargarContactos() {
        inputsContactos.forEach((input) => {
            const id = input.id;
            if (!id) return;
            try {
                const valor = localStorage.getItem(id);
                if (valor) input.value = valor;
            } catch (e) {}
        });
        actualizarEstadoBotonesLlamar();
    }

    function guardarContactos() {
        inputsContactos.forEach((input) => {
            if (!input.id) return;
            try {
                localStorage.setItem(input.id, input.value);
            } catch (e) {}
        });
    }

    function actualizarEstadoBotonesLlamar() {
        botonesLlamar.forEach((btn) => {
            const telfId = btn.getAttribute("data-telf-id");
            if (!telfId) return;
            const inputTelf = document.getElementById(telfId);
            const tieneTelf = inputTelf && inputTelf.value.trim().length > 0;
            btn.style.opacity = tieneTelf ? "1" : "0.4";
            btn.style.pointerEvents = tieneTelf ? "auto" : "none";
        });
    }

    cargarContactos();

    let timeoutContactos;
    inputsContactos.forEach((input) => {
        input.addEventListener("input", () => {
            clearTimeout(timeoutContactos);
            timeoutContactos = setTimeout(() => {
                guardarContactos();
                actualizarEstadoBotonesLlamar();
            }, 400);
        });
    });

    botonesLlamar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const telfId = btn.getAttribute("data-telf-id");
            if (!telfId) return;
            const inputTelf = document.getElementById(telfId);
            if (inputTelf && inputTelf.value.trim()) {
                e.preventDefault();
                window.location.href = "tel:" + inputTelf.value.trim();
            }
        });
    });

    // ==================== LINTERNA (efecto visual) ====================
    const botonLinterna = document.getElementById("botonLinterna");
    let linternaActiva = false;
    let overlayBlanco = null;

    if (botonLinterna) {
        botonLinterna.addEventListener("click", () => {
            linternaActiva = !linternaActiva;
            document.body.classList.toggle("linterna-activa", linternaActiva);

            if (linternaActiva) {
                if (!overlayBlanco) {
                    overlayBlanco = document.createElement("div");
                    overlayBlanco.style.cssText = "position:fixed;inset:0;background:white;z-index:9998;pointer-events:none;";
                    document.body.appendChild(overlayBlanco);
                }
                overlayBlanco.style.display = "block";
            } else if (overlayBlanco) {
                overlayBlanco.style.display = "none";
            }
        });
    }

    // ==================== SCROLL SUAVE EN NAVEGACIÓN RÁPIDA ====================
    document.querySelectorAll(".nav-rapida__enlace").forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            const href = enlace.getAttribute("href");
            if (href && href.startsWith("#")) {
                const destino = document.querySelector(href);
                if (destino) {
                    e.preventDefault();
                    const offset = 100;
                    const top = destino.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }
        });
    });

    // ==================== INTERSECTION OBSERVER (animaciones al scroll) ====================
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.style.opacity = "1";
                        entrada.target.style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elementosAnimar = document.querySelectorAll(".guia, .aux-card, .contacto-card, .categoria");
        elementosAnimar.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observador.observe(el);
        });
    }
})();
