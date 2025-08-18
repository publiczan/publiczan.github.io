function setViewHt() {
    const vh = window.innerHeight * 0.01;
    const btnHeight = 50;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.querySelectorAll('section').forEach(el => {
        el.style.height = `${vh * 100 - btnHeight}rem`;
    });
}
setViewHt();
window.addEventListener('resize', setViewHt);


document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.wrap');
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const logo = document.querySelector('header h1 a');
    const topBtn = document.querySelector('.btn-top');
    const navItems = document.querySelectorAll('nav li');
    const hdItems = document.querySelectorAll('header li');

    // nav 적용
    const navTargetSections = Array.from(sections);
    const scrollSections = [...sections].concat(footer ? [footer] : []);

    let currentIndex = 0;
    let isAnimating = false;
    const maxIndex = scrollSections.length - 1;

    // 상단버튼
    const updateTopButton = () => {
        if (currentIndex > 0) {
            $('.btn-top').fadeIn(300); // 보이기
        } else {
            $('.btn-top').fadeOut(300); // 숨기기
        }
    };

    // .main > other제어
    const toggleOtherClass = () => {
        const mainOn = document.querySelector('section.sc04.on') !== null;
        wrap.classList.toggle('other', mainOn);
    };

    // nav,header 클래스 제어
    const commonhdnv = (index) => {
        const currentSection = scrollSections[index];
        const isMainOn = currentSection.classList.contains('main');
        navItems.forEach((li, i) => li.classList.toggle('on', !isMainOn && i === index - 1));
        hdItems.forEach((li, i) => li.classList.toggle('on', !isMainOn && i === index - 1));
    };

    // header 
    const scClick = (items) => {
        items.forEach((li, i) => {
            li.addEventListener('click', () => {
                const realIndex = i + 1;
                if (!isAnimating && currentIndex !== realIndex) {
                    scrollToIndex(realIndex);
                }
            });
        });
    };

    scClick(hdItems);
    scClick(navItems);

    // 네비상태
    const updateNav = () => {
        const currentSection = scrollSections[currentIndex];
        const navIndex = navTargetSections.indexOf(currentSection);
        if (navIndex !== -1) {
            navItems.forEach((li, i) => li.classList.toggle('on', i === navIndex));
        }
    };

    // seroll
    const smoothScrollTo = (targetY, duration = 800) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 0.5 * (1 - Math.cos(Math.PI * progress));
            window.scrollTo(0, startY + distance * ease);
            if (progress < 1) requestAnimationFrame(animate);
            else isAnimating = false;
        };

        requestAnimationFrame(animate);
    };

    // 풀페이지 
    const scrollToIndex = (index) => {
        isAnimating = true;
        scrollSections.forEach((sec, i) => sec.classList.toggle('on', i === index));

        const currentSection = scrollSections[index];
        const navIndex = navTargetSections.indexOf(currentSection);
        const isMain = currentSection.classList.contains('main');

        navItems.forEach((li, i) => li.classList.toggle('on', i === navIndex && !isMain));
        hdItems.forEach((li, i) => li.classList.toggle('on', i === navIndex && !isMain));

        const targetY = currentSection.offsetTop;
        smoothScrollTo(targetY);

        currentIndex = index;
        updateTopButton();
        updateNav();
        toggleOtherClass();
        commonhdnv(index);
    };

    const handleScroll = (direction) => {
        if (isAnimating) return;
        if (direction === 'down' && currentIndex < maxIndex) {
            scrollToIndex(currentIndex + 1);
        } else if (direction === 'up' && currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    // Wheel
    window.addEventListener('wheel', (e) => {
        if (document.querySelector('.mdBox.on')) return;

        const scrollEl = e.target.closest('.scroll-area');

        if (scrollEl) {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrollEl;
            const deltaY = e.deltaY;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((deltaY < 0 && !isAtTop) || (deltaY > 0 && !isAtBottom)) {
                return; // 내부 스크롤만 허용
            }
        }


        // 풀페이지 스크롤
        e.preventDefault();
        const direction = e.deltaY > 0 ? 'down' : 'up';
        handleScroll(direction);
    }, {
        passive: false
    });
    let startY = 0;
    window.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, {
        passive: false
    });
    window.addEventListener('touchmove', e => {

        if (document.querySelector('.mdBox.on')) return;
        const scrollEl = e.target.closest('.scroll-area');
        if (scrollEl) {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrollEl;
            const currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if ((deltaY > 0 && !isAtTop) || (deltaY < 0 && !isAtBottom)) {
                return;
            }
        }
        e.preventDefault();
    }, {
        passive: false
    });
    window.addEventListener('touchend', e => {
        const endY = e.changedTouches[0].clientY;
        const delta = endY - startY;

        const scrollEl = e.target.closest('.scroll-area');
        if (scrollEl) {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrollEl;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            // 내부 스크롤 중이면 풀페이지 이동 막기
            if ((delta > 0 && !isAtTop) || (delta < 0 && !isAtBottom)) {
                return;
            }
        }

        if (delta > 30) handleScroll('up');
        else if (delta < -30) handleScroll('down');
    });

    topBtn.addEventListener('click', () => scrollToIndex(0));
    logo.addEventListener('click', () => scrollToIndex(0));

    window.addEventListener('DOMContentLoaded', () => {
        wrap.classList.add('other');
    });
    window.addEventListener('load', () => {
        scrollToIndex(0);
    });

    updateTopButton();
    updateNav();
});