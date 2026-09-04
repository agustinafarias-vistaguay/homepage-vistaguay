/**
 * @file stats.js
 * @description Manages animated statistical counters, scrolling triggers, and IntersectionObservers.
 */

/**
 * Animates a counter element starting from 0 up to its target number value using quadratic easing.
 * @param {HTMLElement} element - The counter element containing data attributes.
 * @returns {void}
 */

(function () {
    function countUp(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 1500; // ms
        const startTime = performance.now();

        const updateCount = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            element.textContent = prefix + currentValue.toLocaleString('es-AR') + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = prefix + target.toLocaleString('es-AR') + suffix;
            }
        };

        requestAnimationFrame(updateCount);
    }

    // Create an intersection observer to trigger counters when they scroll into view
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Automatically search and register observer for all counter elements on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => counterObserver.observe(counter));
    });
})();