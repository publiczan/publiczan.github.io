document.addEventListener("DOMContentLoaded", function () {
    // scroll button
    (function () {
        const buttons = document.querySelectorAll("#scbtn, #scbtn02");
        const target = document.querySelector(".sc01");

        if (!buttons.length || !target) return;

        buttons.forEach(btn => {
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
        });
    })();

    // section on 제어
    (function () {
        const sections = document.querySelectorAll('.contents section:not(.main)');
        const contents = document.querySelector('.contents');
        const isIappsMain =
            contents &&
            contents.querySelector('section.main.iapps');

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

        const iappsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('on');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        const iappsSections = ['sc03', 'sc04', 'sc07', 'sc08'];

        sections.forEach(sec => {
            if (iappsSections.some(cls => sec.classList.contains(cls))) {
                if (isIappsMain) {
                    iappsObserver.observe(sec);
                }
                return;
            }

            defaultObserver.observe(sec);
        });
    })();

    const swiperEl = document.querySelector('.mainSwiper');
    const header = document.querySelector("header");
    const mainSection = document.querySelector(".contents section.main");

    if (swiperEl) {
        const $curr = swiperEl.querySelector('.num.curr');
        const $total = swiperEl.querySelector('.num.total');

        const pad2 = n => String(n).padStart(2, '0');

        function setActiveInner(swiper) {
            swiper.slides.forEach(slide => {
                const inner = slide.querySelector('.inner');
                if (inner) inner.classList.remove('on');
            });

            const activeInner =
                swiper.slides[swiper.activeIndex] ?.querySelector('.inner');

            if (activeInner) {
                activeInner.classList.remove('on');
                void activeInner.offsetWidth;
                activeInner.classList.add('on');
            }
        }

        function updateWhiteByCurr() {
            if (!$curr) return;
            swiperEl.classList.toggle(
                'white',
                $curr.textContent.trim() === '02'
            );
        }

        if (window.innerWidth <= 768) {
            const firstSlideInner = swiperEl.querySelector(
                '.swiper-slide .inner'
            );
            if (firstSlideInner) firstSlideInner.classList.add('on');
        } else {
            const swiper = new Swiper(swiperEl, {
                slidesPerView: 1,
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                navigation: {
                    prevEl: swiperEl.querySelector('.prev_btn'),
                    nextEl: swiperEl.querySelector('.next_btn')
                },
                pagination: {
                    el: swiperEl.querySelector('.bar'),
                    type: 'progressbar'
                },
                on: {
                    init(s) {
                        const realTotal = s.wrapperEl.querySelectorAll(
                            '.swiper-slide:not(.swiper-slide-duplicate)'
                        ).length;

                        if ($total) $total.textContent = pad2(realTotal);
                        if ($curr) $curr.textContent = pad2(s.realIndex + 1);

                        setActiveInner(s);
                        updateWhiteByCurr();
                    },
                    slideChange(s) {
                        if ($curr) $curr.textContent = pad2(s.realIndex + 1);
                        setActiveInner(s);
                        updateWhiteByCurr();
                    }
                }
            });

            if ($curr) {
                new MutationObserver(updateWhiteByCurr).observe($curr, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        }
    }

    if (header && mainSection) {
        new IntersectionObserver(
            ([entry]) => {
                header.classList.toggle("white", entry.isIntersecting);
            }, {
                threshold: 0.1
            }
        ).observe(mainSection);
    }

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