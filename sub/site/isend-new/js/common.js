// common.js
document.addEventListener("DOMContentLoaded", function () {
    // scroll button
    (function () {
        const btn = document.getElementById("scbtn");
        const target = document.querySelector(".sc01");

        if (btn && target) {
            btn.addEventListener("click", () => {
                const offsetTop = target.offsetTop;

                if (!/Mobi|Android|iPad|iPhone/i.test(navigator.userAgent)) {
                    const startY = window.scrollY;
                    const distance = offsetTop - startY;
                    const duration = 1000;
                    let startTime = null;

                    function animateScroll(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);

                        window.scrollTo(0, startY + distance * ease);

                        if (progress < 1) {
                            requestAnimationFrame(animateScroll);
                        }
                    }

                    requestAnimationFrame(animateScroll);
                } else {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
    })();

    // section on 제어
    (function () {
        const sections = document.querySelectorAll('.contents section:not(.main)');

        // iapps 여부 판단 (맨 위 section 기준)
        const isIapps =
            document.querySelector('.contents section')?.classList.contains('iapps');

        // 기본 observer
        const defaultObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('on');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        const specialObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('on');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        sections.forEach(sec => {
            if (
                isIapps &&
                (
                    sec.classList.contains('sc03') ||
                    sec.classList.contains('sc04') ||
                    sec.classList.contains('sc07') ||
                    sec.classList.contains('sc08')
                )
            ) {
                specialObserver.observe(sec);
            } else {
                defaultObserver.observe(sec);
            }
        });
    })();

    // mainSwiper
    (function () {
        const pad2 = n => String(n).padStart(2, '0');
        const $curr = document.querySelector('.swiper_custom .curr');
        const $total = document.querySelector('.swiper_custom .total');
        const section = document.querySelector('section.main');
        const swiperEl = document.querySelector('.mainSwiper');

        if (!swiperEl || !section) return;

        const slides = swiperEl.querySelectorAll('.swiper-slide');
        const mainCls = ['isend', 'point', 'brand', 'iapps', 'ireview'].find(cls =>
            section.classList.contains(cls)
        );
        let initialSlide = 0;
        
        if (mainCls) {
            slides.forEach((slide, idx) => {
                if (slide.classList.contains(mainCls)) {
                    initialSlide = idx;
                }
            });
        }

        slides.forEach(slide => {
            const inner = slide.querySelector('.inner');
            if (!inner) return;
            if (slide.classList.contains(mainCls)) inner.classList.add('on');
            else inner.classList.remove('on');
        });

        if (window.innerWidth <= 768) return;

        const swiper = new Swiper('.mainSwiper', {
            speed: 800,
            slidesPerView: 1,
            loop: true,
            initialSlide: initialSlide,
            navigation: {
                prevEl: '.swiper_custom .prev_btn',
                nextEl: '.swiper_custom .next_btn'
            },
            pagination: {
                el: '.swiper_custom .bar',
                type: 'progressbar'
            },
            on: {
                init(s) {
                    const realTotal = s.wrapperEl.querySelectorAll(
                        '.swiper-slide:not(.swiper-slide-duplicate)'
                    ).length;
                    if ($total) $total.textContent = pad2(realTotal);
                    if ($curr) $curr.textContent = pad2(s.realIndex + 1);

                    s.slides.forEach(slide => {
                        const inner = slide.querySelector('.inner');
                        if (inner) inner.classList.remove('on');
                    });
                    const activeInner = s.slides[s.activeIndex].querySelector('.inner');
                    if (activeInner) activeInner.classList.add('on');
                },
                slideChange(s) {
                    if ($curr) $curr.textContent = pad2(s.realIndex + 1);

                    s.slides.forEach(slide => {
                        const inner = slide.querySelector('.inner');
                        if (inner) inner.classList.remove('on');
                    });

                    const activeInner = s.slides[s.activeIndex].querySelector('.inner');
                    if (activeInner) {
                        activeInner.classList.remove('on');
                        void activeInner.offsetWidth;
                        activeInner.classList.add('on');
                    }
                }
            }
        });

        window.addEventListener('load', () => {
            const activeSlide = swiperEl.querySelector(`.swiper-slide.${mainCls}`);
            if (activeSlide) {
                const inner = activeSlide.querySelector('.inner');
                if (inner) {
                    inner.classList.remove('on');
                    void inner.offsetWidth;
                    inner.classList.add('on');
                }
            }
        });
    })();

    // mo_nav
    (function () {
        const moNavBtn = document.querySelector('.mo_nav_btn');
        const moNav = document.querySelector('header .inner .gnb');
        const arrows = document.querySelectorAll('.has-sub .arrow');
        let scrollY = 0;

        const isMobile = () => window.innerWidth <= 768;

        if (moNavBtn && moNav) {
            moNavBtn.addEventListener('click', function () {
                if (!isMobile()) return;

                const isOn = moNavBtn.classList.toggle('on');
                moNav.classList.toggle('on');

                if (isOn) {
                    scrollY = window.scrollY;
                    document.body.style.cssText = `position: fixed; top: -${scrollY}px; left: 0; right: 0; overflow: hidden;`;
                } else {
                    document.body.style.cssText = '';
                    window.scrollTo(0, scrollY);
                }
            });
        }

        arrows.forEach(arrow => {
            arrow.addEventListener('click', function (e) {
                if (!isMobile()) return;
                e.preventDefault();
                const parentLi = this.closest('.has-sub');
                if (parentLi) parentLi.classList.toggle('on');
            });
        });

        window.addEventListener('resize', function() {
            if (!isMobile()) {
                document.body.style.cssText = '';
                if (moNavBtn) moNavBtn.classList.remove('on');
                if (moNav) moNav.classList.remove('on');
            }
        });
    })();
});