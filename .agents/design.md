# Vistaguay AgTech - Full Design System & UI/UX Specifications

## 1. Color Palette & Tokens

### Core Brand Colors
* **Primary (Vistaguay Green):** `#47C278`
  * Tailwind Tokens: `primary`, `primary-container`
  * Standard Hover State: `#3DB067`
  * Active/Click State: `#349B5B` (`active:scale-95`)
  * Accessible Text on Primary: `#FFFFFF` (`text-white`)
* **General Page Background:** `#FAFAFA`
  * Standardized across all middle content sections to ensure a seamless visual flow.
* **Surface Containers:** `#FFFFFF` (`bg-surface`)
* **Dark Contrast Accents:**
  * Dark App Accent (Experts): `#182230` (Hover: `#253244`)
  * Inverse Surface (Developer Card): `#2F3131`
  * Hero Gradient: `from-slate-950/85 via-slate-900/75 to-[#FAFAFA]`
  * Final CTA Overlay: `bg-black/60`

### Text & Contrast Standards (WCAG 2.1 AA Compliant)
* **Headings (H1, H2, H3):** `#1A1C1C` (`text-on-surface`)
* **Body Text (Primary Copy):** `#3E4A3F` (`text-on-surface-variant`)
* **Body Text (Secondary/Muted Copy):** `#334155` (`text-slate-700`) — Replaces `text-slate-500` to satisfy the 4.5:1 minimum contrast ratio.
* **Dark Background Copy:** `#FFFFFF` (`text-white`) / `#CBD5E1` (`text-slate-300`)

---

## 2. Typography Hierarchy & Readability Rules

* **Font Family:** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700, 800)

| Element | Responsive Tailwind Classes | Desktop Size | Mobile Size | Rules / Guidelines |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero Title)** | `text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight` | 48px | 30px | Max 1 per page. Balanced spacing so it does not dominate the Hero area. |
| **H2 (Section Titles)** | `text-2xl md:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight` | 36px | 24px | Unified across ALL sections (`#servicios`, `#expert`, `#devs`, etc.). |
| **Section Subtitles** | `text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed` | 18px | 14px | Used directly below Section Titles for introductory context. |
| **H3 (Card Titles)** | `text-xl font-bold text-on-surface` | 20px | 18px | Primary card headlines across Problem, Solutions, and Expert sections. |
| **H4 (Subheadings/Badges)** | `text-sm font-bold uppercase tracking-wider` | 14px | 14px | Step labels, badge tags, and sub-block titles. |
| **Hero Lead Copy** | `text-base md:text-lg text-slate-300 leading-relaxed` | 18px | 16px | High-legibility hero paragraph. |
| **Standard Body Copy** | `text-sm font-medium text-slate-700 leading-relaxed` | 14px | 14px | **Global minimum size for all descriptions, bullets, and card body text.** |
| **Small / Micro Copy** | `text-xs font-semibold text-slate-500 uppercase tracking-widest` | 12px | 12px | Reserved strictly for uppercase metadata, dates, step counters, and copyright. |

---

## 3. Button Hierarchy & Interactive Elements

All interactive buttons follow a strict **UPPERCASE** label standard (`uppercase tracking-wider text-xs font-bold`) for consistency.

### A. Primary CTA Button (Solid Green)
* **Usage:** Primary conversion actions (*REGISTRARSE*, *EMPEZAR COMO PRODUCTOR*, *CONOCER LA PLATAFORMA*).
* **Classes:**
  `bg-[#47C278] hover:bg-[#3db067] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-200 shadow-md active:scale-95 inline-flex items-center justify-center gap-2`

### B. Secondary CTA Button - Dark/Hero Variant (Translucent White)
* **Usage:** Secondary actions on dark photo backgrounds (*SOY PILOTO DE DRONE*, *REGISTRARME COMO PILOTO*).
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
* **Usage:** Direct header links (*SERVICIOS*, *PILOTOS*, *DESARROLLADORES*).
* **Classes:**
  `text-on-surface-variant hover:text-primary transition-colors duration-200 uppercase tracking-widest text-xs font-bold`

---

## 4. Mobile Navigation & Responsive Component Rules

### Navbar Hamburger Dropdown (`< md:`)
* Toggle button visible at `< md:` with `aria-label="Abrir menú de navegación"`.
* Dropdown container (`#mobile-menu`):
  * Class: `bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/80 p-6 flex flex-col`.
  * Top navigation items: `text-sm font-bold uppercase text-slate-800 hover:text-[#47C278] py-2`.
  * Divider: `<hr class="border-slate-200/80 my-4">`.
  * Action buttons: Primary `REGISTRARSE` + Secondary `IR A LA PLATAFORMA` stacked vertically (`w-full`).

### Tabbed Services Showcase (Section 4 Mobile Fixes)
* Horizontal tab bar wrapper: `flex overflow-x-auto whitespace-nowrap pb-2 gap-2 sm:justify-center scrollbar-none`.
* Card metrics grid: `grid grid-cols-1 sm:grid-cols-3 gap-4`.
* Card container: `min-h-0 md:min-h-[480px]`.

### Final CTA Banner (Section 10 Mobile Fixes)
* Height: `min-h-[480px] h-auto py-16 md:py-24`.
* Buttons container: `flex flex-col sm:flex-row justify-center gap-4`.

---

## 5. Accessibility & SEO Compliance (WCAG 2.1 AA)

1. **Text Contrast:** Replace `text-slate-500` or `opacity-60` on body copy with `text-slate-700` (`#334155`) to guarantee contrast ratio > 4.5:1.
2. **Minimum Font Size:** Ensure no descriptive paragraph or list bullet drops below `text-sm` (14px).
3. **Interactive Control Labels:**
   * Mobile Hamburger Toggle: `aria-label="Abrir menú de navegación"`
   * Carousel Arrow Controls: `aria-label="Anterior testimonio"` / `aria-label="Siguiente testimonio"`
   * Modal Close Buttons: `aria-label="Cerrar ventana"`