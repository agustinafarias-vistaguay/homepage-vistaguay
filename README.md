# Vistaguay AgTech Landing Page

## Project Overview
This repository contains the Vistaguay AgTech landing page, a high-performance web application designed with modern aesthetics (smooth animations, dynamic layout cards, dark gradients, and responsive components) to connect agricultural producers, advisors, and companies with drone pilots and precision analytics.

---

## File Architecture
The project is structured to separate HTML layout, styling, and JavaScript logic:

| Directory/File | Description |
| :--- | :--- |
| `index.html` | Core semantic HTML layout of the landing page. |
| `css/styles.css` | All custom styles, keyframe animations, scroll triggers, and Leaflet overrides. |
| `js/` | Modular JavaScript interactive scripts. |
| `data/` | Coordinates and JSON datasets (e.g., `data/pilots.json`). |
| `images/` | Site assets, logos, and illustration overlays. |
| `.agents/` | Context guidelines, UI design system, and technical agent rules. |

---

## JavaScript Modules & Responsibilities
All logic is modularized inside single-responsibility files in the `js/` directory:

* **`js/main.js`**: Manages general UI interactions (navbar dropdown menu, download modal display, scroll reveal observers, lazy-loaded video).
* **`js/stats.js`**: Runs dynamic count-up counter animations from 0 via `IntersectionObserver`.
* **`js/solutions.js`**: Controls the precision agriculture tabs switcher, sub-tabs, and dynamic card showcase rendering.
* **`js/testimonials.js`**: Powers the 3D-focused slide carousel with auto-play, hover pause interactions, indicator dots, and controls.
* **`js/pilots-map.js`**: Initializes the Leaflet.js dark map, fetching and plotting coordinates from `data/pilots.json`.
* **`js/ecosystem-animation.js`**: Orchestrates the SVG-based animation representing the Vistaguay platform ecosystem flow.
* **`js/weed-combo.js`**: Manages the custom weed detection curtain transitions and split-screen previews.

---

## Developer Guidelines

### Local Development
Because scripts perform local data fetching (`data/pilots.json`), run a local web server rather than opening `index.html` directly from the file system.

Option A (VS Code Extension):
* Right-click `index.html` and select **Open with Live Server**.

Option B (Terminal):
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
