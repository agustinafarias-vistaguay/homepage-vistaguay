/**
 * @file pilots-map.js
 * @description Renders Leaflet map overlay, configures tilesets, and parses pilot coordinate data.
 */

/**
 * Initializes the Leaflet map overlay, sets its center, disables standard controls,
 * and fetches and renders coordinate pins asynchronously.
 * @returns {void}
 */
function initPilotsMap() {
    const mapContainer = document.getElementById('pilots-native-map');
    if (!mapContainer) return;

    // Inicializar mapa fijando el zoomSnap a entero para evitar subpíxeles
    const map = L.map('pilots-native-map', {
        center: [-35.5, -62.0],
        zoom: 4,
        zoomSnap: 1,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true
    });

    // Cargar CartoDB Dark Matter No-Labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        tileSize: 256,
        zoomOffset: 0
    }).addTo(map);

    // Carga de puntos
    fetch('data/pilots.json')
        .then(response => response.json())
        .then(pilots => {
            pilots.forEach(pilot => {
                if (pilot.lat && pilot.lng) {
                    const staticIcon = L.divIcon({
                        className: 'custom-leaflet-dot',
                        html: '<div class="w-1.5 h-1.5 rounded-full bg-[#47C278]/90 shadow-[0_0_4px_rgba(71,194,120,0.8)]"></div>',
                        iconSize: [6, 6],
                        iconAnchor: [3, 3]
                    });

                    L.marker([pilot.lat, pilot.lng], { icon: staticIcon, interactive: false })
                        .addTo(map);
                }
            });
        })
        .catch(err => console.error("Error loading pilot map dataset:", err));
}

document.addEventListener('DOMContentLoaded', () => {
    initPilotsMap();
});