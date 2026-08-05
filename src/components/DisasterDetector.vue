<template>
  <div class="landing-container">
    <router-link to="/emergencia" class="emergency-btn" aria-label="Ir a Emergencia" title="Ir a Centro de Emergencia">
      <span class="emergency-icon"></span>
      <span class="emergency-text">Emergencia</span>
    </router-link>
    <!-- Hero Section -->
    <header class="hero">
      <div class="badge">Expo Sucre 2026</div>
      <h1>Sistema de Detección Temprana de Desastres Naturales</h1>
      <p class="subtitle">
        
      </p>
    </header>

    <!-- Quick summary card (recuadro similar al de la unidad central) -->
    <section class="controller-card">
      <div class="card-header">
        <span class="icon"></span>
        <h2>Monitoreo ambiental e sísmico en tiempo real impulsado por IoT y el controlador ESP32-S3.</h2>
      </div>
      <div class="controller-info">
        <h3>Objetivo del proyecto</h3>
        <p>Proveer a la comunidad de una herramienta tecnológica accesible de detección temprana y monitoreo continuo, capaz de anticipar situaciones de riesgo como incendios, fugas de gas, variaciones extremas del clima o movimientos telúricos antes de que se conviertan en emergencias mayores. Su creación busca fortalecer la seguridad comunitaria, mitigar el impacto de desastres y agilizar la capacidad de respuesta oportuna ante eventos críticos.</p>

      </div>
    </section>

    <!-- Main Microcontroller Card -->
    <section class="controller-card">
      <div class="card-header">
        <span class="icon"></span>
        <h2>Unidad Central del Sistema</h2>
      </div>
      <div class="controller-info">
        <h3>ESP32-S3 WROOM-1 N16R8 Dual Core</h3>
        <p>Procesamiento de alto rendimiento y conectividad para la adquisición continua de datos telemétricos.</p>
        <ul class="specs-grid">
          <li><strong>Núcleos:</strong> Dual Core 32-bit</li>
          <li><strong>Memoria Flash:</strong> 16 MB</li>
          <li><strong>PSRAM:</strong> 8 MB</li>
        </ul>
      </div>
    </section>

    <!-- Sensors Grid -->
    <section class="sensors-section">
      <h2>Módulos y Sensores Integrados</h2>
      <div class="sensors-grid">
        <div class="sensor-card">
          <div class="sensor-icon"></div>
          <h3>DHT11</h3>
          <p class="sensor-type">Temperatura y Humedad</p>
          <p class="sensor-desc">Monitoreo de condiciones climáticas extremas y prevención de olas de calor o condiciones de sequía.</p>
        </div>

        <div class="sensor-card alert-fire">
          <div class="sensor-icon"></div>
          <h3>Sensor de Llama</h3>
          <p class="sensor-type">Detección Infrarroja de Fuego</p>
          <p class="sensor-desc">Detección inmediata de brotes de fuego y focos de incendio en fase inicial.</p>
        </div>

        <div class="sensor-card alert-gas">
          <div class="sensor-icon"></div>
          <h3>MQ-2</h3>
          <p class="sensor-type">Sensor de Gas y Humo</p>
          <p class="sensor-desc">Identificación de concentraciones de humo, gases inflamables y combustión en el entorno.</p>
        </div>

        <div class="sensor-card alert-seismic">
          <div class="sensor-icon"></div>
          <h3>MPU6050</h3>
          <p class="sensor-type">Acelerómetro y Giroscopio</p>
          <p class="sensor-desc">Medición de vibraciones y movimientos telúricos para la alerta temprana de sismos y deslizamientos.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DisasterDetector'
}
</script>

<style scoped>
.landing-container {
  max-width: 1100px;
  position: relative;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: var(--color-fondo);
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--color-texto);
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.badge {
  display: inline-block;
  background-color: var(--color-acento);
  color: var(--color-principal);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.hero h1 {
  font-size: 2.5rem;
  color: var(--color-texto);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-texto-secundario);
  max-width: 700px;
  margin: 0 auto;
}

.controller-card {
  background: var(--color-superficie);
  color: var(--color-texto);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: var(--sombra-md);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-texto-secundario);
}

.controller-info h3 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
  color: var(--color-principal);
}

.specs-grid {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  border-top: 1px solid var(--color-borde);
  padding-top: 1rem;
}

.sensors-section h2 {
  text-align: center;
  font-size: 1.875rem;
  margin-bottom: 2rem;
}

.sensors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.sensor-card {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: var(--sombra-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sensor-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sombra-md);
}

.sensor-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.sensor-card h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--color-texto);
}

.sensor-type {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-principal);
  margin: 0.25rem 0 0.75rem 0;
}

.sensor-desc {
  font-size: 0.925rem;
  color: var(--color-texto-secundario);
  line-height: 1.4;
  margin: 0;
}

/* Botón de emergencia situado arriba a la derecha dentro del landing */
.emergency-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-principal, #e53935);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 6px 12px rgba(0,0,0,0.12);
  z-index: 30;
}

.emergency-icon { font-size: 1rem; }
.emergency-text { font-weight: 700; font-size: 0.9rem; }

/* Títulos con fondo para mantener contraste en ambos temas */
/* Títulos mantienen color del tema, sin fondo específico */
.landing-container h1,
.landing-container h2,
.landing-container h3 {
  color: var(--color-texto);
}
</style>