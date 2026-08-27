# Vistaguay AgTech - Documentación del Proyecto

Sitio web institucional de Vistaguay AgTech para conectar productores agrícolas, asesores y empresas con pilotos de drones y servicios de analítica de precisión.

---

## Estructura de Archivos y Módulos

### Módulos JavaScript (`js/`)
Módulos ES independientes con responsabilidad única:

* **`js/main.js`**: Lógica del menú mobile, modal de descarga (`#download-modal`), observadores de scroll (`.reveal`) y carga diferida (lazy load) del video.
* **`js/stats.js`**: Animación de contadores numéricos al entrar en pantalla vía `IntersectionObserver`.
* **`js/solutions.js`**: Selector de solapas de servicios y renderizado dinámico de tarjetas, contenidos e imágenes superpuestas.
* **`js/weed-combo.js`**: Modal interactivo que muestra la combinación del Mapeo de Malezas y Conteo de Plantas (PQ) en un mismo vuelo.
* **`js/testimonials.js`**: Carrusel 3D de testimonios en bucle continuo con pausa al hover y controles de navegación.
* **`js/pilots-map.js`**: Inicialización del mapa Leaflet.js en modo oscuro, lectura del dataset y renderizado de marcadores.
* **`js/ecosystem-animation.js`**: Renderizado y control de la animación interactiva de nodos en la sección Hero.

### Hojas de Estilo CSS (`css/`)
Estilos divididos por capas de uso:

* **`css/components.css`**: Componentes UI reutilizables (`.btn-circle-icon`, `.benefit-pill`, `.testimonial-card`).
* **`css/animations.css`**: Reglas `@keyframes`, carrusel infinito de marcas (`.animate-scroll`) y efectos de revelado al scroll.
* **`css/leaflet-custom.css`**: Estilos del tema oscuro, tooltips y ajustes visuales para el mapa Leaflet.

### Datos y Fuentes (`data/`)
* **`data/pilots.json`**: Dataset con coordenadas geográficas de pilotos. *(Datos demostrativos para simular la cobertura en el mapa)*.
* **`data/[Pitch Deck].pdf`**: Presentación comercial original utilizada como fuente base para los textos y métricas de la web.

### Configuración para IAs (`.agents/`)
* **`.agents/design.md`**: Sistema de diseño UI/UX (tokens de color, tipografía, botones y elevaciones).
* **`.agents/rules.md`**: Reglas técnicas de arquitectura (modularidad CSS/JS, accesibilidad y exposición al objeto global `window`).

---

## Uso de la carpeta `.agents/` en Prompts

Para solicitar cambios a un asistente de IA (Antigravity, Cursor, Copilot, ChatGPT, Claude), hacé referencia a estos archivos según el tipo de tarea:

### Cambios de Diseño o Estilos (HTML / CSS)
> "Agregá un nuevo botón en la sección de soluciones siguiendo los tokens y la jerarquía de `@.agents/design.md`."

### Funciones JavaScript o Nuevos Archivos
> "Creá el script para el modal basándote en `@.agents/rules.md` para mantener el código modular, exponer las funciones al objeto `window` y cumplir con las normas de accesibilidad."

### Secciones Completas o Refactorizaciones
> "Vamos a crear una nueva sección. Consultá `@.agents/design.md` para los estilos visuales y `@.agents/rules.md` para la estructura del código."

---

## Ejecución en Entorno Local

Para evitar bloqueos de seguridad CORS al leer `data/pilots.json` con `fetch()`, iniciá la web mediante un servidor local:

**Opción A (VS Code):**
Hacer clic derecho sobre `index.html` ➔ **Open with Live Server**.

**Opción B (Terminal Python):**
```bash
python -m http.server 8000