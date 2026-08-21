document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('ecosystem-animation-mount');
  if (!mountPoint) return;

  // Inyección de HTML con líneas del triángulo y líneas convergentes al centro
  mountPoint.innerHTML = `
    <div id="vistaguay-animation-container" class="relative w-full max-w-2xl mx-auto overflow-visible select-none py-2 scale-110 sm:scale-115 transform origin-center">
      <div class="relative w-full aspect-[4/3] max-h-[480px]">
        
        <!-- Badge Superior: Ecosistema Integrado -->
        <div id="vg-title-badge" class="absolute left-1/2 top-[8%] -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-700 opacity-0 scale-50 pointer-events-none">
          <div class="px-5 py-2 rounded-full bg-[#47C278] text-white font-extrabold text-xs sm:text-sm shadow-[0_8px_25px_rgba(71,194,120,0.3)] flex items-center justify-center">
            <span>Ecosistema Integrado</span>
          </div>
        </div>

        <!-- Logo Central Circular de Vistaguay (iso-logo.png) -->
        <div id="vg-center-logo" class="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 opacity-0 scale-50 pointer-events-none">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#47C278] shadow-[0_15px_35px_rgba(71,194,120,0.4)] flex items-center justify-center p-2.5 overflow-hidden">
            <img src="images/iso-logo.png" alt="Vistaguay Isotipo" class="w-full h-full object-contain" onError="this.src='iso-logo.png'" />
          </div>
        </div>

        <!-- Líneas SVG Conectoras -->
        <svg viewBox="0 0 800 600" class="w-full h-full absolute inset-0 overflow-visible pointer-events-none">
          <!-- 1. Líneas del Triángulo Exterior -->
          <line id="line-farmer-dev" x1="400" y1="132" x2="176" y2="468" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />
          <line id="line-farmer-pilot" x1="400" y1="132" x2="624" y2="468" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />
          <line id="line-dev-pilot" x1="176" y1="468" x2="624" y2="468" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />

          <!-- 2. Líneas Radiales Convergentes al Centro (Paso 5) -->
          <line id="line-farmer-center" x1="400" y1="132" x2="400" y2="348" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
          <line id="line-dev-center" x1="176" y1="468" x2="400" y2="348" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
          <line id="line-pilot-center" x1="624" y1="468" x2="400" y2="348" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
        </svg>

        <!-- NODO 1: PRODUCTOR -->
        <div id="vg-node-farmer" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
          <div id="bubble-farmer" class="vg-bubble absolute bottom-full mb-3 left-1/2 z-50 w-max max-w-[220px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
            <div class="relative px-3.5 py-2 rounded-2xl bg-[#47C278] text-white font-semibold text-xs shadow-lg border border-emerald-300 text-center">
              <span>"Quiero soluciones sin comprar un dron"</span>
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#47C278]"></div>
            </div>
          </div>
          <div class="node-circle w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
            <div class="w-full h-full rounded-full bg-[#F3FDF8] flex items-center justify-center p-2 overflow-hidden">
              <img src="images/Farmer.jpg" alt="Productor" class="w-full h-full object-contain" onError="this.src='Farmer.jpg'" />
            </div>
          </div>
          <span class="node-title mt-2 px-3 py-1 rounded-full text-xs font-bold text-[#111827] bg-white border border-[#E5E7EB] shadow-sm whitespace-nowrap">Productor</span>
        </div>

        <!-- NODO 2: PILOTOS -->
        <div id="vg-node-pilot" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
          <div id="bubble-pilot" class="vg-bubble absolute bottom-full mb-3 left-1/2 z-50 w-max max-w-[200px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
            <div class="relative px-3.5 py-2 rounded-2xl bg-[#47C278] text-white font-semibold text-xs shadow-lg border border-emerald-300 text-center">
              <span>"Quiero volar más en mi zona"</span>
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#47C278]"></div>
            </div>
          </div>
          <div class="node-circle w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
            <div class="w-full h-full rounded-full bg-[#F3FDF8] flex items-center justify-center p-2 overflow-hidden">
              <img src="images/Pilot.jpg" alt="Pilotos" class="w-full h-full object-contain" onError="this.src='Pilot.jpg'" />
            </div>
          </div>
          <span class="node-title mt-2 px-3 py-1 rounded-full text-xs font-bold text-[#111827] bg-white border border-[#E5E7EB] shadow-sm whitespace-nowrap">Pilotos</span>
        </div>

        <!-- NODO 3: DESARROLLADORES -->
        <div id="vg-node-dev" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
          <div id="bubble-dev" class="vg-bubble absolute bottom-full mb-3 left-1/2 z-50 w-max max-w-[210px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
            <div class="relative px-3.5 py-2 rounded-2xl bg-[#47C278] text-white font-semibold text-xs shadow-lg border border-emerald-300 text-center">
              <span>"Quiero vender mis algoritmos"</span>
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#47C278]"></div>
            </div>
          </div>
          <div class="node-circle w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
            <div class="w-full h-full rounded-full bg-[#F3FDF8] flex items-center justify-center p-2 overflow-hidden">
              <img src="images/Dev.jpg" alt="Desarrolladores" class="w-full h-full object-contain" onError="this.src='Dev.jpg'" />
            </div>
          </div>
          <span class="node-title mt-2 px-3 py-1 rounded-full text-xs font-bold text-[#111827] bg-white border border-[#E5E7EB] shadow-sm whitespace-nowrap">Desarrolladores</span>
        </div>

      </div>
    </div>
  `;

  // Coreografía Secuencial
  const nodeFarmer = document.getElementById('vg-node-farmer');
  const nodePilot = document.getElementById('vg-node-pilot');
  const nodeDev = document.getElementById('vg-node-dev');

  const bubbleFarmer = document.getElementById('bubble-farmer');
  const bubblePilot = document.getElementById('bubble-pilot');
  const bubbleDev = document.getElementById('bubble-dev');

  const titleBadge = document.getElementById('vg-title-badge');
  const centerLogo = document.getElementById('vg-center-logo');

  // Líneas del Triángulo Exterior
  const lineFarmerDev = document.getElementById('line-farmer-dev');
  const lineFarmerPilot = document.getElementById('line-farmer-pilot');
  const lineDevPilot = document.getElementById('line-dev-pilot');

  // Líneas Convergentes al Centro
  const lineFarmerCenter = document.getElementById('line-farmer-center');
  const lineDevCenter = document.getElementById('line-dev-center');
  const linePilotCenter = document.getElementById('line-pilot-center');

  let timelineTimeout = null;

  function runEcosystemAnimation() {
    clearTimeout(timelineTimeout);

    // Reset Estado Inicial
    titleBadge.style.opacity = '0';
    titleBadge.style.transform = 'translate(-50%, -50%) scale(0.5)';
    centerLogo.style.opacity = '0';
    centerLogo.style.transform = 'translate(-50%, -50%) scale(0.5)';

    [lineFarmerDev, lineFarmerPilot, lineDevPilot, lineFarmerCenter, lineDevCenter, linePilotCenter].forEach(l => l.style.opacity = '0');
    [bubbleFarmer, bubblePilot, bubbleDev].forEach(b => {
      b.style.opacity = '0';
      b.style.transform = 'translate(-50%, 0) scale(0.5)';
    });

    // Disposición horizontal en fila
    nodeFarmer.style.opacity = '0';
    nodeFarmer.style.left = '23%';
    nodeFarmer.style.top = '56%';

    nodePilot.style.opacity = '0';
    nodePilot.style.left = '50%';
    nodePilot.style.top = '56%';

    nodeDev.style.opacity = '0';
    nodeDev.style.left = '77%';
    nodeDev.style.top = '56%';

    // PASO 1: Badge "Ecosistema Integrado"
    setTimeout(() => {
      titleBadge.style.opacity = '1';
      titleBadge.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);

    // PASO 2: Aparecen en fila los 3 nodos
    setTimeout(() => { nodeFarmer.style.opacity = '1'; }, 800);
    setTimeout(() => { nodePilot.style.opacity = '1'; }, 1600);
    setTimeout(() => { nodeDev.style.opacity = '1'; }, 2400);

    // PASO 3: Reordenamiento a Triángulo y encendido de líneas exteriores
    setTimeout(() => {
      titleBadge.style.opacity = '0';

      nodeFarmer.style.left = '50%';
      nodeFarmer.style.top = '22%';

      nodeDev.style.left = '22%';
      nodeDev.style.top = '78%';

      nodePilot.style.left = '78%';
      nodePilot.style.top = '78%';

      [lineFarmerDev, lineFarmerPilot, lineDevPilot].forEach(l => l.style.opacity = '1');
    }, 3600);

    // PASO 4: Globos de diálogo centrados
    setTimeout(() => {
      bubbleFarmer.style.opacity = '1';
      bubbleFarmer.style.transform = 'translate(-50%, 0) scale(1)';
    }, 5200);

    setTimeout(() => {
      bubbleFarmer.style.opacity = '0';
      bubbleFarmer.style.transform = 'translate(-50%, 0) scale(0.5)';
      bubblePilot.style.opacity = '1';
      bubblePilot.style.transform = 'translate(-50%, 0) scale(1)';
    }, 7600);

    setTimeout(() => {
      bubblePilot.style.opacity = '0';
      bubblePilot.style.transform = 'translate(-50%, 0) scale(0.5)';
      bubbleDev.style.opacity = '1';
      bubbleDev.style.transform = 'translate(-50%, 0) scale(1)';
    }, 10000);

    // PASO 5: Ocultar globos, apagar triángulo exterior, encender líneas al centro y revelar Isotipo Vistaguay
    setTimeout(() => {
      bubbleDev.style.opacity = '0';
      bubbleDev.style.transform = 'translate(-50%, 0) scale(0.5)';

      // Apagar líneas del triángulo exterior
      [lineFarmerDev, lineFarmerPilot, lineDevPilot].forEach(l => l.style.opacity = '0');

      // Encender líneas radiales hacia el logo central
      [lineFarmerCenter, lineDevCenter, linePilotCenter].forEach(l => l.style.opacity = '1');

      // Revelar Isotipo Vistaguay en el centro
      centerLogo.style.opacity = '1';
      centerLogo.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 12400);

    // Bucle continuo
    timelineTimeout = setTimeout(() => {
      runEcosystemAnimation();
    }, 16500);
  }

  runEcosystemAnimation();
});