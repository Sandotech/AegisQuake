const preguntas = [
    {
        id: 1,
        categoria: "Sismos",
        imagen: "assets/images/placeholder-question-1.svg",
        pregunta: "Si ocurre un temblor fuerte mientras estás en un piso alto, ¿qué haces primero?",
        opciones: [
            { texto: "Salir corriendo por las escaleras", correcta: false },
            { texto: "Agacharte, cubrirte y alejarte de ventanas", correcta: true },
            { texto: "Abrir todas las puertas de par en par", correcta: false },
            { texto: "Subirte a una mesa para protegerte", correcta: false }
        ],
        explicacion: "Lo correcto es agacharse, cubrirse la cabeza y alejarse de ventanas y objetos que puedan caer."
    },
    {
        id: 2,
        categoria: "Tsunamis / Costa",
        imagen: "assets/images/placeholder-question-2.svg",
        pregunta: "Si estás en la playa y ves que el mar se retira repentinamente, ¿cuál es tu acción?",
        opciones: [
            { texto: "Quedarte a observar el fenómeno", correcta: false },
            { texto: "Bajar al arena para recoger conchas", correcta: false },
            { texto: "Ir inmediatamente a un lugar alto", correcta: true },
            { texto: "Llamar a tus amigos para que vengan a ver", correcta: false }
        ],
        explicacion: "El retiro repentino del mar es una señal de tsunami. Debes alejarte de la costa y subir a un lugar alto de inmediato."
    },
    {
        id: 3,
        categoria: "Inundaciones",
        imagen: "assets/images/placeholder-question-3.svg",
        pregunta: "Si vives cerca de una quebrada y llueve torrencialmente por más de 45 minutos, ¿qué debes verificar?",
        opciones: [
            { texto: "El nivel del agua en la quebrada", correcta: true },
            { texto: "Si hay señal para usar el celular", correcta: false },
            { texto: "El estado de tu jardín", correcta: false },
            { texto: "Si la luz eléctrica funciona bien", correcta: false }
        ],
        explicacion: "Debes monitorear el nivel del agua en la quebrada y estar preparado para evacuar si es necesario."
    },
    {
        id: 4,
        categoria: "Plan Familiar",
        imagen: "assets/images/placeholder-question-4.svg",
        pregunta: "¿Tu hogar cuenta con un punto de encuentro y una mochila de las 72 horas?",
        opciones: [
            { texto: "No, nunca hemos considerado eso", correcta: false },
            { texto: "Solo tenemos un punto de encuentro", correcta: false },
            { texto: "Solo tenemos una mochila de emergencia", correcta: false },
            { texto: "Sí, contamos con ambos", correcta: true }
        ],
        explicacion: "Un plan familiar completo debe incluir un punto de encuentro designado y una mochila de emergencia para 72 horas."
    }
    
];

const nivelesResultado = [
    {
        rango: [0, 40],
        nivel: "critico",
        etiqueta: "Nivel Crítico",
        mensaje: "Vulnerable ante emergencias. Necesitas repasar los protocolos básicos.",
        consejos: [
            "Aprende los protocolos básicos de cada emergencia",
            "Identifica las rutas de evacuación de tu zona",
            "Crea un plan familiar de emergencia",
            "Prepara una mochila de emergencia básica"
        ]
    },
    {
        rango: [41, 75],
        nivel: "advertencia",
        etiqueta: "Nivel Medio",
        mensaje: "Conocimiento básico, pero tu hogar aún no está protegido.",
        consejos: [
            "Mejora tu plan familiar con puntos de encuentro",
            "Practica simulacros en casa con tu familia",
            "Compra suministros para la mochila de emergencia",
            "Infórmate sobre riesgos específicos de tu zona"
        ]
    },
    {
        rango: [76, 100],
        nivel: "exito",
        etiqueta: "Nivel Preparado",
        mensaje: "¡Excelente! Eres una persona bastante preparada.",
        consejos: [
            "Comparte tus conocimientos con vecinos",
            "Actualiza tu plan familiar periódicamente",
            "Capacita a otros en tu comunidad",
            "Mantén tu mochila de emergencia actualizada"
        ]
    }
];
