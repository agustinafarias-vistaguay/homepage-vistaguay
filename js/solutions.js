/**
 * @file solutions.js
 * @description Controls the tabbed showcase for precision agricultural services and dynamic overlay renderings.
 */

(function () {
    let currentWeedSubKey = 'marron';

    const tabData = {
        weed: {
            marron: {
                title: "Control selectivo de malezas en barbecho (Verde sobre Marrón)",
                desc: "Mapeo digital de precisión con Inteligencia Artificial optimizado para aplicaciones sectorizadas y dirigidas de herbicidas en barbechos tempranos.",
                bullets: [
                    "Algoritmo Verde sobre Marrón patentado",
                    "Prescripciones listas para pulverizadoras"
                ],
                benefits: [
                    { name: "Ahorro en producto", icon: "water_drop" },
                    { name: "Reducción de gastos", icon: "savings" },
                    { name: "Menos impacto ambiental", icon: "eco" },
                    { name: "Retorno de inversión > 300%", icon: "trending_up" }
                ],
                image: "images/mdm-gob.jpg",
                imageClass: "object-[center_47%] lg:object-top", // <--- Ajuste de encuadre
                overlayImage: "images/mdm-superpuesto.png"
            },
            verde: {
                title: "Control selectivo de malezas en post-emergencia (Verde sobre Verde)",
                desc: "Identificación inteligente de malezas específicas en cultivos establecidos de Maíz, Soja, Maní y Girasol en estadios tempranos (V2-V3).",
                bullets: [
                    "Detección sobre cultivo naciente con IA",
                    "Combinable en un mismo vuelo con Conteo de Plantas"
                ],
                benefits: [
                    { name: "Ahorro en producto", icon: "water_drop" },
                    { name: "Reducción de gastos", icon: "savings" },
                    { name: "Menos impacto ambiental", icon: "eco" },
                    { name: "Retorno de inversión > 300%", icon: "trending_up" }
                ],
                image: "images/mdm-gog.jpg",
                imageClass: "object-[center_47%] lg:object-top", // <--- Ajuste de encuadre
                overlayImage: "images/mdm-superpuesto.png"
            }
        },
        plant: {
            title: "Uniformidad temporal y espacial de siembra en Maíz y Girasol",
            desc: "Identificación de fallas y duplicaciones, recuento preciso de plantas emergidas para calcular desvíos estándar y estimar brechas de rendimiento.",
            stat1Val: "1 TN/Ha",
            stat1Label: "Brecha Estimada",
            stat2Val: "V2-V3",
            stat2Label: "Estadio Óptimo",
            bullets: [
                "Monitoreo de velocidad y uniformidad de emergencia",
                "Evaluación de calidad de siembra y stand de plantas"
            ],
            parameters: [
                { name: "Densidad", icon: "grid_view" },
                { name: "Cobertura", icon: "eco" },
                { name: "Espaciamiento", icon: "straighten" },
                { name: "Singulación", icon: "center_focus_strong" }
            ],
            image: "images/pq.jpg",
            overlayImage: "images/pq-suerpuesto.png"
        },
        drone: {
            title: "Aplicación aérea de solidos y liquidos con drones de gran porte",
            desc: "Servicios profesionales de pulverización, fertilización, control de plagas y siembra de precisión en zonas de difícil acceso o terrenos anegados.",
            bullets: [
                "Pulverización aérea sin pisoteo del cultivo",
                "Control selectivo de plagas y malezas"
            ],
            applications: [
                { title: "Pulverización", desc: "Fitosanitarios líquidos homogéneos.", icon: "water_drop" },
                { title: "Fertilización", desc: "Re-fertilización sólida/líquida de precisión.", icon: "science" },
                { title: "Siembra", desc: "Semillas y coberturas sin pisoteo.", icon: "eco" },
                { title: "Control de Plagas", desc: "Cebos y sólidos para insectos.", icon: "pest_control" }
            ],
            image: "images/drone-campo.jpg",
            overlayImage: "images/aplicacion-superpuesto.png"
        },
        training: {
            title: "Capacitación comercial: Cómo ganar dinero con tu dron en el agro",
            desc: "Curso intensivo para pilotos profesionales. Aprendé a generar reportes de valor agronómico, vender servicios de precisión y optimizar operaciones.",
            stat1Val: "6 Meses",
            stat1Label: "Soporte Técnico",
            stat2Val: "Presencial",
            stat2Label: "Modalidad Práctica",
            stat3Val: "Oficial",
            stat3Label: "Certificación",
            bullets: [
                "Certificación oficial Vistaguay Expert",
                "Acceso a bolsa de trabajo y red nacional",
                "Descuentos en seguros y repuestos"
            ],
            image: "images/capacitacion.jpg",
            ctaText: "Solicitar más información"
        },
        special: {
            title: "Proyectos concretos de monitoreo, altimetría y otras labores",
            desc: "Desarrollamos e integramos algoritmos específicos adaptados a cultivos regionales, ganadería y estudios topográficos complejos que requieren analítica a medida.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLq_jMLNgQfEdwr5c24Cnu1RuzYyRFfHyJsMUvnBIuZBJ1i8yykbwWgNlXnK1em3DS04mIufJNLC7NtAMIJOEn-HORuRY5sIvtJZTNgD7MQRDVf1YAR04X97biwf_Gn_Nvhf9M3qlTWLftKIlqEj-NAwhBXjjYKCLpy_yBGCehxIReK8bz04gyPwOfGj3TFCribVoLWXov6KJ9WpEnwVq8bgWjKE9Bi0jEeuZ5gFwQ7gUSorFJ738d1gb_vY6kf4wpQ7IaWtIlawNp",
            ctaText: "Contactanos"
        }
    };

    /**
     * Renders the HTML content for a specific solution tab and subtab.
     * @param {string} tabKey - The top-level tab identifier (e.g. 'weed', 'plant', 'drone').
     * @param {string} [subKey] - Optional subtab identifier for the 'weed' tab.
     * @returns {void}
     */
    function renderSolutionsCard(tabKey, subKey = currentWeedSubKey) {
        const cardContainer = document.getElementById('solutions-content-card');
        if (!cardContainer) return;

        let data = {};
        if (tabKey === 'weed') {
            currentWeedSubKey = subKey;
            data = tabData.weed[subKey];
        } else {
            data = tabData[tabKey];
        }

        let leftColumnHtml = '';

        // Selector Verde sobre Marrón / Verde sobre Verde (Mobile vs Desktop)
        const segmentedControlMobile = tabKey === 'weed' ? `
    <div class="inline-flex lg:hidden segmented-control mb-2">
        <button onclick="toggleWeedSubTab('marron')" 
            class="segmented-btn ${subKey === 'marron' ? 'segmented-btn-active' : 'segmented-btn-inactive'}">
            Verde sobre Marrón
        </button>
        <button onclick="toggleWeedSubTab('verde')" 
            class="segmented-btn ${subKey === 'verde' ? 'segmented-btn-active' : 'segmented-btn-inactive'}">
            Verde sobre Verde
        </button>
    </div>
` : '';

        const segmentedControlDesktop = tabKey === 'weed' ? `
    <div class="hidden lg:inline-flex absolute top-4 left-4 z-40 segmented-control shadow-md">
        <button onclick="toggleWeedSubTab('marron')" 
            class="segmented-btn ${subKey === 'marron' ? 'segmented-btn-active' : 'segmented-btn-inactive'}">
            Verde sobre Marrón
        </button>
        <button onclick="toggleWeedSubTab('verde')" 
            class="segmented-btn ${subKey === 'verde' ? 'segmented-btn-active' : 'segmented-btn-inactive'}">
            Verde sobre Verde
        </button>
    </div>
` : '';

        // Solapa 5: Proyectos Especiales
        if (tabKey === 'special') {
            leftColumnHtml = `
            <div class="space-y-3">
                <h3 class="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2 pt-1">
                    ${data.title}
                </h3>
                <p class="text-sm sm:text-sm text-slate-600 leading-relaxed mb-3">
                    ${data.desc}
                </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-outline-variant/30 pt-6">
                <div>
                    <h4 class="text-sm sm:text-[13px] font-bold text-primary mb-1.5">Ganadería</h4>
                    <p class="text-sm sm:text-smsm:text-sm text-slate-600 leading-relaxed">Conteo y estimación de peso.</p>
                </div>
                <div>
                    <h4 class="text-sm sm:text-[13px] font-bold text-primary mb-1.5">Cultivos especiales</h4>
                    <p class="text-sm sm:text-smsm:text-sm text-slate-600 leading-relaxed">Cítricos, Yerba Mate, Caña de Azúcar, Viñedos y Pasturas.</p>
                </div>
                <div>
                    <h4 class="text-sm sm:text-[13px] font-bold text-primary mb-1.5">Forestal & reforestación</h4>
                    <p class="text-sm sm:text-smsm:text-sm text-slate-600 leading-relaxed">Mapeo de densidad y siembra aérea.</p>
                </div>
                <div>
                    <h4 class="text-sm sm:text-[13px] font-bold text-primary mb-1.5">Altimetría & topografía</h4>
                    <p class="text-sm sm:text-smsm:text-sm text-slate-600 leading-relaxed">Modelos digitales de elevación y escurrimiento de agua.</p>
                </div>
            </div>
            <div class="pt-4">
                <a href="https://api.whatsapp.com/send?phone=5493516887507" target="_blank" rel="noopener noreferrer" 
                    class="btn-primary w-fit">
                    ${data.ctaText}
                    <span class="material-symbols-outlined text-base">arrow_forward</span>
                </a>
            </div>
        `;
        } else {
            const bulletsHtml = data.bullets.map(b => {
                const isSpecial = b.includes('Combinable');

                if (isSpecial) {
                    return `
                    <li class="text-sm sm:text-sm font-bold text-slate-700 leading-normal flex items-center gap-2 my-1">
                        <span class="material-symbols-outlined text-primary text-sm shrink-0 w-4 h-4 flex items-center justify-center">check_circle</span>
                        <span class="inline-flex items-center">${b}</span>
                        <div class="relative inline-flex items-center justify-center shrink-0 ml-1">
                            <span class="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping"></span>
                            <button onclick="openComboDemoModal()" 
        aria-label="Ver animación combo" 
        class="btn-circle-icon relative w-7 h-7 text-sm">
    <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
</button>
                        </div>
                    </li>
                `;
                }

                return `
                <li class="text-sm sm:text-sm font-medium text-slate-700 leading-normal flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-sm shrink-0 w-4 h-4 flex items-center justify-center">check_circle</span>
                    <span>${b}</span>
                </li>
            `;
            }).join('');

            let bottomContentHtml = '';

            if (tabKey === 'plant') {
                bottomContentHtml = `
                <div class="pt-3 border-t border-outline-variant/30 space-y-2 w-full lg:max-w-[260px]">
                    <p class="text-sm sm:text-smsm:text-sm font-extrabold text-slate-700 mb-1.5">Medición y Parámetros:</p>
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                        ${data.parameters.map(p => `
                            <div class="py-1 px-2.5 sm:py-1.5 sm:px-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2.5 shadow-sm">
                                <span class="material-symbols-outlined text-primary text-sm font-bold shrink-0">${p.icon}</span>
                                <span class="text-sm sm:text-smsm:text-sm font-semibold text-slate-700 leading-tight">${p.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            } else if (tabKey === 'drone') {
                bottomContentHtml = `
                <div class="pt-3 border-t border-outline-variant/30 space-y-2 w-full lg:max-w-[260px]">
                    <p class="text-sm sm:text-smsm:text-sm font-extrabold text-slate-700 mb-1.5">Labores Disponibles:</p>
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                        ${data.applications.map(a => `
                            <div class="py-1 px-2.5 sm:py-1.5 sm:px-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2.5 shadow-sm">
                                <span class="material-symbols-outlined text-primary text-sm font-bold shrink-0">${a.icon}</span>
                                <span class="text-sm sm:text-smsm:text-sm font-semibold text-slate-700 leading-tight">${a.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            } else if (tabKey === 'weed') {
                bottomContentHtml = `
                <div class="pt-3 border-t border-outline-variant/30 space-y-2 w-full lg:max-w-[260px]">
                    <p class="text-sm sm:text-smsm:text-sm font-extrabold text-slate-700 mb-1.5">Beneficios Clave:</p>
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                        ${data.benefits.map(b => `
                            <div class="py-1 px-2.5 sm:py-1.5 sm:px-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2.5 shadow-sm">
                                <span class="material-symbols-outlined text-primary text-sm font-bold shrink-0">${b.icon}</span>
                                <span class="text-sm sm:text-smsm:text-sm font-semibold text-slate-700 leading-tight">${b.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            } else if (tabKey === 'training') {
                bottomContentHtml = `
                <div class="border-t border-outline-variant/30 pt-4">
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <h4 class="text-sm sm:text-base font-extrabold text-primary mb-0.5">${data.stat1Val}</h4>
                            <p class="text-sm text-on-surface-variant leading-tight">${data.stat1Label}</p>
                        </div>
                        <div>
                            <h4 class="text-sm sm:text-base font-extrabold text-primary mb-0.5">${data.stat2Val}</h4>
                            <p class="text-sm text-on-surface-variant leading-tight">${data.stat2Label}</p>
                        </div>
                        <div>
                            <h4 class="text-sm sm:text-base font-extrabold text-primary mb-0.5">${data.stat3Val}</h4>
                            <p class="text-sm text-on-surface-variant leading-tight">${data.stat3Label}</p>
                        </div>
                    </div>
                </div>
            `;
            }

            const ctaButtonHtml = data.ctaText ? `
            <div class="pt-1">
                <a href="https://api.whatsapp.com/send?phone=5493516887507" target="_blank" rel="noopener noreferrer" 
                    class="btn-primary">
                    ${data.ctaText}
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
            </div>
        ` : '';

            leftColumnHtml = `
            <div class="space-y-2.5">
                ${segmentedControlMobile}
                <h3 class="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2">
                    ${data.title}
                </h3>
                <p class="text-sm sm:text-sm text-slate-600 leading-relaxed mb-3">
                    ${data.desc}
                </p>
                <ul class="space-y-1.5 pt-0.5">
                    ${bulletsHtml}
                </ul>
            </div>
            
            ${bottomContentHtml}
            ${ctaButtonHtml}
        `;
        }

        // Configuración visual de la imagen superpuesta (Laptop / Celular)
        const overlayWidth = tabKey === 'drone' ? 'w-[200px] xl:w-[230px]' : 'w-[380px] xl:w-[430px]';
        const overlayPosition = tabKey === 'drone' ? 'bottom-0 xl:bottom-0' : 'bottom-0 xl:bottom-1';
        const overlayTranslate = tabKey === 'drone' ? '-translate-x-[40%]' : '-translate-x-[28%]';

        const overlayImageHtml = data.overlayImage ? `
    <div id="solutions-overlay-image" class="hidden lg:block absolute left-1/2 ${overlayTranslate} ${overlayPosition} z-20 ${overlayWidth} pointer-events-none transition-all duration-500">
        <img src="${data.overlayImage}" alt="Vista previa de plataforma" 
             class="w-full h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] object-contain">
    </div>
` : '';

        cardContainer.className = "grid grid-cols-1 lg:grid-cols-2 opacity-100 transform translate-y-0 relative lg:h-full";
        cardContainer.innerHTML = `
    <div class="p-5 md:p-6 lg:pr-8 flex flex-col justify-between gap-4 z-30 relative lg:h-full">
        ${leftColumnHtml}
    </div>
    <div class="relative h-72 sm:h-80 lg:h-full bg-surface-container overflow-hidden z-0">
        ${segmentedControlDesktop}
        <img alt="${data.title}" class="w-full h-full object-cover ${data.imageClass || 'object-center'}" src="${data.image}">
        <div class="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
    </div>
    ${overlayImageHtml}
`;
    }

    /**
     * Handles switching between active showcase tabs with a smooth fade-and-slide transition.
     * @param {string} tabKey - The key of the tab to switch to.
     * @returns {void}
     */
    function switchTab(tabKey) {
        const cardContainer = document.getElementById('solutions-content-card');
        if (!cardContainer) return;

        const buttons = {
            weed: document.getElementById('tab-btn-weed'),
            plant: document.getElementById('tab-btn-plant'),
            drone: document.getElementById('tab-btn-drone'),
            training: document.getElementById('tab-btn-training'),
            special: document.getElementById('tab-btn-special')
        };

        Object.keys(buttons).forEach(key => {
            const btn = buttons[key];
            if (!btn) return;
            if (key === tabKey) {
                btn.className = "tab-btn tab-btn-active";
            } else {
                btn.className = "tab-btn tab-btn-inactive";
            }
        });

        cardContainer.style.transition = 'opacity 180ms ease-in-out, transform 180ms ease-in-out';
        cardContainer.style.opacity = '0';
        cardContainer.style.transform = 'translateY(6px)';

        setTimeout(() => {
            renderSolutionsCard(tabKey);
            cardContainer.style.opacity = '1';
            cardContainer.style.transform = 'translateY(0)';
        }, 180);
    }

    /**
     * Handles subtab selections within the 'weed' tab context (Verde sobre Marrón / Verde sobre Verde).
     * @param {string} subKey - The subtab identifier ('marron' or 'verde').
     * @returns {void}
     */
    function toggleWeedSubTab(subKey) {
        if (currentWeedSubKey === subKey) return;
        const cardContainer = document.getElementById('solutions-content-card');
        if (!cardContainer) return;

        cardContainer.style.transition = 'opacity 180ms ease-in-out, transform 180ms ease-in-out';
        cardContainer.style.opacity = '0';
        cardContainer.style.transform = 'translateY(4px)';

        setTimeout(() => {
            renderSolutionsCard('weed', subKey);
            cardContainer.style.opacity = '1';
            cardContainer.style.transform = 'translateY(0)';
        }, 180);
    }

    // Bind interactive functions to global window object for inline HTML event handling
    window.renderSolutionsCard = renderSolutionsCard;
    window.switchTab = switchTab;
    window.toggleWeedSubTab = toggleWeedSubTab;

    // Initialize solutions card with the default 'weed' tab on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        renderSolutionsCard('weed');
    });

    window.toggleWeedSubTab = toggleWeedSubTab;
    window.openWeedComboModal = openWeedComboModal;

})();