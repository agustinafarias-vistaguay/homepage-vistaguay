/**
 * @file pilots-map.js
 * Renders Leaflet map overlay with Esri World Dark Gray and dispersed blinking dots.
 */

// Inyección de animación CSS con tamaño equilibrado (1.9x) y resplandor verde
if (!document.getElementById('pilots-map-animation-style')) {
    const style = document.createElement('style');
    style.id = 'pilots-map-animation-style';
    style.innerHTML = `
        @keyframes pulseDotGlow {
            0% {
                transform: scale(1);
                opacity: 0.9;
                box-shadow: 0 0 4px rgba(71, 194, 120, 0.8);
            }
            50% {
                transform: scale(1.9);
                opacity: 1;
                background-color: #6ee7b7;
                box-shadow: 0 0 10px rgba(71, 194, 120, 1), 0 0 16px rgba(71, 194, 120, 0.8);
            }
            100% {
                transform: scale(1);
                opacity: 0.9;
                box-shadow: 0 0 4px rgba(71, 194, 120, 0.8);
            }
        }
        .dot-blinking {
            animation: pulseDotGlow 1.2s ease-in-out !important;
            z-index: 9999 !important;
        }
    `;
    document.head.appendChild(style);
}

function initPilotsMap() {
    const mapContainer = document.getElementById('pilots-native-map');
    if (!mapContainer) return;

    // Inicializar mapa centrado en Argentina
    const map = L.map('pilots-native-map', {
        center: [-35.5, -62.0],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true
    });

    // Capa de Esri
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        maxNativeZoom: 16
    }).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
    }, 200);

    const allMarkers = [];

    fetch('data/pilots.json')
        .then(response => response.json())
        .then(pilots => {
            pilots.forEach(pilot => {
                if (pilot.lat && pilot.lng) {
                    const staticIcon = L.divIcon({
                        className: 'custom-leaflet-dot',
                        html: '<div class="w-1.5 h-1.5 rounded-full bg-primary/90 shadow-[0_0_4px_rgba(71,194,120,0.8)] transition-all"></div>',
                        iconSize: [6, 6],
                        iconAnchor: [3, 3]
                    });

                    const marker = L.marker([pilot.lat, pilot.lng], { icon: staticIcon, interactive: false })
                        .addTo(map);

                    marker._pilotData = pilot;
                    allMarkers.push(marker);
                }
            });

            startDispersedBlinkingLoop(allMarkers);
        })
        .catch(err => console.error("Error loading pilot map dataset:", err));
}

function blinkMarker(marker) {
    const el = marker.getElement();
    if (!el) return;
    const dot = el.querySelector('div');
    if (!dot) return;

    dot.classList.remove('dot-blinking');
    void dot.offsetWidth;
    dot.classList.add('dot-blinking');

    setTimeout(() => {
        dot.classList.remove('dot-blinking');
    }, 1200);
}

function startDispersedBlinkingLoop(markers) {
    if (!markers.length) return;

    // Regiones geográficas delimitadas para garantizar dispersión nacional
    const misionesRegion = markers.filter(m => m._pilotData.lat > -28.5 && m._pilotData.lng > -56.5); // Misiones / Corrientes
    const northRegion = markers.filter(m => m._pilotData.lat > -30 && m._pilotData.lng <= -56.5);    // NOA (Jujuy, Salta, Tucumán)
    const westRegion = markers.filter(m => m._pilotData.lng < -67 && m._pilotData.lat <= -28 && m._pilotData.lat > -40); // Cuyo/Oeste (Mendoza, San Juan, Neuquén)
    const centerRegion = markers.filter(m => m._pilotData.lat <= -30 && m._pilotData.lat > -36 && m._pilotData.lng >= -67); // Centro (CÓ, SF, BA)
    const southRegion = markers.filter(m => m._pilotData.lat <= -36); // Patagonia

    const getRandomItem = (arr, fallback) => (arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : fallback[Math.floor(Math.random() * fallback.length)]);

    function runCycle() {
        // 3 grupos de 5 puntos (1 Misiones, 1 NOA, 1 Oeste, 1 Centro, 1 Patagonia)
        const groups = [];
        for (let g = 0; g < 3; g++) {
            const group = [
                getRandomItem(misionesRegion, markers),
                getRandomItem(northRegion, markers),
                getRandomItem(westRegion, markers),
                getRandomItem(centerRegion, markers),
                getRandomItem(southRegion, markers)
            ];
            groups.push(group);
        }

        let delay = 0;

        groups.forEach((group) => {
            group.forEach((marker) => {
                setTimeout(() => {
                    blinkMarker(marker);
                }, delay);
                delay += 500;
            });

            delay += 800; // Pausa entre grupos
        });

        setTimeout(runCycle, delay + 1200);
    }

    runCycle();
}

document.addEventListener('DOMContentLoaded', () => {
    initPilotsMap();
});