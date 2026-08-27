# AI Agent Rules & Technical Guidelines

This document establishes the mandatory technical guidelines, execution boundaries, and code standards for all AI assistants working on this repository.

---

## 1. Execution & Terminal Safety Constraints
* **NO Unauthorized Executions:** Do NOT run automated tests, Python scripts (`py`), PowerShell clean scripts, or local server launchers unless explicitly requested by the user in the active prompt.
* **Non-Destructive Refactoring:** Always inspect and verify code changes locally within workspace files without relying on automated CLI test runners.

---

## 2. Codebase Architecture & Modular Standards
* **No Inline Code:** `index.html` must remain clean and semantic. **NEVER** write inline `<style>` tags or inline `<script>` blocks inside `index.html`.
* **JS Modularity:** All JavaScript logic must reside in dedicated, single-responsibility ES modules inside the `js/` directory (e.g., `js/solutions.js`, `js/testimonials.js`).
* **Modular CSS Strategy:** Custom CSS must be split into functional, single-responsibility files inside `css/`:
  * `css/components.css`: Reusable UI components (`.btn-primary`, `.btn-outline`, `.btn-secondary-hero`, `.tab-btn`, `.benefit-pill`, `.testimonial-card`).
  * `css/animations.css`: Keyframes, scroll reveals, and shimmer effects.
  * `css/leaflet-custom.css`: Third-party library overrides (Leaflet maps).
* **Global Scope Exposure:** When creating or editing functions called directly from HTML event attributes (e.g., `onclick="toggleMobileMenu()"`), explicitly attach them to the global `window` object (e.g., `window.toggleMobileMenu = toggleMobileMenu`).

---

## 3. UI Tokens & Accessibility Strict Enforcement
* **Design Token Compliance:** Strictly adhere to the UI tokens, padding specifications, typography scales, and responsive breakpoint rules documented in `.agents/design.md`.
* **Centralized Component Usage:** Standard buttons, tabs, and interactive cards MUST use their designated CSS component classes (`.btn-primary`, `.btn-outline`, `.btn-secondary-hero`, `.tab-btn`) from `css/components.css`. Do NOT duplicate long Tailwind utility strings for standardized UI buttons.
* **No Hardcoded Values:** Do NOT use hardcoded Hex colors in HTML markup when Tailwind color tokens (`primary`, `slate-900`, etc.) or centralized CSS component classes exist.
* **Mandatory Accessibility (a11y):** All icon-only buttons, carousels, and modal controls MUST include descriptive `aria-label` attributes.
* **Universal Sentence Case:** Do NOT use `uppercase` or `tracking-wider` classes for buttons, step badges, or titles unless explicitly mandated.

---

## 4. Self-Documentation & Maintenance Rules
* **JSDoc Comments:** Provide concise JSDoc comments directly above every exported or major function explaining its purpose and parameters.
* **Architecture Sync:** Whenever a new file is added, removed, or renamed within `css/`, `js/`, or `data/`, automatically update the file tree table in `README.md`.