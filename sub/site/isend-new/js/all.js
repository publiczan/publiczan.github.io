// window load event
window.addEventListener('load', () => {
    // default setting ----------------------------
    // mobile height
    setScreen();
    // ---------------------------------------------

    // common element

    const $scrollTrigger = document.querySelectorAll('.scroll-trigger');

    // scroll-trigger load setting
    $scrollTrigger.forEach((elm) => {
        if (elm.offsetTop <= window.innerHeight) elm.classList.add('on');
    });

    // window scroll event
    window.addEventListener('scroll', () => {
        // react element
        $scrollTrigger.forEach((elm) => {
            if (window.scrollY > elm.offsetTop - window.innerHeight / 1.5) {
                if (!elm.classList.contains('on')) elm.classList.add('on');
            }

            if (window.scrollY + window.innerHeight <= elm.offsetTop) {
                if (elm.classList.contains('on')) elm.classList.remove('on');
            }
        });

    });
});

class Wswiper {
    constructor(className, options) {
        // element
        this.$swiper = document.querySelector(className);
        if (!this.$swiper) {
            console.error(`${className} 클래스 네임을 찾을 수 없습니다.`);
            return;
        }
        this.$swiperWrap = this.$swiper.querySelector('.wswiper-wrapper');
        this.$swiperSlides = [...this.$swiper.querySelectorAll('.wswiper-slide')];
        this.$pageNav = null;
        this.$pageNavBullets = null;

        // options
        this.basicOptions = options;
        this.options = {
            pagination: null,
            dragMode: 'live',
            autoplay: false,
            slidesPerView: 1,
            setPosX: null,
            freeMode: false,
            slideMoveStartIdx: null,
            addClass: {},
            breakpoints: {},
            slideMoveSize: this.$swiper.clientWidth,
            ...options,
        };

        // state / control value
        this.slidesLength = this.$swiperSlides.length;
        this.current = 0;
        this.slideWidth = 0;
        this.autoplayInterval = null;
        this.currentTotalMoveX = null;

        // method
        this.init();
        this.resize();
    }

    init() {
        // set
        this._setBreakpoints();
        this._setPagination();
        this._setDragMode();
        this._setAutoplay();
        this._setSliderPosX();
        this._addClass();

        // style
        this._setSpaceBetween();
        this._setSpeed();

        // event
        this._clickActive();
        this._clickPagination();
    }

    resize() {
        let resizeId = null;

        window.addEventListener('resize', () => {
            if (resizeId) cancelAnimationFrame(resizeId);

            resizeId = requestAnimationFrame(() => {
                this._setBreakpoints();
                this._addClass();
                this._setSpaceBetween();
                this._setSpeed();
                this._setSliderPosX();
                this.moveTo();
            });
        });
    }

    _setSliderPosX() {
        if (!this.options.setPosX) return;
        this.$swiperWrap.style.transform = `translate3d(-${this.options.setPosX}px, 0, 0)`;
    }

    _setBreakpoints() {
        if (Object.keys(this.options.breakpoints).length === 0) return;

        const breakpointList = this.options.breakpoints;
        const target = Object.keys(breakpointList)
            .map(Number)
            .filter((bp) => window.innerWidth <= bp)
            .sort((a, b) => a - b)[0];

        if (target) {
            this.options = {
                ...this.options,
                ...breakpointList[target],
            };

            if (breakpointList[target].addClass) {
                this.options.addClass = breakpointList[target].addClass;
            }
        } else {
            this.options = {
                ...this.basicOptions,
            };
        }
    }

    _getSlideMoveRange() {
        const hasStart = typeof this.options.slideMoveStartIdx === 'number';
        const hasLast = typeof this.options.slideMoveLastIdx === 'number';

        return {
            hasStart,
            hasLast,
            slideMoveStartIdx: hasStart ? this.options.slideMoveStartIdx - 1 : null,
            slideMoveLastIdx: hasLast ? this.options.slideMoveLastIdx - 1 : null,
        };
    }

    _addClass() {
        if (Object.keys(this.options.addClass).length === 0) return;

        const {
            slideMoveStartIdx,
            slideMoveLastIdx
        } = this._getSlideMoveRange();

        const addClassList = this.options.addClass;

        for (const className in addClassList) {
            let classTargetNum = this.current + addClassList[className];

            if (classTargetNum < 0) classTargetNum = 0;
            if (classTargetNum >= this.slidesLength - 1) classTargetNum = this.slidesLength - 1;

            if (slideMoveStartIdx !== null && this.current < slideMoveStartIdx) {
                if (addClassList[className] < 0) classTargetNum = 0;
                if (addClassList[className] > 0) classTargetNum = slideMoveStartIdx;
            }

            if (this.options.slidesPerView > 2 && slideMoveLastIdx !== null && this.current >= slideMoveLastIdx) {
                if (addClassList[className] < 0) {
                    classTargetNum = this.current + addClassList[className] - 1;
                }
            }
            this.$swiperSlides.forEach((elm, idx) => {
                elm.classList.toggle(className, idx === classTargetNum);
            });
        }
    }

    moveTo() {
        const {
            hasStart,
            hasLast,
            slideMoveStartIdx,
            slideMoveLastIdx
        } = this._getSlideMoveRange();

        const slideMoveSize = this.options.slideMoveSize;
        const setPosX = this.options.setPosX || 0;

        let moveCount = hasStart ? this.current - slideMoveStartIdx + 1 : 0;
        let moveSpaceBetween = moveCount * this.options.spaceBetween;
        let moveSizeX = 0;

        if (hasStart && hasLast) {
            if (this.current >= slideMoveLastIdx) {
                moveCount = slideMoveLastIdx - slideMoveStartIdx;
            }

            moveSpaceBetween = moveCount * this.options.spaceBetween;
            moveSizeX = moveCount * slideMoveSize;

            const totalMoveX = this.current >= slideMoveStartIdx ? moveSizeX + moveSpaceBetween + setPosX : setPosX;

            this.$swiperWrap.style.transform = `translate3d(-${totalMoveX}px, 0, 0)`;
            this._addClass();
        }
    }

    _clickActive() {
        this.$swiperSlides.forEach((slide, idx) => {
            slide.addEventListener('click', () => {
                if (this._isDragging) return;
                this.current = idx;
                this.moveTo();
                this.updateSlide();
                this.updatePagination();
                this.restartAutoPlay();
            });
        });
    }

    _setPagination() {
        const pagination = this.options.pagination;
        if (!pagination || !pagination.el) return;
        this.$pageNav = document.querySelector(pagination.el);
        if (!this.$pageNav) {
            console.warn(`pagination 요소(${pagination.el})를 찾을 수 없습니다.`);
            return;
        }

        let bulletName = 'span';
        if (pagination.tagName) bulletName = pagination.tagName;
        const $frag = document.createDocumentFragment();
        for (let i = 0; i < this.slidesLength; i++) {
            const $bullet = document.createElement(bulletName);
            $bullet.classList.add('wswiper-pagination-bullet');
            $frag.appendChild($bullet);
        }

        this.$pageNav.appendChild($frag);

        this.$pageNavBullets = this.$pageNav.querySelectorAll('.wswiper-pagination-bullet');
        this.$pageNavBullets[0].classList.add('on');
    }

    _clickPagination() {
        if (!this.$pageNavBullets) return;

        this.$pageNavBullets.forEach((bullet, idx) => {
            bullet.addEventListener('click', () => {
                this.current = idx;
                this.moveTo();
                this.updateSlide();
                this.updatePagination();
                this.restartAutoPlay();
            });
        });
    }

    updateSlide() {
        this.$swiperSlides.forEach((elm, idx) => {
            elm.classList.toggle('active', idx === this.current);
        });
    }

    updatePagination() {
        if (!this.$pageNavBullets) return;

        this.$pageNavBullets.forEach((bullet, idx) => {
            bullet.classList.toggle('on', idx === this.current);
        });
    }

    _setSpaceBetween() {
        const spaceBetween = this.options.spaceBetween;
        if (!spaceBetween) return;
        this.$swiperSlides.forEach((elm) => {
            elm.style.marginRight = `${spaceBetween}px`;
        });
    }

    _setSpeed() {
        const speed = this.options.speed;
        if (!speed) return;
        this.$swiperWrap.style.transition = `${speed * 0.001}s`;
    }

    _setDragMode() {
        const dragMode = this.options.dragMode;
        if (dragMode === 'live') {} else if (dragMode === 'snap') {
            this._dragModSnap();
        }
    }

    _dragModSnap() {
        let startX = null;

        this.$swiper.addEventListener('pointerdown', (e) => {
            this._isDragging = true;
            startX = e.clientX;
        });

        this.$swiper.addEventListener('pointerup', (e) => {
            const endX = e.clientX;
            const deltaX = endX - startX;
            const threshold = this.$swiper.clientWidth * 0.025;
            const isNext = deltaX < 0;

            if (Math.abs(deltaX) > threshold) {
                if (isNext) {
                    this._next();
                } else {
                    this._prev();
                }
                this.moveTo();
                this.updateSlide();
                this.updatePagination();
                this.restartAutoPlay();
            } else {
                this._isDragging = false;
            }

            startX = null;
        });
    }

    _setAutoplay() {
        const autoplay = this.options.autoplay;
        if (!autoplay) return;
        if (!this.options.autoplay.delay) this.options.autoplay.delay = 5000;
        this._autoplayStart();
    }

    _autoplayStart() {
        if (!this.options.autoplay) return;

        const delay = this.options.autoplay.delay;
        this.autoplayInterval = setInterval(() => {
            this._next();
            this.moveTo();
            this.updateSlide();
            this.updatePagination();
        }, delay);
    }

    _autoplayStop() {
        clearInterval(this.autoplayInterval);
    }

    restartAutoPlay() {
        if (!this.options.autoplay) return;

        this._autoplayStop();
        this._autoplayStart();
    }

    _next() {
        this.current < this.slidesLength - 1 ? this.current++ : (this.current = 0);
    }

    _prev() {
        this.current > 0 ? this.current-- : (this.current = this.slidesLength - 1);
    }
}