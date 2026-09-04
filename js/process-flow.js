/**
 * @file process-flow.js
 * @description Animación fluida e ininterrumpida de la línea de proceso sincronizada con latidos suaves.
 */
document.addEventListener('DOMContentLoaded', () => {
    const processContainer = document.getElementById('process-container');
    const progressLine = document.getElementById('process-progress-line');

    if (!processContainer || !progressLine) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runFluidProcessSequence();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    observer.observe(processContainer);

    function pulseIcon(stepIndex) {
        const circle = document.getElementById(`process-icon-${stepIndex}`);
        if (circle) {
            circle.classList.add('animate-icon-pulse');
            setTimeout(() => circle.classList.remove('animate-icon-pulse'), 1000);
        }
    }

    function runFluidProcessSequence() {
        const isDesktop = window.innerWidth >= 1024;
        const totalDuration = 5500; // 3.5 segundos de recorrido fluido total
        const stepInterval = totalDuration / 5; // ~700ms exactos entre cada ícono

        if (isDesktop) {
            // Animación de línea 100% fluida y constante
            progressLine.style.transition = `width ${totalDuration}ms linear`;
            progressLine.style.width = '100%';
        }

        // Sincronización de latidos en el instante exacto que la línea cruza cada círculo
        pulseIcon(1); // Inicio inmediato (0ms)

        setTimeout(() => pulseIcon(2), stepInterval);       // ~700ms (20%)
        setTimeout(() => pulseIcon(3), stepInterval * 2);   // ~1400ms (40%)
        setTimeout(() => pulseIcon(4), stepInterval * 3);   // ~2100ms (60%)
        setTimeout(() => pulseIcon(5), stepInterval * 4);   // ~2800ms (80%)

        // Remate en paso 6 cuando la línea llega al final (100% / 3500ms)
        setTimeout(() => {
            pulseIcon(6);

            // Activación del color verde de cierre
            const circle6 = document.getElementById('process-icon-6');
            const symbol6 = document.getElementById('process-symbol-6');
            const title6 = document.getElementById('process-title-6');
            const desc6 = document.getElementById('process-desc-6');

            if (circle6) {
                circle6.classList.remove('bg-[#eefaf2]', 'border-primary/20');
                circle6.classList.add('bg-primary', 'shadow-md');
            }
            if (symbol6) {
                symbol6.classList.remove('text-primary');
                symbol6.classList.add('text-white');
            }
            if (title6) {
                title6.classList.remove('text-slate-900');
                title6.classList.add('text-primary');
            }
            if (desc6) {
                desc6.classList.remove('text-slate-600');
                desc6.classList.add('text-slate-800', 'font-semibold');
            }
        }, totalDuration);
    }
});