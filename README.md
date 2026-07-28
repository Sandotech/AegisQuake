# Proyecto de Diagnóstico de Emergencias

Plataforma educativa para la preparación ante desastres naturales.

---

## 📖 ¿Cómo colaborar en este proyecto?

Esta guía está pensada para **personas sin experiencia previa con Git o GitHub**. Si ya sabes usar Git, salta a la sección que necesites.

---

### 📦 1. Instalar Git (si no lo tienes)

Git es el programa que usamos para controlar las versiones del proyecto.

#### Windows
1. Ve a https://git-scm.com/download/win
2. Descarga el instalador y ábrelo
3. Deja todas las opciones por defecto y haz clic en **Next** hasta que termine
4. Abre **Git Bash** desde el menú Inicio

#### macOS
1. Abre la Terminal (Busca "Terminal" en Spotlight)
2. Escribe: `git --version`
3. Si no está instalado, te aparecerá una ventana para instalarlo. Sigue las instrucciones.

#### Linux (Ubuntu/Debian)
Abre la terminal y escribe:
```bash
sudo apt update
sudo apt install git -y
```

#### Verificar instalación
En tu terminal, escribe:
```bash
git --version
```
Deberías ver algo como `git version 2.x.x`. Si ves eso, ¡listo!

---

### 🔑 2. Configurar Git por primera vez

Después de instalar Git, abre tu terminal y escribe estos dos comandos (reemplaza con tu nombre y correo):

```bash
git config --global user.name "Tu Nombre o Usuario"
git config --global user.email "tu-email@ejemplo.com"
```

Esto solo se hace **una vez** en tu computadora.

---

### 🍴 3. Obtener el proyecto en tu computadora

#### Opción A: Clonar el repositorio (recomendado)

1. Ve a la página del proyecto en GitHub
2. Haz clic en el botón verde **"Code"**
3. Copia la URL que aparece (termina en `.git`)
4. Abre tu terminal y escribe:

```bash
git clone <URL-del-repositorio>
```

Ejemplo:
```bash
git clone https://github.com/usuario/expomierda.git
```

5. Entra a la carpeta del proyecto:
```bash
cd expomierda
```

#### Opción B: Descargar el ZIP

1. Ve a la página del proyecto en GitHub
2. Haz clic en **"Code"** → **"Download ZIP"**
3. Descomprime el archivo en tu computadora
4. Abre la terminal y navega hasta la carpeta:
```bash
cd ruta/donde/descomprimiste/expomierda
```

---

### 🌿 4. Crear una rama (branch) para trabajar

**¿Qué es una rama?** Es una copia del proyecto donde puedes hacer tus cambios sin afectar el original. Piensa en ello como un "borrador" separado.

NUNCA trabajes directamente en la rama `main` o `master`. Siempre crea tu propia rama.

```bash
git checkout -b nombre-de-tu-rama
```

Reglas para el nombre de la rama:
- Usa minúsculas
- Separa palabras con guiones (`-`)
- Sé descriptivo pero corto

Ejemplos:
```bash
git checkout -b agregar-iconos-mapa
git checkout -b corregir-ortografia-preguntas
git checkout -b seccion-tsunamis
git checkout -b fix-boton-resultados
```

---

### ✏️ 5. Hacer cambios en el proyecto

Ahora puedes abrir los archivos con cualquier editor de texto (Bloc de Notas, VSCode, Sublime, etc.) y hacer tus modificaciones.

**Consejos:**
- No cambies archivos que no estén relacionados con tu tarea
- Si tienes dudas, pregunta antes de modificar
- Guarda los archivos después de cada cambio (Ctrl+S)

---

### 💾 6. Ver qué archivos cambiaste

En la terminal, escribe:

```bash
git status
```

Esto te muestra una lista de los archivos que modificaste. Los archivos en rojo están sin seguimiento, los archivos en verde están listos para commit.

---

### 📍 7. Preparar los archivos para el commit

El "commit" es como tomar una **foto** del estado actual de tu trabajo. Pero antes debes decirle a Git qué archivos quieres incluir en esa foto.

Para agregar **todos** los archivos que modificaste:
```bash
git add .
```

Para agregar **un archivo específico**:
```bash
git add ruta/del/archivo.html
```

Ejemplo:
```bash
git add css/emergencia.css
```

Vuelve a escribir `git status` para confirmar que los archivos ahora están en verde.

---

### 📸 8. Hacer el commit (guardar la "foto")

```bash
git commit -m "Descripción breve de lo que hiciste"
```

Reglas para el mensaje del commit:
- Máximo 50 caracteres
- En español (o inglés si el equipo prefiere)
- Describe QUÉ hiciste, no por qué

Ejemplos:
```bash
git commit -m "Agrega sección de tsunamis a emergencia.html"
git commit -m "Corrige error ortográfico en pregunta 3"
git commit -m "Agrega estilos responsive a la página principal"
```

**Tip:** Si el mensaje es muy largo, puedes omitir `-m` y se abrirá un editor. En ese caso:
1. Escribe tu mensaje
2. Presiona `Ctrl+X` (o `Esc :wq` en Linux)
3. Presiona `Y` para confirmar
4. Presiona `Enter`

---

### 📤 9. Subir tu rama a GitHub (push)

Hasta ahora todo está en tu computadora. Para que los demás vean tus cambios, debes subirlos a GitHub.

La primera vez que subes tu rama:
```bash
git push origin nombre-de-tu-rama
```

Ejemplo:
```bash
git push origin corregir-ortografia-preguntas
```

Si todo sale bien, verás un mensaje que dice algo como:
```
 * [new branch]      corregir-ortografia-preguntas -> corregir-ortografia-preguntas
```

Si ya habías subido tu rama antes (solo estás actualizando cambios):
```bash
git push
```

---

### 🔀 10. Crear un Pull Request (PR)

El Pull Request es una **solicitud para mezclar** tus cambios con la rama principal del proyecto.

1. Ve a la página del proyecto en GitHub
2. Verás un banner amarillo que dice algo como: **"corregir-ortografia-preguntas had recent pushes"**
3. Haz clic en **"Compare & pull request"**

   Si no ves el banner:
   - Haz clic en la pestaña **"Pull requests"**
   - Haz clic en el botón verde **"New pull request"**
   - En "base" asegúrate que sea `main`
   - En "compare" selecciona tu rama (`nombre-de-tu-rama`)

4. Escribe un título descriptivo para tu PR
5. En la descripción, explica:
   - ¿Qué cambios hiciste?
   - ¿Por qué los hiciste?
   - Si hay algo que el revisor debe saber

6. Haz clic en **"Create pull request"**

---

### ✅ 11. ¿Y ahora qué?

- Alguien del equipo revisará tu PR
- Puede pedirte cambios o sugerencias
- Si te piden cambios, solo hazlos en tu computadora, haz commit y push de nuevo (el PR se actualiza solo)
- Cuando todo esté bien, alguien aprobará y mezclará tu PR

---

### 🔄 12. Mantener tu rama actualizada

Mientras trabajas, otros pueden haber hecho cambios en `main`. Para traer esos cambios a tu rama:

```bash
git checkout main
git pull origin main
git checkout nombre-de-tu-rama
git merge main
```

Si hay conflictos (el mismo archivo fue modificado por dos personas), Git te lo dirá. Pregunta al equipo cómo resolverlo.

---

### 🧹 13. Después de que tu PR sea aprobado

Puedes borrar tu rama (local y en GitHub) para mantener todo limpio:

```bash
git checkout main
git pull origin main
git branch -d nombre-de-tu-rama
```

---

### ❗ Resumen rápido (cheat sheet)

```bash
# 1. Clonar el proyecto
git clone <URL-del-repositorio>
cd proyecto

# 2. Crear una rama
git checkout -b mi-rama

# 3. Hacer cambios en los archivos...

# 4. Ver qué cambió
git status

# 5. Preparar archivos
git add .

# 6. Hacer commit
git commit -m "Descripción de mis cambios"

# 7. Subir la rama
git push origin mi-rama

# 8. Ir a GitHub y crear el Pull Request 🎉
```

---

### ❓ Problemas comunes

| Problema | Solución |
|----------|----------|
| `git: command not found` | Git no está instalado. Ve a la sección 1 |
| `Permission denied` | No tienes acceso al repositorio. Pide que te agreguen como colaborador |
| El push no funciona | ¿Estás parado dentro de la carpeta del proyecto? Usa `cd expomierda` |
| `Merge conflict` | Dos personas editaron el mismo archivo. No entres en pánico. Pregunta al equipo |
| No veo mis cambios en GitHub | Asegúrate de haber hecho `git push origin nombre-de-tu-rama` |

---

### 💬 ¿Dudas?

Pregunta sin miedo. Todos empezamos sin saber. Este proyecto es para aprender.
