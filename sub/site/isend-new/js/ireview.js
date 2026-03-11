document.addEventListener('DOMContentLoaded', function () {
    const sc01 = document.querySelector('.sc01Swiper');
    if (!sc01) return;

    const slides = sc01.querySelectorAll('.swiper-slide');
    const nextBtn = sc01.querySelector('.next_btn');
    const prevBtn = sc01.querySelector('.prev_btn');

    let currentIndex = 1; 

    function updateSlides() {
        if (window.innerWidth > 768) {
            slides.forEach(slide => slide.classList.remove('prev', 'active', 'next'));
            return; 
        }

        slides.forEach(slide => slide.classList.remove('prev', 'active', 'next'));

        if (slides.length === 0) return;

        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        const nextIndex = (currentIndex + 1) % slides.length;

        slides[prevIndex].classList.add('prev');
        slides[currentIndex].classList.add('active');
        slides[nextIndex].classList.add('next');

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === slides.length - 1);
    }

    nextBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768 && currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlides();
        }
    });

    prevBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768 && currentIndex > 0) {
            currentIndex--;
            updateSlides();
        }
    });

    updateSlides();
    window.addEventListener('resize', updateSlides);
});