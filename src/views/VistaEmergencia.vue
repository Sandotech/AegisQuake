<script setup>
import { ref, computed } from "vue";
import { usePreparacionStore } from "@/stores/preparacion";
import { useContactos } from "@/composables/useContactos";
import { useConfiguracionStore } from "@/stores/configuracion";
import GuiaCard from "@/components/GuiaCard.vue";
import ContadorProgreso from "@/components/ContadorProgreso.vue";
import CategoriaChecklist from "@/components/CategoriaChecklist.vue";
import TarjetaAuxilio from "@/components/TarjetaAuxilio.vue";
import ContactoCard from "@/components/ContactoCard.vue";

const preparacion = usePreparacionStore();
const { contactos, actualizar } = useContactos();
const config = useConfiguracionStore();

const guiaActiva = ref("sismo");

const tabs = [
    { id: "sismo", nombre: "Sismo", subtitulo: "Terremoto" },
    { id: "inundacion", nombre: "Inundación", subtitulo: "Lluvias" },
    { id: "incendio", nombre: "Incendio", subtitulo: "Fuego" },
];

const guiasData = {
    sismo: {
        categoria: "Emergencia sísmica",
        titulo: "Sismo",
        descripcion:
            "Mantén la calma. La mayoría de lesionados se producen al caer objetos o al intentar salir corriendo.",
        tipo: "sismo",
        fases: [
            {
                numero: 1,
                titulo: "Durante el sismo",
                tipo: "critico",
                pasos: [
                    "<strong>Agáchate</strong> — Sobre manos y rodillas para no caer.",
                    "<strong>Cúbrete</strong> — Bajo una mesa resistente, protegiendo cabeza y cuello.",
                    "<strong>Sujétate</strong> — A la pata del mueble hasta que termine el movimiento.",
                    "Aléjate de ventanas, espejos y objetos que puedan caer.",
                    "No uses ascensor ni salgas corriendo.",
                ],
            },
            {
                numero: 2,
                titulo: "Después del sismo",
                tipo: "advertencia",
                pasos: [
                    "<strong>Revisa fugas de gas</strong> — Si hueles, abre puertas y ventanas, no enciendas interruptores.",
                    "<strong>Corta la electricidad</strong> — Si ves cables o daños, baja el interruptor principal.",
                    "Usa linterna, no fósforos ni velas.",
                    "Dirígete al <strong>punto de encuentro</strong> familiar.",
                    "Prepárate para réplicas.",
                ],
            },
            {
                numero: 3,
                titulo: "Prevención",
                tipo: "exito",
                pasos: [
                    "Fija muebles pesados a la pared.",
                    "Identifica zonas seguras en cada habitación.",
                    "Ten lista tu mochila 72.",
                    "Define un punto de encuentro familiar.",
                    "Practica simulacros cada 3 meses.",
                ],
            },
        ],
    },
    inundacion: {
        categoria: "Emergencia por lluvias",
        titulo: "Inundación",
        descripcion:
            "15 cm de agua pueden derribar a una persona. 30 cm arrastran un vehículo. La prevención salva vidas.",
        tipo: "inundacion",
        fases: [
            {
                numero: 1,
                titulo: "Durante la inundación",
                tipo: "critico",
                pasos: [
                    "<strong>Sube a zonas altas</strong> — Piso más alto o techo seguro.",
                    "<strong>No cruces agua corriente</strong> — Ni caminando ni en vehículo.",
                    "Desconecta la electricidad si hay agua cerca.",
                    "Cierra puertas y ventanas para contener el agua.",
                    "No nades en agua de inundación (contaminada).",
                ],
            },
            {
                numero: 2,
                titulo: "Después de la inundación",
                tipo: "advertencia",
                pasos: [
                    "Espera a que las autoridades confirmen que puedes volver.",
                    "Revisa daños estructurales antes de entrar.",
                    "No bebas agua de la llave, podría estar contaminada.",
                    "Limpia con botas y guantes. Desinfecta todo.",
                ],
            },
            {
                numero: 3,
                titulo: "Prevención",
                tipo: "exito",
                pasos: [
                    "Limpia desagües y canaletas antes de las lluvias.",
                    "Monitorea quebradas si vives cerca.",
                    "Identifica rutas hacia zonas altas en tu comunidad.",
                    "Guarda documentos en bolsas impermeables.",
                ],
            },
        ],
    },
    incendio: {
        categoria: "Emergencia por fuego",
        titulo: "Incendio",
        descripcion:
            "El humo sube. Evacúa agachado, cubre nariz y boca. No uses ascensor bajo ninguna circunstancia.",
        tipo: "incendio",
        fases: [
            {
                numero: 1,
                titulo: "Durante el incendio",
                tipo: "critico",
                pasos: [
                    "Corta el gas y la electricidad si es seguro.",
                    'Usa el extintor solo si el fuego es pequeño. <strong>P.A.S.</strong>: <em>P</em>resiona, <em>A</em>punta a la base, <em>S</em>ostén.',
                    "<strong>Evacúa agachado</strong> — Cubre nariz y boca con un paño húmedo.",
                    "No uses ascensor. Toca las puertas con el dorso de la mano.",
                    "Si tu ropa se incendia: <strong>Detén, Cae, Rueda</strong>.",
                ],
            },
            {
                numero: 2,
                titulo: "Después del incendio",
                tipo: "advertencia",
                pasos: [
                    "No reingreses al edificio hasta que sea seguro.",
                    "Dirígete al punto de encuentro familiar.",
                    "Revisa estructuras (techos, paredes, pisos).",
                    "No uses agua en incendios eléctricos.",
                ],
            },
            {
                numero: 3,
                titulo: "Prevención",
                tipo: "exito",
                pasos: [
                    "Instala detectores de humo en cada piso.",
                    "Ten un extintor en la cocina y aprende a usarlo.",
                    "Revisa el cableado eléctrico periódicamente.",
                    "Dibuja un mapa con dos salidas por habitación.",
                    "No dejes velas o cocina encendida sin supervisión.",
                ],
            },
        ],
    },
};

const guiaVisible = computed(() => guiasData[guiaActiva.value]);

const categoriasChecklist = [
    {
        badge: "AGUA",
        titulo: "Agua y alimentos",
        items: [
            { id: 0, titulo: "Agua potable", subtitulo: "4 litros por persona mínimo" },
            { id: 1, titulo: "Alimentos no perecederos", subtitulo: "Enlatados, barras, frutos secos" },
        ],
    },
    {
        badge: "LUZ",
        titulo: "Luz y comunicación",
        items: [
            { id: 2, titulo: "Linterna + pilas extra", subtitulo: "Preferible a dínamo" },
            { id: 3, titulo: "Radio portátil", subtitulo: "Información oficial" },
            { id: 4, titulo: "Cargador portátil", subtitulo: "Power bank cargado" },
        ],
    },
    {
        badge: "SALUD",
        titulo: "Salud y seguridad",
        items: [
            { id: 5, titulo: "Botiquín de primeros auxilios", subtitulo: "Vendas, gasa, alcohol, tijeras" },
            { id: 6, titulo: "Silbato", subtitulo: "Para señalizar ubicación" },
            { id: 7, titulo: "Mascarillas", subtitulo: "Polvo, humo, escombros" },
            { id: 8, titulo: "Higiene personal", subtitulo: "Toallas, gel antibacterial" },
        ],
    },
    {
        badge: "KIT",
        titulo: "Herramientas y documentos",
        items: [
            { id: 9, titulo: "Documentos importantes", subtitulo: "Copias en bolsa impermeable" },
            { id: 10, titulo: "Dinero en efectivo", subtitulo: "Billetes pequeños" },
            { id: 11, titulo: "Manta térmica o abrigo", subtitulo: "Ropa de abrigo e impermeable" },
            { id: 12, titulo: "Multiherramienta", subtitulo: "Navaja, abrelatas, tijeras" },
            { id: 13, titulo: "Bolsas de basura", subtitulo: "Impermeables, aislante" },
        ],
    },
];

const auxilios = [
    {
        icono: "RCP",
        titulo: "Resucitación cardiopulmonar",
        tiempo: "Crítico",
        tipoTiempo: "critico",
        pasos: [
            "Verifica que esté inconsciente y no respire.",
            "Llama a emergencias o pide a alguien que lo haga.",
            "Talón de la mano en el centro del pecho.",
            "Otra mano encima, dedos entrelazados.",
            "<strong>100-120 compresiones por minuto</strong>, hundiendo 5 cm.",
            "Continúa hasta que llegue ayuda o respire.",
        ],
    },
    {
        icono: "SANG",
        titulo: "Hemorragia (sangrado)",
        tiempo: "Urgente",
        tipoTiempo: "urgente",
        pasos: [
            "<strong>Presión directa</strong> con gasa o paño limpio.",
            "Eleva el área herida por encima del corazón.",
            "No retires el paño si se empapa — coloca otro encima.",
            "<strong>Torniquete</strong> solo en extremo riesgo de desangre. Anota la hora.",
            "Busca atención médica inmediata.",
        ],
    },
    {
        icono: "QUEM",
        titulo: "Quemaduras",
        tiempo: "Urgente",
        tipoTiempo: "urgente",
        pasos: [
            "Enfría con <strong>agua fría</strong> (no hielo directo) por 10 min.",
            "No apliques hielo directo — daña el tejido.",
            "No uses cremas, mantequilla ni pasta de dientes.",
            "Cubre con paño limpio y húmedo o gasa estéril.",
            "No revientes ampollas. Atención médica si es grave.",
        ],
    },
    {
        icono: "FRAC",
        titulo: "Fracturas y lesiones",
        tiempo: "Estable",
        tipoTiempo: "estable",
        pasos: [
            "No muevas si sospechas lesión en columna o cuello.",
            "Inmoviliza con tablas, revistas o ropa enrollada.",
            "No intentes enderezar huesos ni reducir dislocaciones.",
            "Aplica hielo envuelto en paño (reduce inflamación).",
            "Traslada solo si es seguro.",
        ],
    },
    {
        icono: "HEIM",
        titulo: "Atragantamiento (Heimlich)",
        tiempo: "Crítico",
        tipoTiempo: "critico",
        pasos: [
            "Si no puede hablar ni toser, actúa de inmediato.",
            "Detrás de la persona, rodea su cintura con los brazos.",
            "Puño cerrado arriba del ombligo, bajo las costillas.",
            "Presiona hacia adentro y arriba con fuerza.",
            "Repite hasta que expulse o pierda el conocimiento.",
            "Si se desmaya: inicia RCP y llama a emergencias.",
        ],
    },
];

function toggleContacto(clave, campo, valor) {
    actualizar(clave, campo, valor);
}

function llamarContacto(telefono) {
    if (telefono && telefono.trim()) {
        window.location.href = `tel:${telefono.trim()}`;
    }
}
</script>

<template>
    <div class="emergencia">
        <section class="hero" aria-label="Tu estado de preparación">
            <div class="hero__contenido">
                <div class="hero__saludo">
                    <span class="hero__etiqueta">Tu centro personal</span>
                    <h1 class="hero__titulo">¿Listo para actuar?</h1>
                    <p class="hero__subtitulo">
                        Revisa tu nivel de preparación y ten a mano todo lo necesario.
                    </p>
                </div>

                <div class="hero__estado">
                    <ContadorProgreso />
                    <div class="hero__estado-info">
                        <span class="hero__estado-etiqueta">Nivel de preparación</span>
                        <span class="hero__estado-nivel">{{ preparacion.nivel.texto }}</span>
                        <span class="hero__estado-detalle">
                            {{ preparacion.hechos }} de {{ preparacion.total }} elementos listos
                        </span>
                    </div>
                </div>

                <div class="hero__acciones">
                    <a href="tel:911" class="accion-rapida accion-rapida--critico">
                        <span class="accion-rapida__icono">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                />
                            </svg>
                        </span>
                        <span class="accion-rapida__texto">
                            <strong>Llamar al 911</strong>
                            <small>Emergencias</small>
                        </span>
                    </a>
                    <button
                        class="accion-rapida accion-rapida--secundario"
                        @click="config.alternarLinterna"
                    >
                        <span class="accion-rapida__icono">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M18 6c0-1.1-.9-2-2-2H8C6.9 4 6 4.9 6 6v3c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V6z"
                                />
                                <path d="M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9" />
                                <path d="M9 16h6" />
                            </svg>
                        </span>
                        <span class="accion-rapida__texto">
                            <strong>Linterna</strong>
                            <small>Iluminar pantalla</small>
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <section class="seccion" id="guias">
            <div class="seccion__encabezado">
                <h2 class="seccion__titulo">Guías de actuación</h2>
                <p class="seccion__subtitulo">
                    Selecciona el tipo de emergencia y sigue los pasos.
                </p>
            </div>

            <div class="guias-selector" role="tablist">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="selector-tarjeta"
                    :class="{ activa: guiaActiva === tab.id }"
                    :aria-selected="guiaActiva === tab.id"
                    role="tab"
                    @click="guiaActiva = tab.id"
                >
                    <span class="selector-tarjeta__texto">
                        <strong>{{ tab.nombre }}</strong>
                        <small>{{ tab.subtitulo }}</small>
                    </span>
                </button>
            </div>

            <div class="guias-paneles">
                <GuiaCard
                    :categoria="guiaVisible.categoria"
                    :titulo="guiaVisible.titulo"
                    :descripcion="guiaVisible.descripcion"
                    :tipo="guiaVisible.tipo"
                    :fases="guiaVisible.fases"
                />
            </div>
        </section>

        <section class="seccion" id="mochila">
            <div class="seccion__encabezado">
                <h2 class="seccion__titulo">Mochila 72</h2>
                <p class="seccion__subtitulo">
                    Todo lo esencial para sobrevivir 72 horas después de una emergencia.
                </p>
            </div>

            <div class="mochila-tarjeta">
                <div class="mochila-progreso">
                    <div class="mochila-progreso-info">
                        <span class="mochila-progreso-numero">
                            <strong>{{ preparacion.hechos }}</strong>
                            <span class="mochila-progreso-de">/{{ preparacion.total }}</span>
                        </span>
                        <span class="mochila-progreso-etiqueta">
                            {{ preparacion.nivel.texto }} · {{ preparacion.porcentaje }}%
                        </span>
                    </div>
                    <div class="mochila-barra">
                        <div
                            class="mochila-barra-relleno"
                            :style="{ width: preparacion.porcentaje + '%' }"
                        ></div>
                    </div>
                </div>

                <div class="mochila-categorias">
                    <CategoriaChecklist
                        v-for="cat in categoriasChecklist"
                        :key="cat.badge"
                        :badge="cat.badge"
                        :titulo="cat.titulo"
                        :items="cat.items"
                        :estados="preparacion.estados"
                        @toggle="(i) => preparacion.alternar(i)"
                    />
                </div>
            </div>
        </section>

        <section class="seccion" id="auxilios">
            <div class="seccion__encabezado">
                <h2 class="seccion__titulo">Primeros auxilios</h2>
                <p class="seccion__subtitulo">
                    Procedimientos básicos mientras llega la ayuda profesional.
                </p>
            </div>

            <div class="auxilios-grid">
                <TarjetaAuxilio
                    v-for="aux in auxilios"
                    :key="aux.icono"
                    :icono="aux.icono"
                    :titulo="aux.titulo"
                    :tiempo="aux.tiempo"
                    :tipo-tiempo="aux.tipoTiempo"
                    :pasos="aux.pasos"
                />
            </div>
        </section>

        <section class="seccion" id="contactos">
            <div class="seccion__encabezado">
                <h2 class="seccion__titulo">Contactos de emergencia</h2>
                <p class="seccion__subtitulo">
                    Guarda estos números y agrega los tuyos. Un clic para llamar.
                </p>
            </div>

            <div class="contactos-principales">
                <ContactoCard
                    numero="911"
                    nombre="Emergencias"
                    subtitulo="Línea general del país"
                    destacado
                    href="tel:911"
                />
                <ContactoCard numero="171" nombre="Protección Civil" subtitulo="Desastres y rescates" href="tel:171" />
                <ContactoCard numero="0800" nombre="Bomberos" subtitulo="Incendios y emergencias" href="tel:0800" />
                <ContactoCard numero="0800" nombre="Cruz Roja" subtitulo="Ambulancias y auxilios" href="tel:0800" />
            </div>

            <div class="contactos-personales">
                <h3 class="contactos__subtitulo-seccion">Tus contactos personales</h3>
                <p class="contactos__sub">Se guardan automáticamente en tu navegador.</p>

                <div class="contactos-lista">
                    <div v-for="(contacto, clave) in contactos" :key="clave" class="contacto-input">
                        <input
                            type="text"
                            class="contacto-input__campo"
                            :placeholder="`Nombre (ej: ${clave === 'contacto1' ? 'Mamá' : clave === 'contacto2' ? 'Papá' : 'Vecino'})`"
                            :value="contacto.nombre"
                            @input="toggleContacto(clave, 'nombre', $event.target.value)"
                        />
                        <input
                            type="tel"
                            class="contacto-input__campo contacto-input__campo--tel"
                            placeholder="0412-1234567"
                            :value="contacto.telefono"
                            @input="toggleContacto(clave, 'telefono', $event.target.value)"
                        />
                        <a
                            href="#"
                            class="contacto-input__llamar"
                            :class="{ 'contacto-input__llamar--inactivo': !contacto.telefono.trim() }"
                            :aria-disabled="!contacto.telefono.trim()"
                            @click.prevent="llamarContacto(contacto.telefono)"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <footer class="emergencia__footer">
            <p class="emergencia__disclaimer">
                Esta guía es orientativa. En caso de emergencia real, contacta siempre a las
                autoridades oficiales.
            </p>
        </footer>
    </div>
</template>

<style scoped>
.emergencia {
    max-width: 880px;
    margin: 0 auto;
    padding: var(--espacio-xl) var(--espacio-lg) var(--espacio-3xl);
}

/* ===== HERO ===== */
.hero {
    background: linear-gradient(135deg, #1b4ef5 0%, #3874ff 50%, #5996ff 100%);
    border-radius: var(--radio-xl);
    padding: var(--espacio-2xl) var(--espacio-xl);
    color: white;
    margin-bottom: var(--espacio-3xl);
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 60%
    );
    pointer-events: none;
}

:global([data-theme="dark"]) .hero {
    background: linear-gradient(135deg, #0e2a9a 0%, #1b4ef5 100%);
}

.hero__contenido {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: var(--espacio-xl);
    align-items: center;
}

.hero__saludo {
    grid-column: 1;
    grid-row: 1;
}

.hero__etiqueta {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radio-completo);
    margin-bottom: var(--espacio-md);
}

.hero__titulo {
    color: white;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 var(--espacio-sm);
}

.hero__subtitulo {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    margin: 0;
}

.hero__estado {
    grid-column: 2;
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    background: rgba(255, 255, 255, 0.12);
    padding: var(--espacio-md) var(--espacio-lg);
    border-radius: var(--radio-xl);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.hero__estado-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    color: white;
}

.hero__estado-etiqueta {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.8;
}

.hero__estado-nivel {
    font-family: var(--fuente-titulos);
    font-size: 1.25rem;
    font-weight: 700;
}

.hero__estado-detalle {
    font-size: 0.85rem;
    opacity: 0.8;
}

.hero__acciones {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    gap: var(--espacio-sm);
    flex-wrap: wrap;
}

.accion-rapida {
    display: flex;
    align-items: center;
    gap: var(--espacio-sm);
    padding: var(--espacio-sm) var(--espacio-lg);
    border: none;
    border-radius: var(--radio-lg);
    text-decoration: none;
    cursor: pointer;
    font-family: var(--fuente-principal);
    transition: all var(--transicion-rapida);
    font-size: 0.9rem;
}

.accion-rapida--critico {
    background: white;
    color: var(--color-critico);
    font-weight: 700;
    box-shadow: var(--sombra-md);
}

.accion-rapida--critico:hover {
    transform: translateY(-2px);
    box-shadow: var(--sombra-lg);
}

.accion-rapida--secundario {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.accion-rapida--secundario:hover {
    background: rgba(255, 255, 255, 0.25);
}

.accion-rapida__icono {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.accion-rapida__texto {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    text-align: left;
}

.accion-rapida__texto strong {
    font-weight: 700;
    font-size: 0.95rem;
}

.accion-rapida__texto small {
    font-size: 0.7rem;
    opacity: 0.8;
    font-weight: 400;
}

/* ===== SECCIONES ===== */
.seccion {
    margin-bottom: var(--espacio-3xl);
}

.seccion__encabezado {
    margin-bottom: var(--espacio-xl);
}

.seccion__titulo {
    font-size: clamp(1.5rem, 3.5vw, 1.875rem);
    font-weight: 700;
    margin: 0 0 var(--espacio-sm);
    color: var(--color-texto);
}

.seccion__subtitulo {
    font-size: 1rem;
    color: var(--color-texto-secundario);
    margin: 0;
    max-width: 540px;
}

/* ===== SELECTOR DE GUÍAS ===== */
.guias-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-xl);
}

.selector-tarjeta {
    display: flex;
    align-items: center;
    gap: var(--espacio-md);
    padding: var(--espacio-md) var(--espacio-lg);
    background: var(--color-superficie);
    border: 2px solid var(--color-borde);
    border-radius: var(--radio-lg);
    cursor: pointer;
    font-family: var(--fuente-principal);
    text-align: left;
    transition: all var(--transicion-rapida);
    color: var(--color-texto);
}

.selector-tarjeta:hover {
    border-color: var(--color-principal);
    transform: translateY(-2px);
    box-shadow: var(--sombra-md);
}

.selector-tarjeta.activa {
    border-color: var(--color-principal);
    background: var(--color-principal);
    color: white;
    box-shadow: var(--sombra-md);
}

.selector-tarjeta__texto {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
}

.selector-tarjeta__texto strong {
    font-weight: 700;
    font-size: 1rem;
}

.selector-tarjeta__texto small {
    font-size: 0.8rem;
    opacity: 0.8;
}

.guias-paneles {
    animation: aparecer 0.3s ease;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== MOCHILA 72 ===== */
.mochila-tarjeta {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    box-shadow: var(--sombra-md);
    overflow: hidden;
}

.mochila-progreso {
    padding: var(--espacio-xl);
    background: linear-gradient(
        135deg,
        var(--color-exito-claro) 0%,
        var(--color-advertencia-claro) 100%
    );
    border-bottom: 1px solid var(--color-borde);
}

:global([data-theme="dark"]) .mochila-progreso {
    background: linear-gradient(
        135deg,
        rgba(67, 160, 71, 0.15) 0%,
        rgba(253, 216, 53, 0.1) 100%
    );
}

.mochila-progreso-info {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: var(--espacio-sm);
}

.mochila-progreso-numero {
    font-family: var(--fuente-titulos);
    font-size: 1.25rem;
    color: var(--color-texto);
}

.mochila-progreso-numero strong {
    font-size: 2rem;
    font-weight: 800;
    margin-right: 0.1rem;
}

.mochila-progreso-de {
    color: var(--color-texto-secundario);
    font-size: 1rem;
    font-weight: 500;
}

.mochila-progreso-etiqueta {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-exito-oscuro);
    padding: 0.2rem 0.75rem;
    background: rgba(67, 160, 71, 0.15);
    border-radius: var(--radio-completo);
}

:global([data-theme="dark"]) .mochila-progreso-etiqueta {
    color: var(--color-exito);
    background: rgba(67, 160, 71, 0.2);
}

.mochila-barra {
    height: 10px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: var(--radio-completo);
    overflow: hidden;
}

.mochila-barra-relleno {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--color-exito) 0%, #66bb6a 100%);
    border-radius: var(--radio-completo);
    transition: width var(--transicion-lenta);
}

.mochila-categorias {
    padding: var(--espacio-xl);
    display: flex;
    flex-direction: column;
    gap: var(--espacio-xl);
}

/* ===== AUXILIOS ===== */
.auxilios-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--espacio-md);
}

/* ===== CONTACTOS ===== */
.contactos-principales {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-xl);
}

.contactos-personales {
    background: var(--color-superficie);
    border-radius: var(--radio-xl);
    padding: var(--espacio-xl);
    box-shadow: var(--sombra-sm);
}

.contactos__subtitulo-seccion {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 var(--espacio-xs);
    color: var(--color-texto);
}

.contactos__sub {
    font-size: 0.85rem;
    color: var(--color-texto-secundario);
    margin: 0 0 var(--espacio-lg);
}

.contactos-lista {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-sm);
}

.contacto-input {
    display: grid;
    grid-template-columns: 1fr 1.2fr auto;
    gap: var(--espacio-sm);
    align-items: center;
}

.contacto-input__campo {
    padding: var(--espacio-sm) var(--espacio-md);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-md);
    font-family: var(--fuente-principal);
    font-size: 0.9rem;
    background: var(--color-fondo);
    color: var(--color-texto);
    transition: all var(--transicion-rapida);
    min-width: 0;
}

.contacto-input__campo:focus {
    outline: none;
    border-color: var(--color-principal);
    background: var(--color-superficie);
    box-shadow: 0 0 0 3px rgba(27, 78, 245, 0.1);
}

.contacto-input__llamar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-exito);
    color: white;
    border-radius: var(--radio-md);
    text-decoration: none;
    transition: all var(--transicion-rapida);
    flex-shrink: 0;
}

.contacto-input__llamar:hover {
    background: var(--color-exito-oscuro);
    transform: scale(1.05);
}

.contacto-input__llamar--inactivo {
    opacity: 0.4;
    pointer-events: none;
}

/* ===== FOOTER ===== */
.emergencia__footer {
    text-align: center;
    padding-top: var(--espacio-xl);
}

.emergencia__disclaimer {
    font-size: 0.85rem;
    color: var(--color-texto-secundario);
    max-width: 480px;
    margin: 0 auto;
    font-style: italic;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .hero__contenido {
        grid-template-columns: 1fr;
    }

    .hero__estado {
        grid-column: 1;
        grid-row: auto;
        justify-self: center;
    }

    .hero__saludo {
        grid-row: auto;
        text-align: center;
    }

    .hero__titulo {
        font-size: 1.75rem;
    }

    .hero__acciones {
        justify-content: center;
    }

    .guias-selector {
        grid-template-columns: 1fr;
    }

    .contactos-principales {
        grid-template-columns: 1fr 1fr;
    }

    .auxilios-grid {
        grid-template-columns: 1fr;
    }

    .contacto-input {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .emergencia {
        padding: var(--espacio-md);
    }

    .hero {
        padding: var(--espacio-xl) var(--espacio-md);
    }

    .mochila-categorias,
    .contactos-personales {
        padding: var(--espacio-md);
    }

    .hero__estado {
        flex-direction: column;
        text-align: center;
    }
}
</style>
