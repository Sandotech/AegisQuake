import { ref, watch } from "vue";

const CONTACTOS_KEY = "expomierda_contactos_v2";

function cargarContactos() {
    try {
        const guardado = localStorage.getItem(CONTACTOS_KEY);
        if (guardado) {
            const parsed = JSON.parse(guardado);
            return {
                contacto1: { nombre: "", telefono: "" },
                contacto2: { nombre: "", telefono: "" },
                contacto3: { nombre: "", telefono: "" },
                ...parsed,
            };
        }
    } catch (e) {
        // ignorar
    }
    return {
        contacto1: { nombre: "", telefono: "" },
        contacto2: { nombre: "", telefono: "" },
        contacto3: { nombre: "", telefono: "" },
    };
}

const contactos = ref(cargarContactos());

watch(
    contactos,
    (nuevo) => {
        try {
            localStorage.setItem(CONTACTOS_KEY, JSON.stringify(nuevo));
        } catch (e) {
            // ignorar
        }
    },
    { deep: true }
);

export function useContactos() {
    function actualizar(clave, campo, valor) {
        contactos.value[clave][campo] = valor;
    }

    return {
        contactos,
        actualizar,
    };
}
