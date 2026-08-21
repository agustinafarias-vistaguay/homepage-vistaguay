# Vistaguay AgTech - Design System & UI/UX Specifications

## 1. Color Palette & Tokens

### Core Brand Colors
* **Primary (Vistaguay Green):** `#47C278`
  * TailWind token: `primary`, `primary-container`
  * Standard Hover State: `#3db067`
  * Accessible On-Primary Text: `#FFFFFF`
* **General Page Background:** `#FAFAFA`
  * Unified across all middle content sections to eliminate harsh grey block transitions.
* **Surface Containers:** `#FFFFFF` (`bg-surface`)
* **Dark Contrast Accents:**
  * Dark App Accent (Experts): `#182230` (Hover: `#253244`)
  * Inverse Surface (Developer Card): `#2F3131`
  * Hero Gradient: `from-slate-950/85 via-slate-900/75 to-[#FAFAFA]`
  * Final CTA Overlay: `bg-black/60`

### Text & Contrast Standards
* **Headings:** `#1A1C1C` (`text-on-surface`)
* **Body Text (Primary Copy):** `#3E4A3F` (`text-on-surface-variant`)
* **Body Text (Secondary Copy):** `#334155` (`text-slate-700`) — Replaces `text-slate-500` to satisfy WCAG AA 4.5:1 contrast standards.
* **Dark Background Text:** `#FFFFFF` (`text-white`) / `#CBD5E1` (`text-slate-300`)

---

## 2. Typography Hierarchy & Readability

* **Font Family:** `Plus Jakarta Sans` (weights: 400, 500, 600, 700, 800)

| Element | Responsive Tailwind Classes | Size Range | Usage / Rules |
| :--- | :--- | :--- | :--- |
| **H1 (Hero Title)** | `text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight` | 30px - 48px | Strictly 1 per page. Balanced so as not to overwhelm the Hero container. |
| **H2 (Section Titles)** | `text-2xl md:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight` | 24px - 36px | Unified across ALL section headings (`#servicios`, `#expert`, `#devs`, etc.). |
| **H3 (Card Titles)** | `text-xl font-bold text-on-surface` | 20px | Used for primary card headlines across Problem, Solutions, and Expert sections. |
| **H4 (Subheadings/Badges)** | `text-sm font-bold uppercase tracking-wider` | 14px | Used for step labels, badge tags, and sub-block titles. |
| **Hero Lead Paragraph** | `text-base md:text-lg text-slate-300 leading-relaxed` | 16px - 18px | High-legibility lead copy. |
| **Standard Body Text** | `text-sm font-medium text-slate-700 leading-relaxed` | 14px | **Minimum size for body copy, bullet points, and card descriptions.** |
| **Small / Micro Copy** | `text-xs font-semibold text-slate-500 uppercase tracking-widest` | 12px | Reserved strictly for uppercase metadata, dates, counters, and footer copyright. |

---

## 3. Button Hierarchy & Interactive Elements

All buttons across the platform follow a strict **UPPERCASE** label standard (`uppercase tracking-wider text-xs font-bold`) for consistency.

### A. Primary CTA Button (Solid Green)
* **Usage:** Core conversion actions (*REGISTRARSE*, *EMPEZAR COMO PRODUCTOR*, *CONOCER LA PLATAFORMA*).
* **Classes:**
  `bg-[#47C278] hover:bg-[#3db067] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-200 shadow-md active:scale-95 inline-flex items-center justify-center gap-2`

### B. Secondary CTA Button - Dark/Hero Variant (Translucent White)
* **Usage:** Alternative secondary actions on dark photo backgrounds (*SOY PILOTO DE DRONE*, *REGISTRARME COMO PILOTO*).
* **Classes:**
  `bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-200 active:scale-95 inline-block text-center`

### C. Secondary CTA Button - Light/Header Variant (Outline Gray)
* **Usage:** Secondary actions on white/light backgrounds (*IR A LA PLATAFORMA* in Navbar and Mobile Menu).
* **Classes:**
  `border border-slate-300 text-slate-800 hover:border-[#47C278] hover:text-[#47C278] px-5 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-200 text-center inline-block`

### D. Dark Accent CTA Button (App Experts)
* **Usage:** Dark-themed app download / developer actions (*DESCARGAR APP EXPERTS*, *SUMATE A VISTAGUAY*).
* **Classes:**
  `bg-[#182230] hover:bg-[#253244] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-200 shadow-md active:scale-95 inline-flex items-center justify-center gap-2`

### E. Tertiary Links (Navbar Navigation)
* **Usage:** Top navigation direct links (*SERVICIOS*, *PILOTOS*, *DESARROLLADORES*).
* **Classes:**
  `text-on-surface-variant hover:text-primary transition-colors duration-200 uppercase tracking-widest text-xs font-bold`

---

## 4. Mobile Navigation & Hamburger Menu Blueprint

* **Breakpoint:** Desktop links and secondary outline button visible at `md:` (768px+). Hamburger toggle icon visible at `< md:`.
* **Mobile Dropdown Container (`#mobile-menu`):**
  * Positioned floating below fixed `<nav>`.
  * Background: `bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/80 p-6`.
  * **Top Section:** Vertical flex stack of navigation links (`SERVICIOS`, `PILOTOS`, `DESARROLLADORES`) styled with `text-sm font-bold uppercase text-slate-800 hover:text-primary py-2`.
  * **Divider Line:** `<hr class="border-slate-200/80 my-4">`
  * **Bottom Action Stack:**
    1. Primary CTA: `REGISTRARSE` (Solid Green Primary Button, `w-full`).
    2. Secondary CTA: `IR A LA PLATAFORMA` (Light Outline Button, `w-full`).

---

## 5. Spacing & Container Standards

* **Global Container Width:** `max-w-container-max` (`1360px`) with responsive horizontal margins `px-4 md:px-8`.
* **Section Vertical Padding:**
  * Standard Sections: `py-20` (80px)
  * Hero Section: `pt-8 md:pt-12 pb-8` (Elevated content height)
  * Testimonials Carousel: `py-12 md:py-16`

---

## 6. Accessibility & SEO Guidelines (WCAG 2.1 AA)

1. **Text Contrast:** Eliminate `text-slate-500` or `opacity-60` on body copy and replace with `text-slate-700` (`#334155`) to guarantee a contrast ratio > 4.5:1.
2. **Font Size Compliance:** Ensure all descriptive paragraphs, bullet points, and card content use `text-sm` (14px) or larger.
3. **Interactive Control Labels:**
   * Mobile Hamburger Button: `aria-label="Abrir menú de navegación"`
   * Carousel Arrow Buttons: `aria-label="Anterior testimonio"` / `aria-label="Siguiente testimonio"`
   * Modal Close Button: `aria-label="Cerrar ventana"`