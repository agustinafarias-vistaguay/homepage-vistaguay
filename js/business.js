/**
 * @file business.js
 * @description Paneo automático tipo carrusel con reejecución limpia de animación al hacer clic.
 */
(function () {
    let solicitudAnimTimers = [];

    function clearSolicitudTimers() {
        solicitudAnimTimers.forEach(timer => clearTimeout(timer));
        solicitudAnimTimers = [];
    }

    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.biz-card');
        const images = document.querySelectorAll('.biz-img');
        const cardsContainer = document.getElementById('biz-cards-container');
        const imageContainer = document.getElementById('biz-image-container');
        const section = document.getElementById('business');

        if (!cards.length || !images.length || !section) return;

        let currentIndex = 0;
        let timer = null;
        const intervalTime = 10500; // Tiempo suficiente para completar el flujo

        function goToSlide(nextIndex, forceReset = false) {
            if (nextIndex === currentIndex && !forceReset) return;

            const currentImg = images[currentIndex];
            const nextImg = images[nextIndex];

            if (nextIndex !== currentIndex) {
                nextImg.style.transition = 'none';
                nextImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain translate-x-full opacity-0 z-10';
                nextImg.offsetHeight; // Reflow

                const transitionStyle = 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)';
                currentImg.style.transition = transitionStyle;
                nextImg.style.transition = transitionStyle;

                currentImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain -translate-x-full opacity-0 z-0';
                nextImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain translate-x-0 opacity-100 z-10';
            }

            cards.forEach((card, i) => {
                const iconBox = card.querySelector('.biz-icon-box');
                const title = card.querySelector('.biz-title');
                const desc = card.querySelector('.biz-desc');

                if (i === nextIndex) {
                    card.className = 'biz-card group cursor-pointer p-4 rounded-2xl border transition-all duration-500 bg-primary text-white border-primary shadow-md';
                    iconBox.className = 'biz-icon-box w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors mt-0.5';
                    title.className = 'biz-title text-sm font-bold text-white leading-tight mb-1';
                    desc.className = 'biz-desc text-sm text-white/90 leading-relaxed';
                } else {
                    card.className = 'biz-card group cursor-pointer p-4 rounded-2xl border transition-all duration-500 bg-white border-slate-200/80 text-slate-800 hover:border-primary/50';
                    iconBox.className = 'biz-icon-box w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors mt-0.5';
                    title.className = 'biz-title text-sm font-bold text-slate-900 leading-tight mb-1';
                    desc.className = 'biz-desc text-sm text-slate-600 leading-relaxed';
                }
            });

            currentIndex = nextIndex;

            if (currentIndex === 0) {
                runSolicitudAnimation();
            } else {
                clearSolicitudTimers();
            }
        }

        function startAutoRotation() {
            stopAutoRotation();
            timer = setInterval(() => {
                const next = (currentIndex + 1) % cards.length;
                goToSlide(next);
            }, intervalTime);
        }

        function stopAutoRotation() {
            if (timer) clearInterval(timer);
        }

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                goToSlide(idx, idx === 0);
                startAutoRotation();
            });
        });

        [cardsContainer, imageContainer].forEach(element => {
            if (element) {
                element.addEventListener('mouseenter', stopAutoRotation);
                element.addEventListener('mouseleave', startAutoRotation);
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (currentIndex === 0) runSolicitudAnimation();
                    startAutoRotation();
                } else {
                    stopAutoRotation();
                    clearSolicitudTimers();
                }
            });
        }, { threshold: 0.25 });

        observer.observe(section);
    });

    function runSolicitudAnimation() {
        clearSolicitudTimers();

        const baseUi = document.getElementById('anim-base-ui');
        const btnSolicitud = document.getElementById('anim-btn-solicitud');
        const backdrop = document.getElementById('anim-backdrop');
        const modalForm = document.getElementById('anim-modal-form');
        const cardSelected = document.getElementById('anim-card-selected');
        const btnSolicitar = document.getElementById('anim-btn-solicitar');
        const modalSuccess = document.getElementById('anim-modal-success');
        const iconCheck = document.getElementById('anim-icon-check');

        if (!baseUi || !btnSolicitud || !backdrop) return;

        baseUi.classList.add('blur-md', 'opacity-0');
        baseUi.classList.remove('blur-0', 'opacity-100');

        btnSolicitud.classList.add('blur-md', 'opacity-0');
        btnSolicitud.classList.remove('blur-0', 'opacity-100');
        btnSolicitud.style.transform = 'scale(1)';

        backdrop.classList.add('opacity-0');

        modalForm.classList.add('opacity-0', 'scale-90');
        modalForm.classList.remove('opacity-100', 'scale-100');

        if (cardSelected) {
            cardSelected.classList.add('opacity-0', 'scale-95');
            cardSelected.classList.remove('opacity-100', 'scale-100');
        }

        if (btnSolicitar) btnSolicitar.style.transform = 'scale(1)';

        modalSuccess.classList.add('opacity-0', 'scale-90');
        modalSuccess.classList.remove('opacity-100', 'scale-100');

        if (iconCheck) iconCheck.style.transform = 'scale(0)';

        const schedule = (fn, delay) => {
            const t = setTimeout(fn, delay);
            solicitudAnimTimers.push(t);
        };

        schedule(() => {
            baseUi.classList.remove('blur-md', 'opacity-0');
            baseUi.classList.add('blur-0', 'opacity-100');

            btnSolicitud.classList.remove('blur-md', 'opacity-0');
            btnSolicitud.classList.add('blur-0', 'opacity-100');
        }, 200);

        schedule(() => {
            btnSolicitud.style.transform = 'scale(1.15)';
        }, 1900);

        schedule(() => {
            btnSolicitud.style.transform = 'scale(1)';
        }, 2300);

        schedule(() => {
            backdrop.classList.remove('opacity-0');
        }, 3200);

        schedule(() => {
            modalForm.classList.remove('opacity-0', 'scale-90');
            modalForm.classList.add('opacity-100', 'scale-100');
        }, 3500);

        schedule(() => {
            if (cardSelected) {
                cardSelected.classList.remove('opacity-0', 'scale-95');
                cardSelected.classList.add('opacity-100', 'scale-100');
            }
        }, 5100);

        schedule(() => {
            if (btnSolicitar) btnSolicitar.style.transform = 'scale(1.15)';
        }, 6200);

        schedule(() => {
            if (btnSolicitar) btnSolicitar.style.transform = 'scale(1)';
        }, 6600);

        schedule(() => {
            modalForm.classList.remove('opacity-100', 'scale-100');
            modalForm.classList.add('opacity-0', 'scale-95');

            modalSuccess.classList.remove('opacity-0', 'scale-90');
            modalSuccess.classList.add('opacity-100', 'scale-100');

            schedule(() => {
                if (iconCheck) {
                    iconCheck.style.transform = 'scale(1.25)';
                    schedule(() => { iconCheck.style.transform = 'scale(1)'; }, 200);
                }
            }, 250);
        }, 7800);

        schedule(() => {
            baseUi.classList.add('opacity-0');
            btnSolicitud.classList.add('opacity-0');
            backdrop.classList.add('opacity-0');

            modalSuccess.classList.remove('opacity-100', 'scale-100');
            modalSuccess.classList.add('opacity-0', 'scale-90');

            schedule(() => {
                goToSlide(1);
                startAutoRotation();
            }, 300);
        }, 10800);
    }
})();