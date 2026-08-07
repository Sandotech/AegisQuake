import { ref, computed } from "vue";
import datosBase from "@/data/datos_arduino_placeholder.json";

const INTERVALO_MS = 2000;
const MAX_HISTORIAL = 24;

// ============================================================
// UMBRALES DE ALERTA — con base en referencias reales:
//  - Temperatura: ola de calor / fuego cercano (guías OSHA/NWS).
//    En zona tropical el ambiente está en 28-35°C, así que solo
//    se alerta por encima de lo que no es clima normal.
//  - Vibración: escala Mercalli (MMI) ↔ aceleración pico del suelo
//    (PGA, USGS). Advertencia 0.5 m/s² ≈ MMI IV (objetos vibran);
//    crítico 1.5 m/s² ≈ MMI V (lo sienten casi todos, caen objetos).
//  - Gas: ratio Rs/Ro como indica el datasheet del MQ-2. Se mide la
//    línea base (Ro) al arrancar; el valor crudo no es confiable
//    porque depende del circuito y del envejecimiento del sensor.
//  - Llama: se exigen varias lecturas consecutivas (~6s) para evitar
//    falsos positivos del sensor IR (sol, reflejos).
// ============================================================
const UMBRALES = {
    temperatura: { advertencia: 38, critico: 42 }, // °C
    humedad: { advertencia: 90, critico: 95 }, // %
    vibracion: { advertencia: 0.5, critico: 1.5 }, // m/s²
    gas: {
        ratioAdvertencia: 1.3, // Rs/Ro
        ratioCritico: 2.5, // Rs/Ro
        calibracionLecturas: 5, // lecturas para promediar Ro
    },
    llama: { confirmaciones: 3 }, // lecturas seguidas para confirmar fuego
};

// Mientras el ESP32 no transmita por WiFi, este composable lee el archivo
// JSON y le aplica pequeñas variaciones para simular datos en vivo.
//
// Cuando se conecte el ESP32:
//   1) Borra la función `obtenerDatos` (la que está abajo) y reemplázala por:
//
//      async function obtenerDatos() {
//          const res = await fetch("http://IP_DEL_ESP32/data"); // ← IP del ESP32
//          return await res.json();
//      }
//
//   2) Idealmente la calibración del gas (línea base Ro) se hace en el
//      propio ESP32, en aire limpio, antes de empezar a transmitir.
//      Aquí se promedia automáticamente con las primeras lecturas.

const temperatura = ref(datosBase.dht.temperatura);
const humedad = ref(datosBase.dht.humedad);
const gas = ref(datosBase.mq2.gas);
const llama = ref(datosBase.llama.detectada);
const ejes = ref({
    ax: datosBase.mpu6050.ax,
    ay: datosBase.mpu6050.ay,
    az: datosBase.mpu6050.az,
    gx: datosBase.mpu6050.gx,
    gy: datosBase.mpu6050.gy,
    gz: datosBase.mpu6050.gz,
});

const conectado = ref(false);
const ultimaActualizacion = ref(null);
const historial = ref([]);

const lineaBaseGas = ref(null);
const gasCalibrado = ref(false);
const conteoLlama = ref(0);

let intervalo = null;
let lecturasCalibracion = [];

function variar(valor, rango) {
    return valor + (Math.random() - 0.5) * rango;
}

function obtenerDatos() {
    return {
        dht: {
            temperatura: variar(datosBase.dht.temperatura, 0.6),
            humedad: variar(datosBase.dht.humedad, 2),
        },
        mq2: {
            gas: Math.round(variar(datosBase.mq2.gas, 30)),
        },
        llama: {
            detectada: datosBase.llama.detectada,
        },
        mpu6050: {
            ax: variar(datosBase.mpu6050.ax, 0.1),
            ay: variar(datosBase.mpu6050.ay, 0.1),
            az: variar(datosBase.mpu6050.az, 0.1),
            gx: variar(datosBase.mpu6050.gx, 0.05),
            gy: variar(datosBase.mpu6050.gy, 0.05),
            gz: variar(datosBase.mpu6050.gz, 0.05),
        },
    };
}

function aplicarDatos(datos) {
    temperatura.value = Math.round(datos.dht.temperatura * 10) / 10;
    humedad.value = Math.round(datos.dht.humedad * 10) / 10;
    gas.value = Math.round(datos.mq2.gas);
    llama.value = Boolean(datos.llama.detectada);
    conteoLlama.value = llama.value ? conteoLlama.value + 1 : 0;
    ejes.value = {
        ax: datos.mpu6050.ax,
        ay: datos.mpu6050.ay,
        az: datos.mpu6050.az,
        gx: datos.mpu6050.gx,
        gy: datos.mpu6050.gy,
        gz: datos.mpu6050.gz,
    };
    ultimaActualizacion.value = new Date();
    acumularCalibracion(gas.value);

    historial.value = [
        ...historial.value.slice(-(MAX_HISTORIAL - 1)),
        {
            temperatura: temperatura.value,
            humedad: humedad.value,
            gas: gas.value,
            vibracion: magnitudVibracion.value,
        },
    ];
}

// Promedia las primeras lecturas de gas para fijar la línea base (Ro).
function acumularCalibracion(valorGas) {
    if (gasCalibrado.value) return;
    lecturasCalibracion.push(valorGas);
    if (lecturasCalibracion.length >= UMBRALES.gas.calibracionLecturas) {
        const promedio =
            lecturasCalibracion.reduce((a, b) => a + b, 0) / lecturasCalibracion.length;
        lineaBaseGas.value = promedio;
        gasCalibrado.value = true;
        lecturasCalibracion = [];
    }
}


function clasificarTemperatura(v) {
    if (v > UMBRALES.temperatura.critico) return "critico";
    if (v > UMBRALES.temperatura.advertencia) return "advertencia";
    return "normal";
}

function clasificarHumedad(v) {
    if (v > UMBRALES.humedad.critico) return "critico";
    if (v > UMBRALES.humedad.advertencia) return "advertencia";
    return "normal";
}

function clasificarVibracion(v) {
    if (v > UMBRALES.vibracion.critico) return "critico";
    if (v > UMBRALES.vibracion.advertencia) return "advertencia";
    return "normal";
}

// Magnitud de vibración: le quitamos la gravedad al acelerómetro
// para saber cuánto se está moviendo el sensor.
const magnitudVibracion = computed(() => {
    const { ax, ay, az } = ejes.value;
    const gravedad = Math.sqrt(ax * ax + ay * ay + az * az);
    return Math.abs(gravedad - 9.81);
});

const estadoTemperatura = computed(() => clasificarTemperatura(temperatura.value));
const estadoHumedad = computed(() => clasificarHumedad(humedad.value));
const ratioGas = computed(() =>
    lineaBaseGas.value ? gas.value / lineaBaseGas.value : null
);
const estadoGas = computed(() => {
    if (!gasCalibrado.value || ratioGas.value === null) return "normal";
    if (ratioGas.value > UMBRALES.gas.ratioCritico) return "critico";
    if (ratioGas.value > UMBRALES.gas.ratioAdvertencia) return "advertencia";
    return "normal";
});
const estadoVibracion = computed(() => clasificarVibracion(magnitudVibracion.value));
const llamaConfirmada = computed(
    () => conteoLlama.value >= UMBRALES.llama.confirmaciones
);
const estadoLlama = computed(() => (llamaConfirmada.value ? "critico" : "normal"));

const PRIORIDAD = { normal: 0, advertencia: 1, critico: 2 };

const nivelGlobal = computed(() => {
    const estados = [
        estadoTemperatura.value,
        estadoHumedad.value,
        estadoGas.value,
        estadoVibracion.value,
        estadoLlama.value,
    ];
    const peor = estados.reduce((max, e) => Math.max(max, PRIORIDAD[e]), 0);
    if (peor === 2) return "critico";
    if (peor === 1) return "advertencia";
    return "normal";
});

const motivoAlerta = computed(() => {
    const motivos = [];
    if (estadoTemperatura.value !== "normal") motivos.push("temperatura");
    if (estadoHumedad.value !== "normal") motivos.push("humedad");
    if (estadoGas.value !== "normal") motivos.push("gas");
    if (estadoVibracion.value !== "normal") motivos.push("vibración");
    if (estadoLlama.value !== "normal") motivos.push("llama");
    if (!motivos.length) return "No hay advertencias";
    return motivos.join(", ");
});

const porcTemp = computed(() => Math.min(100, (temperatura.value / 50) * 100));
const porcHum = computed(() => Math.min(100, humedad.value));
const porcGas = computed(() => Math.min(100, (gas.value / 1024) * 100));
const porcSismo = computed(() => Math.min(100, (magnitudVibracion.value / 1.5) * 100));

const horaActualizacion = computed(() => {
    if (!ultimaActualizacion.value) return "--:--:--";
    return ultimaActualizacion.value.toLocaleTimeString("es-VE");
});

function iniciar() {
    if (intervalo) return;
    lecturasCalibracion = [];
    lineaBaseGas.value = null;
    gasCalibrado.value = false;
    conteoLlama.value = 0;
    conectado.value = true;
    aplicarDatos(obtenerDatos());
    intervalo = setInterval(() => {
        aplicarDatos(obtenerDatos());
    }, INTERVALO_MS);
}

function detener() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    conectado.value = false;
}

export function useMonitoreo() {
    return {
        temperatura,
        humedad,
        gas,
        llama,
        ejes,
        conectado,
        ultimaActualizacion,
        horaActualizacion,
        historial,
        magnitudVibracion,
        lineaBaseGas,
        gasCalibrado,
        ratioGas,
        estadoTemperatura,
        estadoHumedad,
        estadoGas,
        estadoVibracion,
        estadoLlama,
        llamaConfirmada,
        nivelGlobal,
        motivoAlerta,
        porcTemp,
        porcHum,
        porcGas,
        porcSismo,
        iniciar,
        detener,
    };
}
