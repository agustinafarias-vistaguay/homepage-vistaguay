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
* **CSS Separation:** All custom CSS rules, keyframes, and library overrides must be placed inside `css/styles.css`.
* **Global Scope Exposure:** When creating or editing functions called directly from HTML event attributes (e.g., `onclick="toggleMobileMenu()"`), explicitly attach them to the global `window` object (e.g., `window.toggleMobileMenu = toggleMobileMenu`).
* **UI Design Token Compliance:** Strictly adhere to the UI tokens, padding specifications, typography scales, and responsive breakpoint rules documented in `.agents/design.md`.

---

## 3. Self-Documentation & Maintenance Rules
* **JSDoc Comments:** Provide concise JSDoc comments directly above every exported or major function explaining its purpose and parameters.
* **Architecture Sync:** Whenever a new file is added, removed, or renamed within `css/`, `js/`, or `data/`, automatically update the file tree table in `README.md`.