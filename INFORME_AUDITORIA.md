# INFORME DE AUDITORÍA TÉCNICA, ARQUITECTURA FRONTEND Y SISTEMA DE DISEÑO UI/UX
**Proyecto:** Vistaguay AgTech - Homepage  
**Fecha de Evaluación:** Septiembre 2026  
**Rol del Auditor:** Senior Frontend Architect & UI/UX Design System Specialist  
**Estado:** Finalizado  

---

## 1. RESUMEN EJECUTIVO

### 1.1 Calificación General del Estado del Proyecto (Health Score)
* **Puntuación Global:** **68 / 100** (Nivel: *Aceptable con Deuda Técnica Significativa y Riesgos de Regresión Visual*)
  * **Arquitectura y Modularidad:** `75/100` (Buena separación de archivos JS/CSS, pero con contaminación del scope global e inconsistencias de sincronización).
  * **Alineación con Documentación (`.agents/` & `README.md`):** `55/100` (Fricción alta, reglas desactualizadas, tokens no respetados o contradictorios).
  * **UI/UX y Diseño Responsive:** `62/100` (Micro-textos ilegibles en mobile de 10px-11px fomentados por la propia documentación, distorsión vertical en tablets y grids comprimidas).
  * **Higiene de Código y Estabilidad:** `78/100` (Llamadas a funciones inexistentes en HTML, imágenes rotas con error 404 y etiquetas HTML huérfanas).

```
+-----------------------------------------------------------------------+
| MATRIZ DE SALUD DEL PROYECTO                                          |
|                                                                       |
| [========================......] 68% CALIDAD GLOBAL                   |
|                                                                       |
| - Rendimiento & Assets:       70% [███████░░░] (Archivos crudos >16MB)|
| - Consistencia UI/UX:          62% [██████░░░░] (Fuentes <12px mobile) |
| - Sincronización Docs/Code:   55% [█████░░░░░] (Deuda en .agents/)    |
| - Robustez JavaScript:        80% [████████░░] (1 Function 404 en HTML)|
| - Calidad Marcado HTML:       75% [███████░░░] (Tags huérfanos </main>)|
+-----------------------------------------------------------------------+
```

### 1.2 Principales Riesgos Detectados
1. **Riesgo de Ejecución (JavaScript Error 404):** `index.html` ejecuta en el footer un atributo `onclick="copyEmailToClipboard(event, 'soporte@vistaguay.com')"` cuya función **no existe** en ningún archivo JS del repositorio, provocando un error fatal no capturado en la consola del navegador (`Uncaught ReferenceError`).
2. **Riesgo de Carga y 404 en Media:** La sección *Business* invoca directamente las imágenes `images/business-analytics.png` y `images/business-banners.png`, las cuales **no existen** en el directorio `images/`, arrojando errores HTTP 404 al rotar el carrusel. Asimismo, existen imágenes originales sin optimizar (`mdm-gob-origin.jpg` de 12.6 MB y `mdm-gog-origin.jpeg` de 4.2 MB) acumulando casi 17 MB innecesarios en el repositorio.
3. **Degradación de Legibilidad Móvil (Anti-patrón Tipográfico):** El archivo `.agents/design.md` estandarizó tamaños de fuente de `10px`, `11px` y `12px` para dispositivos móviles (usando clases como `text-[10px]`, `text-[11px]`, `text-sm`), lo cual vulnera los estándares de accesibilidad WCAG 2.1 AA y provoca fatiga visual extrema en pantallas pequeñas.
4. **Distorsión de Layout en Tablets (768px - 1023px):** El *Hero* combina `min-h-[92vh] flex items-center` en columna única vertical con una animación SVG interactiva escalada mediante `scale-105 transform origin-top`, generando alturas artificiales que superan la ventana gráfica y desbordan el layout.

---

## 2. TABLA COMPARATIVA DE DOCUMENTACIÓN VS. CÓDIGO REAL

Análisis cruzado línea por línea de `.agents/design.md`, `.agents/rules.md`, `.agents/memory.md` y `README.md` frente a la implementación real en `index.html`, `css/` y `js/`:

| Documento & Sección | Regla / Promesa Documentada | Realidad en Código | Diagnóstico y Nivel de Impacto |
| :--- | :--- | :--- | :--- |
| **`design.md`**<br>§1. Colores y Tokens | Prohibición estricta de valores Hexadecimales hardcodeados en HTML; uso exclusivo de tokens Tailwind (`primary`, etc.). | Múltiples clases en HTML y JS inyectan Hex (`bg-[#FAFAFA]`, `bg-[#eefaf2]`, `#111827`, `#6ee7b7`, `rgba(71,194,120,...)`). | **ALTO**: Ruptura de consistencia en el sistema de diseño. Dificulta cambios temáticos globales. |
| **`design.md`**<br>§2. Tipografía | T1 Bookend (36px Desktop / 24px Mobile). S1/S2 (14px Desktop / 12px Mobile). Microcopy (12px Desktop / 10-11px Mobile). | Se aplican arbitrariamente clases `text-sm`, `text-[10px]`, `text-[11px]`, `text-sm`, `text-base` sin escala modular CSS unificada. | **CRÍTICO**: La propia regla documentada valida textos ilegibles de 10px-11px en mobile. |
| **`design.md`**<br>§3. Elevaciones | Se descarta el uso de `.shadow-lg` custom. Uso exclusivo de sombras nativas Tailwind (`shadow-sm`, `shadow-lg`, `shadow-xl`, `shadow-2xl`). | Se mezclan utilidades nativas con sombras arbitrarias inline en JS y CSS (`shadow-[0_20px_50px_rgba(71,194,120,0.22)]`, etc.). | **MEDIO**: Desorden visual en los niveles de profundidad Z. |
| **`design.md`**<br>§4. Botones | `.btn-primary`: `py-2 px-4.5 text-sm font-semibold`.<br>`.btn-outline`: `py-2 px-4.5 text-sm font-semibold`. | En `css/components.css`:<br>`.btn-primary` tiene `14px font-bold`, `padding: 10px 22px`.<br>`.btn-outline` tiene `13px font-semibold`, `padding: 8px 18px`. | **ALTO**: Contradicción directa entre el documento rector y el CSS real. |
| **`rules.md`**<br>§2. Arquitectura | *No Inline Code*: `index.html` debe mantenerse semántico; nunca escribir `<style>` o `<script>` inline. | `js/pilots-map.js` inyecta dinámicamente un tag `<style>` en `document.head` con keyframes `@keyframes pulseDotGlow`. | **MEDIO**: Violación técnica del principio de separación de estilos (debió ubicarse en `animations.css`). |
| **`rules.md`**<br>§2. Scope Global | Las funciones llamadas desde atributos HTML (`onclick="..."`) deben exponerse explícitamente a `window`. | `index.html` (L904) invoca `onclick="copyEmailToClipboard(event, 'soporte@vistaguay.com')"`. La función **no existe** en ningún archivo JS. | **CRÍTICO**: Bug funcional en producción que dispara error al hacer clic en el correo del footer. |
| **`rules.md`**<br>§3. Tokens & a11y | Todos los botones interactivos deben usar clases centralizadas (`.btn-primary`, `.tab-btn`) en lugar de strings largos de Tailwind. | En `index.html` y `js/solutions.js`, múltiples botones y controles segmentados aún aplican listas de 10+ utilidades Tailwind ad-hoc. | **MEDIO**: Deuda técnica pendiente documentada en `memory.md` que aún no fue concluida. |
| **`rules.md`**<br>§4. Auto-documentación | Al agregar/modificar archivos en `js/`, `css/` o `data/`, actualizar la tabla de árbol en `README.md`. | `README.md` **omite** por completo los archivos `js/business.js` y `js/process-flow.js`. | **MEDIO**: Desincronización del repositorio con la documentación del equipo. |
| **`memory.md`**<br>Registro de Tareas | Registra tareas de refactorización como pendientes (`[ ] Refactorizar clases...`). | Las clases de botones fueron parcialmente implementadas en `components.css` pero la memoria no fue actualizada. | **BAJO**: Documento de estado desactualizado. |
| **`README.md`**<br>Estructura de Datos | Lista `data/[Pitch Deck].pdf` como archivo presente en el repositorio. | El archivo `data/[Pitch Deck].pdf` **no existe** físicamente en `data/` (solo existe `pilots.json`). | **BAJO**: Referencia fantasma en la documentación. |

---

## 3. AUDITORÍA DE CÓDIGO MUERTO Y ARCHIVOS HUÉRFANOS

### 3.1 Inventario de Módulos JavaScript (`js/`) y CSS (`css/`)
Todos los archivos presentes en el árbol de directorios fueron contrastados con sus llamadas e importaciones en `index.html`:

| Archivo | Tipo | Estado de Invocación | Rol y Observaciones |
| :--- | :---: | :---: | :--- |
| `js/tailwind-config.js` | JS | **ACTIVO** | Cargado en `<head>` (L11). Extiende tokens de Tailwind. Posee tipografías no utilizadas en HTML. |
| `js/main.js` | JS | **ACTIVO** | Cargado en L946. Gestiona menú móvil, modal y scroll reveal. |
| `js/stats.js` | JS | **ACTIVO** | Cargado en L947. IntersectionObserver de contadores animados. |
| `js/process-flow.js` | JS | **ACTIVO (No Doc.)** | Cargado en L948. Controla la animación del flujo de 6 pasos. **Omitido en `README.md`**. |
| `js/solutions.js` | JS | **ACTIVO** | Cargado en L949. Genera dinámicamente las tarjetas de servicios. |
| `js/testimonials.js` | JS | **ACTIVO** | Cargado en L950. Carrusel 3D con clonación triple y autoplay. |
| `js/pilots-map.js` | JS | **ACTIVO** | Cargado en L951. Mapa Leaflet con datos de `pilots.json` y titileo distribuido. |
| `js/ecosystem-animation.js` | JS | **ACTIVO** | Cargado en L952. Animación interactiva SVG y nodos del Hero. |
| `js/weed-combo.js` | JS | **ACTIVO** | Cargado en L953. Modal interactivo con efecto cortina (clip-path) para malezas/conteo. |
| `js/business.js` | JS | **ACTIVO (No Doc.)** | Cargado en L954. Animación de UI interactiva para Business. **Omitido en `README.md`**. |
| `css/components.css` | CSS | **ACTIVO** | Cargado en `<head>` (L20). Estilos de botones, tabs y cards. |
| `css/animations.css` | CSS | **ACTIVO** | Cargado en `<head>` (L21). Keyframes para marquesina, latidos y glassmorphism. |
| `css/leaflet-custom.css` | CSS | **ACTIVO** | Cargado en `<head>` (L23). Personalización de Leaflet modo oscuro. |

> **Conclusión de Módulos:** No se detectan archivos `.js` o `.css` completamente huérfanos (los 10 scripts y 3 estilos se vinculan en `index.html`), pero existe una falta de sincronización en `README.md` donde `js/process-flow.js` y `js/business.js` no están inventariados.

---

### 3.2 Activos Multimedia Faltantes (Errores 404) y Archivos Crudos Sin Optimizar

```
[AUDITORÍA DE ASSETS - ESTADO DE INTEGRIDAD]
├── images/
│   ├── business-analytics.png  ---> [ERROR 404: ARCHIVO INEXISTENTE - Invocado en index.html:511]
│   ├── business-banners.png    ---> [ERROR 404: ARCHIVO INEXISTENTE - Invocado en index.html:512]
│   ├── mdm-gob-origin.jpg      ---> [PESO EXCESIVO: 12.6 MB - Raw Asset sin uso en producción]
│   ├── mdm-gog-origin.jpeg     ---> [PESO EXCESIVO: 4.2 MB - Raw Asset sin uso en producción]
│   └── (17 assets restantes)   ---> [OK - Vinculados correctamente]
└── data/
    ├── pilots.json             ---> [OK - 32 KB]
    └── [Pitch Deck].pdf        ---> [DOC FANTASMA: Mencionada en README.md pero no existe en disco]
```

1. **`images/business-analytics.png` (404 Not Found):** Invocada en `index.html` L511 como imagen de la tarjeta 2 de la sección Business (`#biz-img-1`). Al rotar a esta tarjeta, el usuario visualiza un marco vacío o ícono de imagen rota.
2. **`images/business-banners.png` (404 Not Found):** Invocada en `index.html` L512 como imagen de la tarjeta 3 de Business (`#biz-img-2`). Mismo comportamiento de rotura visual.
3. **Imágenes Maestras Sin Comprimir en Repositorio:**
   * `images/mdm-gob-origin.jpg` pesa **12.615.680 bytes (12.6 MB)**.
   * `images/mdm-gog-origin.jpeg` pesa **4.209.511 bytes (4.2 MB)**.
   * Total de espacio desperdiciado en control de versiones: **16.8 MB**, cuando las versiones optimizadas en producción (`mdm-gob.jpg` y `mdm-gog.jpg`) ya existen y pesan menos de 3 MB.

---

### 3.3 Higiene de Código, Marcado HTML y JavaScript

#### A. Errores de Sintaxis y Marcado en `index.html`
* **Línea 904:** `<a href="mailto:soporte@vistaguay.com" onclick="copyEmailToClipboard(event, 'soporte@vistaguay.com')"...>`  
  * **Problema:** La función `copyEmailToClipboard` no está declarada ni exportada en ningún archivo JS. Provoca `ReferenceError` al interactuar.
* **Línea 944:** Etiqueta de cierre `</main>` huérfana.  
  * **Problema:** No existe una etiqueta de apertura `<main>` en todo el documento HTML.
* **Línea 266:** Etiqueta de cierre `</div>` sobrante / mal anidada al final de la sección de estadísticas y marcas.

#### B. Contaminación del Ámbito Global (Global Scope Pollution)
En lugar de encapsular el estado en funciones autoejecutables (IIFE) o módulos estándar:
* `js/solutions.js` expone globalmente `currentWeedSubKey` y el objeto masivo `tabData`.
* `js/weed-combo.js` expone `comboInterval` en el scope global.
* `js/testimonials.js` expone `testimonials`, `activeTestimonialIndex`, `testimonialInterval` y `isTransitioning` globalmente.
* `js/business.js` expone `solicitudAnimTimers` globalmente.

#### C. Rendimiento y Event Listeners
* `js/main.js` (L79): `window.addEventListener('scroll', revealOnScroll)` ejecuta el cálculo `getBoundingClientRect()` en **cada frame del scroll** sin aplicar técnicas de *throttling* o *debouncing*, ni delegar la totalidad del trabajo al `IntersectionObserver`.
* `js/pilots-map.js` (L85): Presencia de `console.error("Error loading pilot map dataset:", err)` activo en producción sin un fallback visual amigable si la carga del JSON falla.

---

## 4. DIAGNÓSTICO UI/UX, TIPOGRAFÍA Y RESPONSIVE DESIGN

```
+---------------------------------------------------------------------------------------+
| DIAGNÓSTICO VISUAL DE ANOMALÍAS RESPONSIVE                                            |
|                                                                                       |
|  [ MOBILE (<640px) ]          [ TABLET (768px-1023px) ]      [ DESKTOP (>=1024px) ]   |
|  +--------------------+       +-------------------------+    +-----------------------+|
|  | [10px] Microtextos |       | Hero min-h-[92vh]       |    | Layout 2 columnas     ||
|  | Ilegibles (<12px)  |       | + SVG escalado (105%)   |    | equilibrado.          ||
|  |                    |       | = Estiramiento excesivo |    | Legibilidad adecuada. ||
|  | Grid 2-col colapsa |       | y scroll innecesario.   |    |                       ||
|  +--------------------+       +-------------------------+    +-----------------------+|
+---------------------------------------------------------------------------------------+
```

### 4.1 Causa Raíz de los Textos Enanos en Mobile ($10\text{px} - 12\text{px}$)
1. **Promulgación Directa en la Documentación:** En `.agents/design.md`, la sección 2 establece como "estándar" tokens con tamaños de 10px, 11px y 12px para dispositivos móviles:
   * Micro Copy / Badges: `12px Mobile`
   * S1 / S2: `text-sm` (`12px Mobile`)
   * Stat Labels: `text-sm sm:text-sm`
   * Footer Copyright & Subtitles: `text-[10px]`
   * Pills de Beneficios: `text-[11px]`
2. **Falta de Escala Modular con Tipografía Fluida:** Al utilizar clases estáticas de Tailwind (`text-[10px]`, `text-[11px]`, `text-sm`) sin funciones CSS de escalado fluido (`clamp(min, val, max)`), las pantallas con densidad de píxeles alta (Retina/OLED móviles de 375px–414px de ancho físico) renderizan textos diminutos que obligan al usuario a realizar zoom manual o generan abandono por falta de accesibilidad (incumplimiento del criterio WCAG 1.4.4 Resize Text).

### 4.2 Distorsión y Estiramiento Vertical en el *Hero* (Tablets: 768px - 1023px)
1. **Conflicto de Alto Mínimo:** `<section class="relative min-h-[92vh] lg:min-h-screen flex items-center...">` fuerza a la sección a ocupar casi el 100% del viewport vertical.
2. **Disposición Unidimensional (Stacking):** En pantallas entre 768px y 1023px, la clase `lg:flex-row` aún no se activa, por lo que el contenedor opera como `flex-col`.
3. **Escala Agresiva de la Animación:** En `js/ecosystem-animation.js` (L6), el contenedor SVG tiene la clase `scale-95 sm:scale-105 lg:scale-110 transform origin-top` junto a un aspecto fijo `aspect-[4/3] max-h-[480px]`. Al escalar al 105% en `sm:` (tablets), el SVG se agranda verticalmente ocupando más de 500px, lo que sumado al bloque de texto superior (título H1, párrafo y 2 botones apilados) genera una altura total de más de 950px. Esto hace que el contenido se corte o estire desproporcionadamente en tablets con orientación vertical.

### 4.3 Colapso y Apiñamiento en Grillas Móviles (Grids de 2 Columnas)
1. **Diagrama de Proceso (6 Pasos):** La clase `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` (L299) fuerza una grilla de 2 columnas en pantallas menores a 640px. Con márgenes de pantalla de 24px a cada lado, cada columna dispone de apenas ~150px de ancho para renderizar:
   * Número de paso ("01")
   * Círculo con ícono (40px)
   * Título de paso
   * Párrafo descriptivo
   * *Resultado:* Los textos de 3 líneas colapsan en 5-6 líneas verticales, generando saltos de línea desproporcionados y una sensación de desorden visual.
2. **Píldoras de Beneficios en Soluciones (`solutions.js`):** `grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2` genera cajas de menos de 135px de ancho en mobile, provocando que los textos como *"Menos impacto ambiental"* o *"Retorno de inversión > 300%"* se trunquen o queden apretados junto al ícono SVG.

---

## 5. PROPUESTA DE TOKENS PARA EL NUEVO `design.md` (DISEÑO ATÓMICO)

Para resolver definitivamente las contradicciones entre la documentación y el código, se formula una arquitectura basada en **Atomic Design**:

```
+------------------------------------------------------------------------------------+
| ARQUITECTURA DEL NUEVO SISTEMA DE DISEÑO ATÓMICO                                   |
|                                                                                    |
| [ ÁTOMOS ]       Colores, Tipografía Fluida (clamp), Espaciado, Sombras, Radios    |
|      ↓                                                                             |
| [ MOLÉCULAS ]    .btn-primary, .tab-btn, .benefit-pill, .stat-counter, .badge     |
|      ↓                                                                             |
| [ ORGANISMOS ]   Navbar, Hero Section, Process Stepper, Solutions Showcase, Footer |
+------------------------------------------------------------------------------------+
```

### 5.1 Átomos (Tokens Base)

#### A. Paleta de Colores Estandarizada
```css
:root {
  /* Brand Primary */
  --color-primary: #47C278;
  --color-primary-hover: #3DB067;
  --color-primary-active: #349B5B;
  --color-primary-light: #EEFAF2;
  --color-primary-glow: rgba(71, 194, 120, 0.35);

  /* Neutrals & Surfaces */
  --color-bg-app: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F8FAFC;
  --color-surface-dark: #1E293B;
  --color-surface-inverse: #2F3131;

  /* Text Colors (WCAG 2.1 AA Compliant - Contrast > 4.5:1) */
  --color-text-title: #0F172A;      /* Slate 900 */
  --color-text-body: #334155;       /* Slate 700 - Legibilidad superior a #3E4A3F */
  --color-text-muted: #64748B;      /* Slate 500 */
  --color-text-on-dark: #F8FAFC;    /* Slate 50 */
  --color-text-on-dark-muted: #CBD5E1; /* Slate 300 */

  /* Borders */
  --color-border-subtle: #E2E8F0;   /* Slate 200 */
  --color-border-hover: rgba(71, 194, 120, 0.5);
}
```

#### B. Escala Tipográfica Fluida (Responsive Font Scale con `clamp`)
*Se elimina terminantemente cualquier tamaño inferior a $13\text{px}$ en componentes informativos.*

| Token Atómico | Fórmula CSS `clamp()` | Rango (Mobile $\rightarrow$ Desktop) | Aplicación en UI |
| :--- | :--- | :--- | :--- |
| `--font-display-h1` | `clamp(1.75rem, 4vw + 0.75rem, 2.5rem)` | $28\text{px} \rightarrow 40\text{px}$ | H1 Hero & Título CTA Principal |
| `--font-title-h2` | `clamp(1.35rem, 2.5vw + 0.5rem, 1.875rem)`| $21.6\text{px} \rightarrow 30\text{px}$ | H2 Títulos de Sección |
| `--font-title-h3` | `clamp(1.05rem, 1.2vw + 0.6rem, 1.25rem)` | $16.8\text{px} \rightarrow 20\text{px}$ | H3 Tarjetas, Servicios y Pasos |
| `--font-body-base` | `clamp(0.9375rem, 0.4vw + 0.85rem, 1rem)` | $15\text{px} \rightarrow 16\text{px}$ | Textos descriptivos principales |
| `--font-body-sm` | `clamp(0.8125rem, 0.3vw + 0.75rem, 0.875rem)`| $13\text{px} \rightarrow 14\text{px}$ | Subtítulos, ítems de listas y bullets |
| `--font-micro-badge` | `clamp(0.75rem, 0.2vw + 0.7rem, 0.8125rem)` | $12\text{px} \rightarrow 13\text{px}$ | Micro-etiquetas, copyright y badges |

#### C. Elevaciones y Sombras Consistentes
```css
:root {
  --shadow-card-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-card-md: 0 4px 16px rgba(0, 0, 0, 0.05);
  --shadow-card-lg: 0 10px 30px rgba(0, 0, 0, 0.08);
  --shadow-primary-btn: 0 4px 14px rgba(71, 194, 120, 0.35);
  --shadow-primary-btn-hover: 0 6px 20px rgba(71, 194, 120, 0.45);
}
```

---

### 5.2 Moléculas (Componentes Reutilizables Centralizados)

Las siguientes clases deben residir de manera canónica en `css/components.css`:

```css
/* Botón de Acción Principal (Verde) */
.btn-primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-size: var(--font-body-sm);
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: var(--shadow-primary-btn);
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px) scale(1.02);
  box-shadow: var(--shadow-primary-btn-hover);
}
.btn-primary:active {
  transform: scale(0.96);
}

/* Botón Secundario Translúcido (Fondos Oscuros) */
.btn-secondary-hero {
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #FFFFFF;
  font-size: var(--font-body-sm);
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  backdrop-blur: 4px;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}
.btn-secondary-hero:hover {
  background-color: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-1px) scale(1.02);
}

/* Botón Secundario Borde Claro (Header / Plataforma) */
.btn-outline {
  background-color: transparent;
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-title);
  font-size: var(--font-body-sm);
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}
.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  transform: translateY(-1px) scale(1.02);
}

/* Píldora de Beneficio / Parámetro */
.benefit-pill {
  background-color: #F8FAFC;
  border: 1px solid var(--color-border-subtle);
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-body-sm);
  font-weight: 600;
  color: var(--color-text-body);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.benefit-pill:hover {
  border-color: var(--color-border-hover);
  background-color: #FFFFFF;
}
```

---

### 5.3 Organismos (Estructuras de Alto Nivel)

1. **TopNavBar:** Barra fija de altura estandarizada `h-16` (64px) con backdrop blur, enlaces centrados con tipografía `text-sm font-semibold` y botones con tamaño uniforme.
2. **Hero Showcase:** Sección contenida con alto natural (`min-h-[80vh] md:min-h-[85vh]`), donde en tabletas se reorganiza con `flex-col` pero limitando la altura del mount SVG a `max-h-[380px]` para evitar el empuje vertical del layout.
3. **Stepper de Proceso (Cómo Funciona):** Estructura que en mobile `<640px` se visualiza como **1 columna vertical con conector continuo lateral**, y en desktop `>=1024px` conmuta a **6 columnas con barra horizontal continua**.
4. **Carrusel de Testimonios:** Módulo interactivo con loop infinito triple, pausado en hover y controles circulares accesibles con etiquetas `aria-label`.

---

## 6. PLAN DE ACCIÓN PRIORIZADO

Hoja de ruta sugerida para implementar las correcciones y refactorizaciones una vez aprobado este informe:

```
[PLAN DE ACCIÓN POR FASES DE EJECUCIÓN]

Fase 1: P0 (Inmediato)   ──► Corrección de Bugs JS (copyEmail), 404 de Assets y Sintaxis HTML
Fase 2: P1 (Prioritario) ──► Reestructuración Tipográfica Mobile & Corrección de Grids Colapsadas
Fase 3: P2 (Medio Plazo) ──► Optimización de Assets Pesados, Throttling de Scroll & Scope JS
Fase 4: P3 (Final)       ──► Sincronización Canónica de .agents/ (design.md, rules.md, memory.md, README)
```

### Fase 1: P0 - Correcciones Críticas de Estabilidad y Errores 404 (Tiempo Estimado: Inmediato)
* [ ] **JS Function Fix:** Crear y exponer `window.copyEmailToClipboard = function(event, email) { ... }` en `js/main.js` para que el botón de soporte en el footer copie al portapapeles y muestre el toast visual `#email-copied-toast`.
* [ ] **Limpieza de Marcado:** Eliminar etiqueta huérfana `</main>` (L944) y `</div>` sobrante (L266) en `index.html`.
* [ ] **Resolución de Assets 404:**
  * Reemplazar las referencias a `images/business-analytics.png` y `images/business-banners.png` por imágenes existentes en el repositorio o componentes SVG estáticos para evitar errores 404 en la consola de red.
* [ ] **Sincronización de `README.md`:** Incorporar formalmente `js/process-flow.js` y `js/business.js` a la tabla descriptiva de scripts, y remover la mención a `data/[Pitch Deck].pdf`.

### Fase 2: P1 - Tipografía, Responsive y Grids Móviles (Tiempo Estimado: Corto Plazo)
* [ ] **Eliminación de Micro-textos:** Reemplazar clases `text-[10px]`, `text-[11px]` y `text-sm` en textos explicativos y títulos por la nueva escala `text-sm` (13-14px) y `text-base` (15-16px).
* [ ] **Readecuación de Grillas en Mobile:**
  * Modificar `index.html` L299 para usar `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6` en el diagrama de 6 pasos.
  * Modificar `js/solutions.js` para usar `grid-cols-1 gap-2` en las listas de beneficios/parámetros en mobile.
* [ ] **Ajuste de Hero en Tablet:** Modificar `js/ecosystem-animation.js` y la sección Hero para limitar la altura y escala del SVG en breakpoints `sm:` y `md:` evitando el estiramiento vertical.

### Fase 3: P2 - Optimización de Rendimiento y Modularidad (Tiempo Estimado: Mediano Plazo)
* [ ] **Eliminación de Assets Crudos:** Eliminar o mover fuera del bundle web `images/mdm-gob-origin.jpg` (12.6 MB) y `images/mdm-gog-origin.jpeg` (4.2 MB) para aligerar el repositorio.
* [ ] **Throttling en Scroll Listener:** Migrar la detección de scroll `.reveal` en `js/main.js` a un `IntersectionObserver` puro o aplicar un throttle de 100ms.
* [ ] **Encapsulación de Scripts:** Envolver `js/solutions.js`, `js/testimonials.js`, `js/business.js` y `js/weed-combo.js` en IIFEs para proteger el ámbito global.

### Fase 4: P3 - Actualización Canónica del Sistema de Diseño (Tiempo Estimado: Cierre)
* [ ] **Actualización de `.agents/design.md`:** Reemplazar las especificaciones desactualizadas con la propuesta de Diseño Atómico detallada en la Sección 5 de este informe.
* [ ] **Actualización de `.agents/rules.md` y `.agents/memory.md`:** Reflejar el nuevo estándar de componentes centralizados y marcar como completadas las tareas correspondientes.

---
*Fin del Informe de Auditoría Técnica.*
