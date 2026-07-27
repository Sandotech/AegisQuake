function mostrarResultados(porcentaje) {
    const nivel = nivelesResultado.find(
        (n) => porcentaje >= n.rango[0] && porcentaje <= n.rango[1]
    ) || nivelesResultado[0];

    const tarjeta = document.getElementById("tarjetaResultados");
    tarjeta.className = `resultados__tarjeta resultados__categoria--${nivel.nivel}`;

    document.getElementById("porcentajeResultado").textContent = `${porcentaje}%`;
    document.getElementById("categoriaResultado").textContent = nivel.etiqueta;
    document.getElementById("mensajeResultado").textContent = nivel.mensaje;

    const luzRojo = document.getElementById("luzRojo");
    const luzAmarillo = document.getElementById("luzAmarillo");
    const luzVerde = document.getElementById("luzVerde");

    luzRojo.classList.remove("activa");
    luzAmarillo.classList.remove("activa");
    luzVerde.classList.remove("activa");

    if (nivel.nivel === "critico") luzRojo.classList.add("activa");
    if (nivel.nivel === "advertencia") luzAmarillo.classList.add("activa");
    if (nivel.nivel === "exito") luzVerde.classList.add("activa");

    const listaConsejos = document.getElementById("listaConsejos");
    listaConsejos.innerHTML = nivel.consejos.map((consejo) => `<li>${consejo}</li>`).join("");

    tarjeta.style.animation = "none";
    tarjeta.offsetHeight;
    tarjeta.style.animation = "";
}
