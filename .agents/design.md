# Vistaguay AgTech - Full Design System & UI/UX Specifications

## 1. Color Palette & Tokens

### Core Brand Colors
* **Primary (Vistaguay Green):** Standard Token `primary` (`#47C278`)
  * Tailwind Tokens: `primary`, `bg-primary`, `text-primary`, `border-primary`, `primary-container`
  * Standard Hover State: `#3DB067` (`hover:bg-[#3db067]`)
  * Active/Click State: `#349B5B` (`active:scale-95`)
  * Accessible Text on Primary: `#FFFFFF` (`text-white`)
  * **Strict Policy:** Prohibition of hardcoded `#47C278` hex values in HTML classes. Always use Tailwind `primary` utility tokens.
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

## 2. Typography Hierarchy & Readability Rules

* **Font Family:** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700, 800)
* **Strict Hierarchy Directive:** Visual hierarchy follows a cascading order: T1 > T2 > S1 > T3 > S2 across all layouts and templates.
  * **Bookend Headline Scale:** The Hero H1 Title and the Final CTA Title share the same visual scale (`text-2xl md:text-3xl lg:text-4xl font-extrabold`) to frame the page layout, while standard section H2 titles use `text-xl md:text-2xl font-extrabold`.

### Typography Tokens
* **T1 (Hero Title)**
  * Clases: `text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight`
  * Tamaño: 36px Desktop / 24px Mobile
  * Regla: Máximo 1 por página. El elemento más grande del sitio.
* **T2 (Section Titles)**
  * Clases: `text-xl md:text-2xl font-extrabold text-slate-900 leading-snug`
  * Tamaño: 24px Desktop / 20px Mobile
  * Regla: Unificado en todas las secciones principales.
* **S1 (Section Subtitles)**
  * Clases: `text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed`
  * Tamaño: 14px Desktop / 12px Mobile
  * Regla: Ubicado directamente debajo de los títulos T2.
* **T3 (Card / Service Titles)**
  * Clases: `text-sm sm:text-base font-bold text-slate-900 leading-snug`
  * Tamaño: 16px Desktop / 14px Mobile
  * Regla: Titulares dentro de tarjetas de servicios y subsecciones.
* **S2 (Card Descriptions)**
  * Clases: `text-xs sm:text-sm text-slate-600 leading-relaxed mb-3`
  * Tamaño: 14px Desktop / 12px Mobile
  * Regla: Texto base para descripciones de tarjetas, labores y viñetas.
* **H4 (Subheadings/Badges)**
  * Clases: `text-xs sm:text-[13px] font-bold text-slate-800`
  * Tamaño: 13px Desktop / 12px Mobile
  * Regla: Etiquetas de pasos y subtítulos de bloques secundarios (Sentence case).
* **Hero Lead Copy**
  * Clases: `text-xs sm:text-sm text-slate-200 font-medium leading-relaxed`
  * Tamaño: 14px Desktop / 12px Mobile
  * Regla: Párrafo introductorio de alta legibilidad sobre imagen oscura.
* **Micro Copy / Badges**
  * Clases: `text-xs font-bold text-slate-500`
  * Tamaño: 12px Desktop / 12px Mobile
  * Regla: Para etiquetas, contadores, fechas y copyright.

---

## 3. Elevation & Surface Hierarchy (Native Tailwind Shadows)

Se descarta el uso de la clase custom `.shadow-lg`. Todas las elevaciones del sitio se manejan mediante las utilidades nativas de Tailwind CSS para garantizar consistencia visual y código ligero:

* **Sombra suave (`shadow-sm`):** Usada en tarjetas pequeñas, badges o botones secundarios (`shadow-sm border border-slate-200/70`).
* **Sombra contenedora (`shadow-lg`):** Usada en secciones contenedoras principales como Solución de punta a punta, Expert y Developers (`shadow-lg border border-slate-200/80`).
* **Sombra destacada (`shadow-xl`):** Usada en tarjetas con contenido interactivo o multimedia (Video showcase, Tarjeta 50/50 de servicios, Mapa de pilotos).
* **Elevación máxima (`shadow-2xl`):** Exclusiva para componentes flotantes globales (Modal de descarga `#download-modal` y menú mobile `#mobile-menu`).

---

## 4. Button Hierarchy & Interactive Elements

Todos los botones interactivos y enlaces se presentan en **Sentence case** (sin uppercase y sin tracking-wider) y utilizan centrado flex (`inline-flex items-center justify-center gap-2`) para la alineación precisa de textos e íconos.

### A. Primary CTA Button (Solid Green)
* **Uso:** Acciones principales de conversión (*Conocer la plataforma*, *Registrarse*, *Empezar como productor*, *Sumate como Expert*).
* **Clases:**
  `bg-primary hover:bg-[#3db067] text-white py-2 px-4.5 rounded-full font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2`

### B. Secondary CTA Button - Dark/Hero Variant (Translucent White)
* **Uso:** Acciones secundarias sobre fondos oscuros o imágenes (*Soy piloto de drone*, *Registrarme como piloto*).
* **Clases:**
  `bg-white/10 hover:bg-white/20 border border-white/40 text-white py-2 px-4.5 rounded-full font-semibold text-xs transition-all active:scale-95 inline-flex items-center justify-center gap-2`

### C. Secondary CTA Button - Light/Header Variant (Outline Gray)
* **Uso:** Acciones secundarias sobre fondos claros o bordes (*Ir a la plataforma*).
* **Clases:**
  `border border-slate-300 text-slate-800 hover:border-primary hover:text-primary py-2 px-4.5 rounded-full font-semibold text-xs transition-all inline-flex items-center justify-center gap-2`

### D. Dark Accent CTA Button (App Experts)
* **Uso:** Descarga de app para pilotos / perfil técnico (*Descargar app Experts*).
* **Clases:**
  `bg-[#182230] hover:bg-[#253244] text-white py-2 px-4.5 rounded-full font-semibold text-xs transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2`

### E. Tertiary Links (Navbar Navigation)
* **Uso:** Enlaces del menú principal (*Servicios*, *Pilotos*, *Desarrolladores*).
* **Clases:**
  `text-xs font-semibold text-slate-700 hover:text-primary transition-colors normal-case`

---

## 5. Mobile Navigation & Responsive Rules

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
* **Stats Numbers:** `text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary`.
* **Stat Labels:** `text-[10px] sm:text-[11px] font-bold text-slate-600` (Sentence case).
* **Brand Logos Row:** Separation margin increased to `mt-12 pt-8 md:mt-16 md:pt-10`. Logo heights upscaled to `h-8 sm:h-9 md:h-10`, gaps `gap-4 sm:gap-6`. Only active partner logos are rendered.

### Tabbed Services Showcase (Sección 4)
* Selector de solapas horizontal: `flex flex-wrap justify-center gap-2 mb-6`.
* Botón inactivo: `px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:border-primary/50 text-xs font-bold shadow-sm transition-all normal-case`.
* Botón activo: `px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md transition-all normal-case`.
* Altura del contenedor de tarjeta: Limitada a `lg:h-[480px]`.
* **Card Titles T3 Token:** `text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2`.
* **Card Bullet Items:** `text-xs sm:text-sm font-medium text-slate-700 leading-normal flex items-center gap-2`.
* **Benefit Pills:** Padding `py-1 px-2.5 sm:py-1.5 sm:px-3`, text `text-[11px] sm:text-xs font-semibold text-slate-700`, icons `text-xs text-primary`, gap `gap-1.5 sm:gap-2`.
* **Weed Sub-Tab Toggle Token:** Container `p-1 bg-slate-100/90 border border-slate-200 rounded-full inline-flex items-center gap-1`, Active `py-1 px-3 bg-primary text-white text-[11px] sm:text-xs font-semibold rounded-full shadow-sm normal-case`, Inactive `py-1 px-3 text-slate-600 hover:text-slate-900 text-[11px] sm:text-xs font-medium rounded-full normal-case`.

### Accessibility & Quality Standards
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

---

## 6. Modales, Animaciones & Media Standards

### A. Modal System Guidelines
* **Backdrop Overlay:** `fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4`.
* **Modal Surface:** `rounded-3xl bg-white shadow-2xl border border-slate-200 max-h-[90vh] my-auto overflow-hidden`.
* **Close Button:** `absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 z-50` con atributo `aria-label="Cerrar ventana"`.

### B. Animation & Micro-Interactions
* **Standard Transitions:** `transition-all duration-300 ease-out`.
* **Hover Scale Tokens:** `hover:scale-[1.02]` (Botones/Tarjetas), `hover:scale-105` (Logos/Íconos).
* **Click Feedback:** `active:scale-95` obligatorio en todos los elementos clickeables.
* **Scroll Animations:** Utilizar `.reveal` para secciones que aparecen gradualmente al hacer scroll.

### C. Media & Aspect Ratios
* **Video Embeds:** Contenedor contenedor con `aspect-video rounded-2xl overflow-hidden shadow-lg`.
* **Hero/CTA Backgrounds:** `object-cover` obligatorio para evitar distorsiones de aspecto en pantallas ultramochas o móviles.