# Vistaguay AgTech - Full Design System & UI/UX Specifications

## 1. Color Palette & Tokens

### Core Brand Colors
* **Primary (Vistaguay Green):** `#47C278`
  * Tailwind Tokens: `primary`, `primary-container`
  * Standard Hover State: `#3DB067`
  * Active/Click State: `#349B5B` (`active:scale-95`)
  * Accessible Text on Primary: `#FFFFFF` (`text-white`)
* **General Page Background:** `#FAFAFA` (`bg-[#FAFAFA]`)
  * Estandarizado en todas las secciones principales para fluidez visual.
* **Surface Containers:** `#FFFFFF` (`bg-surface`)
* **Dark Contrast Accents:**
  * Dark App Accent (Experts): `#182230` (Hover: `#253244`)
  * Inverse Surface (Developer Card): `#2F3131` (`bg-inverse-surface`)
  * Hero Background Overlay: `bg-black/65`
  * Final CTA Overlay: `bg-black/60`

### Text & Contrast Standards (WCAG 2.1 AA Compliant)
* **Headings (H1, H2, H3):** `#1A1C1C` (`text-on-surface`)
* **Body Text (Primary Copy):** `#3E4A3F` (`text-on-surface-variant`)
* **Body Text (Secondary/Muted Copy):** `#334155` (`text-slate-700`) / `#1E293B` (`text-slate-800`)
* **Dark Background Copy:** `#FFFFFF` (`text-white`) / `#CBD5E1` (`text-slate-300`)

---

### 2. Typography Hierarchy & Readability Rules

* **Font Family:** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700, 800)
* **Strict Hierarchy Directive:** Visual hierarchy follows a cascading order: T1 > T2 > S1 > T3 > S2 across all layouts and templates.
  * **Bookend Headline Scale:** The Hero H1 Title and the Final CTA Title share the same visual scale (`text-2xl md:text-3xl lg:text-4xl font-extrabold`) to frame the page layout, while standard section H2 titles use `text-xl md:text-2xl font-extrabold`.
* **Casing Directive:** Remove `uppercase` and `tracking-wider` classes from all interactive buttons, header links, tab selectors, and CTAs. Convert all text labels to standard Sentence case (e.g. "Servicios", "Ir a la plataforma", "Registrarse", "Conocer la plataforma", "Soy piloto de drone", "Empezar como productor").

| Element | Responsive Tailwind Classes | Desktop Size | Mobile Size | Rules / Guidelines |
| :--- | :--- | :--- | :--- | :--- |
| **T1 (Hero Title)** | `text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight` | 36px | 24px | Máximo 1 por página. El elemento más grande del sitio. |
| **T2 (Section Titles)** | `text-xl md:text-2xl font-extrabold text-slate-900 leading-snug` | 24px | 20px | Unificado en todas las secciones principales. |
| **S1 (Section Subtitles)** | `text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed` | 14px | 12px | Ubicado directamente debajo de los títulos T2. |
| **T3 (Card / Service Titles)**| `text-sm sm:text-base font-bold text-slate-900 leading-snug` | 16px | 14px | Titulares dentro de tarjetas de servicios y subsecciones. |
| **S2 (Card Descriptions)** | `text-xs sm:text-sm text-slate-600 leading-relaxed mb-3` | 14px | 12px | Texto base para descripciones de tarjetas, labores y viñetas. |
| **H4 (Subheadings/Badges)** | `text-xs sm:text-[13px] font-bold text-slate-800` | 13px | 12px | Etiquetas de pasos y subtítulos de bloques secundarios. |
| **Hero Lead Copy** | `text-xs sm:text-sm text-slate-200 font-medium leading-relaxed` | 14px | 12px | Párrafo introductorio de alta legibilidad sobre imagen oscura. |
| **Micro Copy / Badges** | `text-xs font-bold text-slate-500` | 12px | 12px | Para etiquetas, contadores, fechas y copyright. |

---

## 3. Button Hierarchy & Interactive Elements

Todos los botones interactivos y enlaces se presentan en **Sentence case** (sin uppercase y sin tracking-wider) y comparten un único **Universal CTA Button Token** (`py-2 px-4.5 text-xs font-semibold normal-case rounded-full`) para coherencia absoluta.

### A. Primary CTA Button (Solid Green)
* **Uso:** Acciones principales de conversión (*Conocer la plataforma*, *Registrarse*, *Empezar como productor*, *Sumate como Expert*).
* **Clases:**
  `bg-primary hover:bg-[#3db067] text-white py-2 px-4.5 rounded-full font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2`

### B. Secondary CTA Button - Dark/Hero Variant (Translucent White)
* **Uso:** Acciones secundarias sobre fondos oscuros o imágenes (*Soy piloto de drone*, *Registrarme como piloto*).
* **Clases:**
  `bg-white/10 hover:bg-white/20 border border-white/40 text-white py-2 px-4.5 rounded-full font-semibold text-xs transition-all active:scale-95 inline-block text-center`

### C. Secondary CTA Button - Light/Header Variant (Outline Gray)
* **Uso:** Acciones secundarias sobre fondos claros o bordes (*Ir a la plataforma*).
* **Clases:**
  `border border-slate-300 text-slate-800 hover:border-primary hover:text-primary py-2 px-4.5 rounded-full font-semibold text-xs transition-all text-center inline-block`

### D. Dark Accent CTA Button (App Experts)
* **Uso:** Descarga de app para pilotos / perfil técnico (*Descargar app Experts*).
* **Clases:**
  `bg-[#182230] hover:bg-[#253244] text-white py-2 px-4.5 rounded-full font-semibold text-xs transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2`

### E. Tertiary Links (Navbar Navigation)
* **Uso:** Enlaces del menú principal (*Servicios*, *Pilotos*, *Desarrolladores*).
* **Clases:**
  `text-xs font-semibold text-slate-700 hover:text-primary transition-colors normal-case`

---

## 4. Mobile Navigation & Responsive Component Rules

### Navbar Height & Layout
* **Navbar Altura:** Estandarizada en `h-14 md:h-15` (56px a 60px) para visualización minimalista en laptops.
* **Logo Dimensiones:** Altura de `h-5 md:h-5.5` para alinear.
* Enlaces Navbar: `text-xs font-semibold text-slate-700 hover:text-primary transition-colors normal-case`.
* Botones Navbar: `py-2 px-4.5 text-xs font-semibold rounded-full normal-case`.
* Contenedor dropdown (`#mobile-menu`):
  * Clases: `bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/80 px-6 py-6 flex flex-col`.
  * Enlaces superiores: `text-sm font-semibold text-slate-800 hover:text-primary py-1`.
  * Separador: `<hr class="border-slate-200/80 my-4">`.
  * Botones de acción: `Registrarse` e `Ir a la plataforma` apilados.

### Stats Counter Cards (Sección 2)
* **Padding / Spacing:** Section padding increased to `pt-16 pb-12 md:pt-20 md:pb-16` for clear separation. Counter cards internal padding `py-3 px-4 sm:py-3.5 sm:px-5`.
* **Stats Numbers:** `text-xl sm:text-2xl lg:text-3xl font-extrabold`.
* **Stat Labels:** `text-[10px] sm:text-[11px] font-bold text-slate-600`.
* **Brand Logos Row:** Separation margin increased to `mt-12 pt-8 md:mt-16 md:pt-10`. Logo heights upscaled to `h-8 sm:h-9 md:h-10`, gaps `gap-4 sm:gap-6`. Only active partner logos are rendered (Endeavor and Grupo Gaman deleted).

### Tabbed Services Showcase (Sección 4)
* Selector de solapas horizontal: `flex flex-wrap justify-center gap-2 mb-6`.
* Botón inactivo: `px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:border-primary/50 text-xs font-bold shadow-sm transition-all normal-case`.
* Botón activo: `px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md transition-all normal-case`.
* Altura del contenedor de tarjeta: Limitada a `lg:h-[480px]`.
* **Card Titles T3 Token:** `text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2`.
* **Card Bullet Items:** `text-xs sm:text-sm font-medium text-slate-700 leading-normal flex items-center gap-2`.
* **Benefit Pills:** Padding `py-1 px-2.5 sm:py-1.5 sm:px-3`, text `text-[11px] sm:text-xs font-semibold text-slate-700`, icons `text-xs text-primary`, gap `gap-1.5 sm:gap-2`.
* **Weed Sub-Tab Toggle Token:** Container `p-1 bg-slate-100/90 border border-slate-200 rounded-full inline-flex items-center gap-1`, Active `py-1 px-3 bg-primary text-white text-[11px] sm:text-xs font-semibold rounded-full shadow-sm normal-case`, Inactive `py-1 px-3 text-slate-600 hover:text-slate-900 text-[11px] sm:text-xs font-medium rounded-full normal-case`.
* **Hero Ecosystem Nodes:** Wrapper circles upscaled to `w-20 h-20 sm:w-22 sm:h-22` (80px x 80px) to comfortably fit inner elements. Node coordinate centers calibrated exactly on SVG vertices (Top: 15%, 50%; Bottom-Left: 72%, 18%; Bottom-Right: 72%, 82%). Center Logo wrapper scaled to `w-20 h-20 sm:w-22 sm:h-22` at Top: 58%, Left: 50%. Pill labels styled using `absolute -bottom-6 left-1/2 -translate-x-1/2` to protect center coordinates.
* **Hero Height Token:** Set to `min-h-[92vh] lg:min-h-screen pt-24 pb-20` for seamless layout fit and viewpoint breathing room.

1. **Atributos de Accesibilidad Obligatorios:**
   * Menú Mobile: `aria-label="Abrir menú de navegación"`
   * Flechas Carrusel: `aria-label="Anterior testimonio"` / `aria-label="Siguiente testimonio"`
   * Botón Cerrar Modal: `aria-label="Cerrar ventana"`
2. **Contraste Mínimo:**
   * Garantizar que ningún texto informativo utilice `text-slate-400` o `opacity-40` directo en fondo claro.
3. **Limpieza de Spacing & Secciones:**
   * Reducir espaciado de secciones (secciones generales reducidas a `py-10 md:py-12`, tarjetas internas reducidas a `p-5 md:p-8`).
   * Mantener line-height y márgenes compactos para diseño limpio SaaS.
   * Footer vertical padding: `py-6 md:py-8`, links `text-xs`, copyright `text-[10px]`.