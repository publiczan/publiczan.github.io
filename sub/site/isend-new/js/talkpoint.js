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
            slides.forEach(slide => slide.classList.remove('prev', 'active', 'next'));

            if (slides.length > 0) {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                const nextIndex = (currentIndex + 1) % slides.length;

                slides[prevIndex].classList.add('prev');
                slides[currentIndex].classList.add('active');
                slides[nextIndex].classList.add('next');
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

    // sc02 progress
    function setFixedCircle(circleBox, percent, numberText) {
        const circle = circleBox.querySelector('.circle');
        const dot = circleBox.querySelector('.dot');
        const strong = circleBox.querySelector('.percent strong');

        const boxSize = circleBox.offsetWidth;
        const outerR = boxSize / 2;
        const innerRatio = 135 / 171;
        const innerR = outerR * innerRatio;
        const ringThickness = outerR - innerR;
        const distance = outerR - (ringThickness / 2);

        circle.style.setProperty('--percent', percent);
        dot.style.setProperty('--angle', percent * 3.6);
        dot.style.setProperty('--r', `${distance}px`);
        dot.style.opacity = 1;
        dot.style.visibility = "visible";
        strong.textContent = numberText;
    }

    function animateCircle(circleBox, targetPercent, duration = 1500, numDuration = 1000, delay = 0, callback) {
        const circle = circleBox.querySelector('.circle');
        const dot = circleBox.querySelector('.dot');
        const strong = circleBox.querySelector('.percent strong');
        const targetNumber = parseInt(strong.textContent.replace('%', ''), 10);

        const boxSize = circleBox.offsetWidth;
        const outerR = boxSize / 2;
        const innerRatio = 135 / 171;
        const innerR = outerR * innerRatio;
        const ringThickness = outerR - innerR;
        const distance = outerR - (ringThickness / 2);

        circle.style.setProperty('--percent', 0);
        dot.style.setProperty('--angle', 0);
        dot.style.setProperty('--r', `${distance}px`);
        dot.style.opacity = 0;
        dot.style.visibility = "hidden";
        strong.textContent = "0%";

        setTimeout(() => {
            let start = null;

            function step(timestamp) {
                if (!start) {
                    start = timestamp;
                    dot.style.visibility = "visible";
                    dot.style.opacity = 1;
                }

                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const numProgress = Math.min(elapsed / numDuration, 1);

                const current = progress * targetPercent;
                const currentNum = Math.floor(numProgress * targetNumber);

                circle.style.setProperty('--percent', current);
                dot.style.setProperty('--angle', current * 3.6);
                strong.textContent = currentNum + "%";

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    strong.textContent = targetNumber + "%";
                    if (callback) callback();
                }
            }

            requestAnimationFrame(step);
        }, delay);
    }

    function updateDotPosition(circleBox) {
        const circle = circleBox.querySelector('.circle');
        const dot = circleBox.querySelector('.dot');
        if (!circle || !dot) return;

        const percent = parseFloat(getComputedStyle(circle).getPropertyValue('--percent')) || 0;
        const boxSize = circleBox.offsetWidth;
        const outerR = boxSize / 2;
        const innerRatio = 135 / 171;
        const innerR = outerR * innerRatio;
        const ringThickness = outerR - innerR;
        const distance = outerR - (ringThickness / 2);

        dot.style.setProperty('--r', `${distance}px`);
        dot.style.setProperty('--angle', percent * 3.6);
    }

    // sc02
    (function () {
        const sc02 = document.querySelector('.sc02');
        if (!sc02) return;

        const boxes = sc02.querySelectorAll('.circle_box');
        const leftBox = boxes[0];
        const rightBox = boxes[1];

        setFixedCircle(leftBox, 12, "6%");

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class' &&
                    sc02.classList.contains('on')
                ) {
                    animateCircle(rightBox, 40, 1500, 1200, 3000);
                    observer.disconnect();
                }
            });
        });
        observer.observe(sc02, {
            attributes: true
        });

        window.addEventListener('resize', () => {
            setFixedCircle(leftBox, 12, "6%");
            boxes.forEach(updateDotPosition);
        });
    })();

    // sc04
    (function () {
        const sc04 = document.querySelector(".sc04");
        if (!sc04) return;
        if (window.innerWidth > 768) return;

        const box = sc04.querySelector('.mission_box');
        const dots = sc04.querySelectorAll('.mission_nav .dot');
        const items = box.querySelectorAll('li');
        if (!box || !items.length) return;

        const gap = parseInt(getComputedStyle(box).gap) || 0;
        const itemWidth = items[0].offsetWidth + gap;

        let currentIndex = 0;
        let startX, currentX, isDragging = false;


        function moveToIndex(index) {
            currentIndex = Math.max(0, Math.min(index, items.length - 1));
            box.style.transition = 'transform .5s ease';
            box.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        box.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            currentX = startX;
            box.style.transition = 'none';
        });

        box.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            box.style.transform = `translateX(${-(currentIndex * itemWidth) + diff}px)`;
        });

        box.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;

            if (diff < -40) currentIndex++;
            if (diff > 40) currentIndex--;

            moveToIndex(currentIndex);
        });

        moveToIndex(0);
    })();

    // sc05
    (function () {
        const sc05 = document.querySelector(".sc05");
        if (!sc05) return;

        const tracks = sc05.querySelectorAll(".track");

        tracks.forEach((track) => {
            const ul = track.querySelector("ul");
            if (!ul) return;
            const items = Array.from(ul.children);
            const totalWidth = items.reduce((acc, li) => acc + li.offsetWidth, 0);

            items.forEach((li) => ul.appendChild(li.cloneNode(true)));

            let x = 0;
            const speed = 0.5;
            const dir = 1;
            let running = false;

            function move() {
                if (!running) return;

                x += dir * speed;

                if (x >= totalWidth) x = 0;
                ul.style.transform = `translateX(${-x}px)`;

                requestAnimationFrame(move);
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (!running) {
                                running = true;
                                requestAnimationFrame(move);
                            }
                        } else {
                            running = false;
                        }
                    });
                }, {
                    threshold: 0.2
                }
            );

            observer.observe(sc05);
        });
    })();
});