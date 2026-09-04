/**
 * @file main.js
 * @description Core UI logic including mobile navigation toggling, modal controls, scroll reveal observers, and lazy video loading.
 */

/**
 * Toggles the mobile navigation drawer menu and its hamburger/close icon state.
 * @returns {void}
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    if (!menu) return;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        if (icon) icon.textContent = 'close';
    } else {
        menu.classList.add('hidden');
        if (icon) icon.textContent = 'menu';
    }
}

/**
 * Toggles the visibility of the download modal with smooth backdrop transitions and disables body scroll.
 * @returns {void}
 */
function toggleDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
        document.body.style.overflow = '';
    }
}

// Bind functions to the global window object to prevent reference errors from inline HTML events
window.toggleMobileMenu = toggleMobileMenu;
window.toggleDownloadModal = toggleDownloadModal;

// Initialize triggers and scroll observers
document.addEventListener('DOMContentLoaded', () => {
    // 1. YouTube Video Lazy Loading
    const videoIframe = document.getElementById('featured-video');
    if (videoIframe) {
        const videoObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoIframe.src = videoIframe.dataset.src;
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        videoObserver.observe(videoIframe);
    }

    // 2. Scroll Reveal Animations (con Throttling mediante requestAnimationFrame)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            }
        });
    };

    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    revealOnScroll(); // Run initially
});

// Exponer la función globalmente para el evento onclick del footer
window.copyEmailToClipboard = function (event, email) {
    event.preventDefault();

    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('email-copied-toast');
        if (toast) {
            toast.classList.remove('hidden', 'opacity-0');
            toast.classList.add('opacity-100');

            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
                setTimeout(() => toast.classList.add('hidden'), 300);
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar el correo:', err);
    });
};