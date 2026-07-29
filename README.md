# Centro de Emergencia | Exposucre

Plataforma educativa para la preparación ante desastres naturales. Diagnóstico interactivo, guías de actuación, mochila 72, primeros auxilios y contactos de emergencia.

Construido con **Vue 3 + Vite + Vue Router + Pinia**.

---

## 📑 Tabla de contenidos

- [📋 Requisitos previos](#-requisitos-previos)
- [🚀 Instalación rápida](#-instalación-rápida)
- [🛠️ Comandos disponibles](#️-comandos-disponibles)
- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [🎨 Convenciones de código](#-convenciones-de-código)
- [➕ Cómo agregar una nueva vista](#-cómo-agregar-una-nueva-vista)
- [🔌 Cómo agregar un composable](#-cómo-agregar-un-composable)
- [🤝 Cómo colaborar en este proyecto](#-cómo-colaborar-en-este-proyecto)
- [🎯 Características principales](#-características-principales)
- [🛣️ Roadmap](#️-roadmap)
- [📞 Contactos de emergencia Venezuela](#-contactos-de-emergencia-venezuela)

---

## 📋 Requisitos previos

- **Node.js** versión 18 o superior ([descargar](https://nodejs.org/))
- **npm** (se instala con Node.js)
- **Git** ([descargar](https://git-scm.com/))

Verificar instalación:
```bash
node --version    # debe mostrar v18+ o v20+
npm --version     # debe mostrar 9+ o 10+
git --version
```

---

## 🚀 Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/Sandotech/AegisQuake
cd AegisQuake

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El servidor se abrirá automáticamente en `http://localhost:5173`.

---

## 🛠️ Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción localmente |
| `npm run serve` | Inicia el servidor accesible desde otros dispositivos en la red |

---

## 📁 Estructura del proyecto

```
expomierda/
├── public/                    # Archivos estáticos
│   └── favicon.svg
├── src/
│   ├── assets/                # Imágenes
│   ├── components/            # Componentes Vue reutilizables
│   │   ├── AppHeader.vue      # Header sticky con logo y navegación
│   │   ├── AppFooter.vue      # Footer
│   │   ├── FabEmergencia.vue  # Botón flotante de 911
│   │   ├── BtnTema.vue        # Toggle modo oscuro
│   │   ├── HeroCard.vue       # Hero reutilizable
│   │   ├── HeroMiniTarjeta.vue
│   │   ├── GuiaCard.vue       # Tarjeta de guía de emergencia
│   │   ├── ChecklistItem.vue  # Item individual de checklist
│   │   ├── CategoriaChecklist.vue
│   │   ├── TarjetaAuxilio.vue # Tarjeta de primeros auxilios
│   │   ├── ContactoCard.vue   # Tarjeta de contacto
│   │   ├── ContadorProgreso.vue # Anillo SVG de progreso
│   │   ├── SemaforoResultado.vue
│   │   └── OpcionCuestionario.vue
│   ├── views/                 # Páginas
│   │   ├── VistaInicio.vue    # Cuestionario diagnóstico
│   │   ├── VistaEmergencia.vue # Centro de emergencia
│   │   └── VistaPrincipal.vue # Panel de monitoreo Arduino
│   ├── composables/           # Lógica reutilizable (Composition API)
│   │   ├── useTema.js
│   │   ├── useChecklist.js
│   │   ├── useContactos.js
│   │   ├── useCuestionario.js
│   │   └── useResultados.js
│   ├── stores/                # Pinia stores
│   │   ├── preparacion.js
│   │   └── configuracion.js
│   ├── data/                  # Datos estáticos
│   │   └── preguntas.js
│   ├── router/                # Vue Router
│   │   └── index.js
│   ├── styles/                # Estilos globales
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── base.css
│   ├── App.vue                # Componente raíz
│   └── main.js                # Punto de entrada
├── index.html                 # HTML de entrada (Vite)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Convenciones de código

### Componentes Vue

- Cada componente es un **Single File Component** (SFC) con `<script setup>`, `<template>` y `<style scoped>`.
- Nombres en **PascalCase** y con sufijo descriptivo (`HeroCard.vue`, `FabEmergencia.vue`).
- Los estilos van con `<style scoped>` para evitar fugas entre componentes.

### Composables

- Funciones que empiezan con `use` (`useTema`, `useChecklist`).
- Encapsulan lógica reactiva reutilizable.
- Se importan directamente en los componentes que los necesitan.

### Stores (Pinia)

- Para estado global que se comparte entre múltiples componentes.
- Se accede con `useStoreNameStore()`.

### CSS

- **Variables CSS** en `src/styles/variables.css` (colores, espaciados, tipografías).
- Usar `var(--nombre-variable)` en lugar de valores hardcodeados.
- Clases en **kebab-case** y siguiendo convención BEM (`guia__titulo`, `contacto-card--destacado`).

---

## ➕ Cómo agregar una nueva vista

1. Crear `src/components/MiComponente.vue`
2. Crear `src/views/MiVista.vue` (importando el componente)
3. Agregar la ruta en `src/router/index.js`:
   ```js
   {
       path: "/mi-ruta",
       name: "mi-ruta",
       component: () => import("@/views/MiVista.vue"),
       meta: { titulo: "Mi Vista" },
   }
   ```
4. Acceder vía `<router-link to="/mi-ruta">` o `router.push("/mi-ruta")`.

---

## 🔌 Cómo agregar un composable

1. Crear `src/composables/useMiLogica.js`:
   ```js
   import { ref, computed } from "vue";

   export function useMiLogica() {
       const estado = ref(0);
       const duplicado = computed(() => estado.value * 2);

       function incrementar() {
           estado.value++;
       }

       return { estado, duplicado, incrementar };
   }
   ```
2. Importar en cualquier componente:
   ```js
   import { useMiLogica } from "@/composables/useMiLogica";
   const { estado, incrementar } = useMiLogica();
   ```

---

## 🤝 Cómo colaborar en este proyecto

Esta guía está pensada para **personas sin experiencia previa con Git o GitHub**.

### 1. Instalar Git

#### Windows
1. Ve a https://git-scm.com/download/win
2. Descarga el instalador y ábrelo
3. Deja todas las opciones por defecto y haz clic en **Next** hasta que termine
4. Abre **Git Bash** desde el menú Inicio

#### macOS
1. Abre la Terminal (Busca "Terminal" en Spotlight)
2. Escribe: `git --version`
3. Si no está instalado, te aparecerá una ventana para instalarlo.

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git -y
```

### 2. Configurar Git (solo la primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 3. Flujo de trabajo

#### Crear una rama para tu cambio

```bash
# Asegúrate de estar en main y tener lo último
git checkout main
git pull origin main

# Crear tu rama
git checkout -b mi-nueva-funcionalidad
```

Reglas para nombres:
- minúsculas
- guiones para separar palabras
- descriptivo y corto
- prefijos sugeridos: `feat/` (funcionalidad), `fix/` (corrección), `docs/` (documentación), `style/` (estilos)

Ejemplos:
```bash
git checkout -b feat/agregar-inundacion
git checkout -b fix/typo-contactos
git checkout -b docs/instrucciones-instalacion
```

#### Hacer cambios y commits

```bash
# Ver qué archivos modificaste
git status

# Agregar archivos
git add .                              # todos
git add src/components/MiComponente.vue # uno específico

# Hacer commit
git commit -m "Descripción breve del cambio"
```

Reglas para mensajes de commit:
- Máximo 50 caracteres
- Verbo en presente o infinitivo
- Describir QUÉ hiciste

#### Subir tu rama

```bash
git push origin mi-nueva-funcionalidad
```

#### Crear Pull Request en GitHub

1. Ve a la página del proyecto en GitHub
2. Verás un banner amarillo: **"mi-nueva-funcionalidad had recent pushes"**
3. Haz clic en **"Compare & pull request"**
4. Escribe un título y descripción
5. Haz clic en **"Create pull request"**
6. Espera la revisión y aprobación

---

## 🎯 Características principales

- ✅ **Vue 3** con Composition API (`<script setup>`)
- ✅ **Vite** para desarrollo rápido y builds optimizados
- ✅ **Vue Router** con lazy loading de vistas
- ✅ **Pinia** para estado global
- ✅ **Modo oscuro** con persistencia
- ✅ **Reactividad automática** (sin manipular DOM)
- ✅ **Web Serial API** para conectar Arduino directamente
- ✅ **Componentes reutilizables** (FAB, header, footer)
- ✅ **Responsive** mobile-first
- ✅ **Persistencia en localStorage** (checklist, contactos, tema)

---

## 🛣️ Roadmap

- [ ] PWA (instalable, offline)
- [ ] Mapa de zonas de riesgo
- [ ] Notificaciones push para alertas sísmicas
- [ ] Integración con APIs de sismos en tiempo real (USGS, etc.)
- [ ] Plan familiar (puntos de encuentro, contactos)
- [ ] Soporte multi-idioma
- [ ] Tests unitarios con Vitest

---

## 📞 Contactos de emergencia Venezuela

- **911** — Emergencias general
- **171** — Protección Civil
- **0800-BOMBEROS** — Bomberos
- **0800-CRUZROJA** — Cruz Roja Venezolana

---

<footer align="center">
    Diego Santos · Product Engineer
</footer>
