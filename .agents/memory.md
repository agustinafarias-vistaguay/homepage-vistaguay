# Memory Log

## Current Goal
Refactor `index.html` as the main project file to clean up the design system, refactor the Hero section, embed/modularize the Ecosystem Animation, and update the Solutions section.

## Progress
- [x] Initial codebase review: read `index.html`, `code.html`, `DESIGN.md`, and `DESIGN-1.md`.
- [x] Create implementation plan.
- [x] Obtain user approval.
- [x] Implement design system and styling clean-up in `index.html`.
- [x] Create `js/ecosystem-animation.js` containing the HTML and animation JavaScript.
- [x] Refactor Hero section in `index.html` (layout spacing fixes, flex container, mt separation, adjusted padding values).
- [x] Update Solutions section with 4 interactive tabs and fluid transitions (fade/slide tab switching).
- [x] Add Seguros and Descuentos benefits next to Capacitación in Vistaguay Expert section.
- [x] Replace static map with custom animated SVG map with primary green pings.
- [x] Build Download Modal with direct links (App Store & Play Store templates), stylized to brand specs.
- [x] Add mobile stacking, backdrop ease transitions, and custom open keyframe animations.
- [x] Update CTA buttons in Hero and Section 10 to point to target mobile stores directly.
- [x] Clean navigation header links (rename to Pilotos, remove Blog link).
- [x] Update footer elements (logo image, remove Compañía column, update WhatsApp contact, replace social icons with SVGs).
- [x] Reduce Hero section top padding to `pt-12 md:pt-16 pb-8` for compact vertical density.
- [x] Scale up the ecosystem animation diagram using `max-w-2xl` and a scale transformation.
- [x] Reorder Stats section to render directly below Hero.
- [x] Implement count-up animation using IntersectionObserver (count up smoothly from 0).
- [x] Added Tab 5 pill button "Proyectos Especiales" to Section 4 with stable, syntactically correct layout logic, including R&D highlight cells and WhatsApp CTA button.
- [x] Re-implemented the Testimonios carousel with 3D focus scaling layout, auto-cycling, and hold-to-pause interactions.
- [x] Refined Testimonial Carousel styles: customized active slide shadow to use a green glow (`shadow-[0_20px_50px_rgba(71,194,120,0.22)]`), set card transitions using cubic-bezier timing curves, and padded the track frame to `py-12` to prevent shadow clipping.
- [x] Replaced the marquee partner logos sets in Section 2 with exact files loading with `onError` folder path fallbacks. Cleaned up duplication levels to exactly 2 sets to avoid scroll loop gaps.
- [x] Restructured Section 5 (Vistaguay Experts) to show a 2-row layout card container: top row with proposal column and interactive Argentina map, and bottom row with 3 horizontal benefit cards.
- [x] Standardized Section 5 Experts CTA button: updated text to "Registrarme" and classes to match the primary button look (`bg-[#47C278] hover:bg-[#3db067] text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 mt-4`).
- [x] Created `data/pilots.json` coordinates database.
- [x] Replaced static Argentina SVG map in Section 5 with an interactive Leaflet.js map. It loads grayscale CartoDB light tiles, parses coordinate inputs asynchronously, and mounts green location markers that display location tooltips on mouse hover.
- [x] Cleaned up Leaflet map design: disabled default controls (zoom & attribution) programmatically and through CSS rules (`display: none !important;`), simplified the pulsing divIcon to a clean static solid green dot with a hover scale animation (`hover:scale-150 transition-transform`), and switched the tileset to CartoDB Voyager No-Labels for a vector-like style.
- [x] Refined the pilots map visual style: switched tileset to CartoDB Dark Matter No-Labels (`https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png`), disabled zoom & attribution UI controls, set map center to `[-34.0, -62.5]`, zoom to `5.5`, and updated marker design to a static semi-translucent green dot with a soft outer glow shadow (`shadow-[0_0_8px_rgba(71,194,120,0.6)]`) for beautiful clustering visualization of the 500+ records.
- [x] Zoomed out map zoom level to `4.0` centered at `[-40.0, -64.0]` and removed all hover tooltips and popups from the markers to keep the map purely visual, serving only for panning navigation.
- [x] Set pilot map markers to an ultra-small size (`w-1.5 h-1.5`) and disabled all pointer interactions (hover scaling, cursor triggers, tooltips) by configuring Leaflet's marker definition option to `{ interactive: false }`.
- [x] Re-centered map center to `[-35.5, -62.0]` at zoom level `4.0` to place the northern zone of Buenos Aires province in the center of the viewport.
- [x] Standardized the background color of all middle content sections to `bg-[#FAFAFA]` for a seamless scrolling experience, leaving only the Hero and Final CTA sections with their specialized imagery/gradients.
- [x] Elevated Hero Section content alignment by setting container padding to `pt-8 md:pt-12 pb-8` to eliminate top gap below the navbar.
- [x] Fixed Testimonial Carousel text/shadow clipping with `overflow-visible px-4 md:px-12 py-12` layouts, added dynamic indicator counter (e.g. `1 / 11`) to visually track active slide progression, and set side card styles to `scale-95` / `opacity-70` for comfortable peeking and legibility.
- [x] Unified all middle sections (Problem, Services, Stats, How it Works, Experts, Testimonials, Alliances, FAQ) background color strictly to `bg-[#FAFAFA]` and changed nested benefit cards inside Experts to `bg-white`.
- [x] Redesigned Testimonials carousel mechanics to mount all cards inside the DOM on init and translate the track element dynamically using CSS `transform: translateX(...)` transitions for a 60fps sliding flow on auto-play or arrow clicks.
- [x] Doubled partner/alliance logo sizes to `h-12 md:h-16 w-auto max-w-[160px]` and adjusted marquee opacity default to `opacity-80` to enhance visibility.
- [x] Standardized Vistaguay Experts register button styling to match the site's primary CTA design system standard.
- [x] Resolved Hero animation loop reset bug by removing scroll-reveal handlers (`.reveal`) from left text copy columns and right animation boundaries, ensuring the text column remains fully static and visible at all times.
- [x] Expanded layout wrapper max-width setting globally in Tailwind custom spacing config (container-max to `1360px`) and replaced container margins/paddings with `px-4 md:px-8` standard paddings.
