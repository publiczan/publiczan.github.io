document.addEventListener("DOMContentLoaded", function () {
    // sc01
    (function () {
        const sc01 = document.querySelector('.sc01Swiper');
        if (!sc01) return;

        const slides = sc01.querySelectorAll('.swiper-slide');
        let currentIndex = 0;
        const nextBtn = sc01.querySelector('.next_btn');
        const prevBtn = sc01.querySelector('.prev_btn');

        function updateSlides() {
            slides.forEach(slide => slide.classList.remove('prev2', 'prev', 'active', 'next', 'next2'));

            if (slides.length > 0) {
                const prev2Index = (currentIndex - 2 + slides.length) % slides.length;
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                const nextIndex = (currentIndex + 1) % slides.length;
                const next2Index = (currentIndex + 2) % slides.length;

                slides[prev2Index].classList.add('prev2');
                slides[prevIndex].classList.add('prev');
                slides[currentIndex].classList.add('active');
                slides[nextIndex].classList.add('next');
                slides[next2Index].classList.add('next2');
            }

            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        }

        if (slides.length > 0) {
            updateSlides();

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < slides.length - 1) {
                        currentIndex++;
                        updateSlides();
                    }
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSlides();
                    }
                });
            }
        }
    })();

    // sc02
    (function () {
        const tabItems = document.querySelectorAll(".sc02 .tab_box ul li");
        const targets = document.querySelectorAll(".sc02 .target_box .target");

        if (tabItems.length === 0 || targets.length === 0) return;

        function activateTab(index) {
            tabItems.forEach((tab, i) => {
                tab.classList.toggle("active", i === index);
            });
            targets.forEach((target, i) => {
                target.classList.toggle("show", i === index);
            });
        }

        tabItems.forEach((tab, idx) => {
            tab.addEventListener("click", () => {
                activateTab(idx);
            });
        });

        activateTab(0);
    })();

});