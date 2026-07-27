class Cuestionario {
    constructor() {
        this.pasoActual = 0;
        this.totalPasos = preguntas.length;
        this.respuestas = new Array(this.totalPasos).fill(null);

        this.viewport = document.getElementById("viewportCuestionario");
        this.rellenoProgreso = document.getElementById("rellenoProgreso");
        this.infoProgreso = document.getElementById("infoProgreso");
        this.cuestionarioEl = document.getElementById("cuestionario");
        this.resultadosEl = document.getElementById("resultados");

        this.dibujarDiapositivasPreguntas();
        this.vincularEventos();
        this.actualizarProgreso();
    }

    dibujarDiapositivasPreguntas() {
        const contenedor = document.getElementById("contenedorPreguntas");
        contenedor.innerHTML = "";

        preguntas.forEach((pregunta, indice) => {
            const diapositiva = document.createElement("div");
            diapositiva.className = "cuestionario__diapositiva";
            diapositiva.dataset.paso = indice + 1;

            const opcionesHTML = pregunta.opciones
                .map(
                    (opcion, i) =>
                        `<button class="opcion" data-pregunta="${indice}" data-opcion="${i}" type="button">
                            ${opcion.texto}
                        </button>`
                )
                .join("");

            diapositiva.innerHTML = `
                <img src="${pregunta.imagen}" alt="${pregunta.categoria}" class="cuestionario__imagen">
                <h2 class="cuestionario__titulo">${pregunta.pregunta}</h2>
                <p class="cuestionario__subtitulo">${pregunta.categoria}</p>
                <div class="opciones">${opcionesHTML}</div>
                <div class="explicacion-container"></div>
                <div class="cuestionario__acciones">
                    <button class="boton boton-atras" data-accion="atras" ${indice === 0 ? 'style="visibility:hidden"' : ""}>&larr; Atrás</button>
                    <button class="boton boton-principal boton-siguiente" data-accion="siguiente" disabled>Siguiente &rarr;</button>
                </div>
            `;

            contenedor.appendChild(diapositiva);
        });
    }

    vincularEventos() {
        this.viewport.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-accion]");
            if (btn) {
                const accion = btn.dataset.accion;
                if (accion === "iniciar" || accion === "siguiente") this.avanzar();
                if (accion === "atras") this.retroceder();
                if (accion === "saltar") this.saltar();
            }

            const opcion = e.target.closest(".opcion");
            if (opcion) this.seleccionarOpcion(opcion);
        });
    }

    seleccionarOpcion(opcionEl) {
        if (opcionEl.classList.contains("correcta") || opcionEl.classList.contains("incorrecta")) return;

        const indicePregunta = parseInt(opcionEl.dataset.pregunta);
        const indiceOpcion = parseInt(opcionEl.dataset.opcion);
        const pregunta = preguntas[indicePregunta];
        const esCorrecta = pregunta.opciones[indiceOpcion].correcta;

        const hermanas = opcionEl.parentElement.querySelectorAll(".opcion");
        hermanas.forEach((h) => {
            h.classList.remove("seleccionada");
            h.classList.add("desactivada");
        });

        if (esCorrecta) {
            opcionEl.classList.add("correcta");
        } else {
            opcionEl.classList.add("incorrecta");
            const indiceCorrecta = pregunta.opciones.findIndex((o) => o.correcta);
            hermanas[indiceCorrecta].classList.add("correcta");
        }

        this.respuestas[indicePregunta] = indiceOpcion;

        const diapositiva = opcionEl.closest(".cuestionario__diapositiva");
        const contenedorExplicacion = diapositiva.querySelector(".explicacion-container");
        contenedorExplicacion.innerHTML = `
            <div class="explicacion explicacion--${esCorrecta ? "correcta" : "incorrecta"}">
                <div class="explicacion__etiqueta">${esCorrecta ? "\u00a1Correcto!" : "Incorrecto"}</div>
                ${pregunta.explicacion}
            </div>
        `;

        const btnSiguiente = diapositiva.querySelector('[data-accion="siguiente"]');
        if (btnSiguiente) btnSiguiente.disabled = false;
    }

    avanzar() {
        if (this.pasoActual > this.totalPasos) return;
        this.pasoActual++;
        if (this.pasoActual > this.totalPasos) {
            this.mostrarResultados();
        } else {
            this.mostrarPasoActual();
        }
    }

    retroceder() {
        if (this.pasoActual <= 0) return;
        this.pasoActual--;
        this.mostrarPasoActual();
    }

    saltar() {
        window.location.href = "emergencia.html";
    }

    mostrarPasoActual() {
        const diapositivas = this.viewport.querySelectorAll(".cuestionario__diapositiva");
        diapositivas.forEach((d) => d.classList.remove("activa"));

        const destino = this.viewport.querySelector(`[data-paso="${this.pasoActual}"]`);
        if (destino) destino.classList.add("activa");

        this.actualizarProgreso();
    }

    actualizarProgreso() {
        const porcentaje = this.totalPasos > 0 ? (this.pasoActual / this.totalPasos) * 100 : 0;
        this.rellenoProgreso.style.width = `${porcentaje}%`;
        this.infoProgreso.textContent =
            this.pasoActual === 0
                ? ""
                : `Pregunta ${this.pasoActual} de ${this.totalPasos}`;
    }

    mostrarResultados() {
        this.cuestionarioEl.style.display = "none";
        this.resultadosEl.style.display = "flex";

        const respuestasCorrectas = this.respuestas.reduce((contador, respuesta, i) => {
            if (respuesta !== null && preguntas[i].opciones[respuesta].correcta) return contador + 1;
            return contador;
        }, 0);

        const porcentaje = Math.round((respuestasCorrectas / this.totalPasos) * 100);
        mostrarResultados(porcentaje);
    }

    reiniciar() {
        this.pasoActual = 0;
        this.respuestas = new Array(this.totalPasos).fill(null);

        const todasOpciones = this.viewport.querySelectorAll(".opcion");
        todasOpciones.forEach((o) => {
            o.classList.remove("seleccionada", "correcta", "incorrecta", "desactivada");
        });

        const todasExplicaciones = this.viewport.querySelectorAll(".explicacion-container");
        todasExplicaciones.forEach((e) => (e.innerHTML = ""));

        const todosBtnSiguiente = this.viewport.querySelectorAll('[data-accion="siguiente"]');
        todosBtnSiguiente.forEach((b) => (b.disabled = true));

        this.cuestionarioEl.style.display = "flex";
        this.resultadosEl.style.display = "none";

        const diapositivas = this.viewport.querySelectorAll(".cuestionario__diapositiva");
        diapositivas.forEach((d) => d.classList.remove("activa"));
        const primera = this.viewport.querySelector('[data-paso="0"]');
        if (primera) primera.classList.add("activa");

        this.actualizarProgreso();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Cuestionario();
});
