const OverviewNav = [{
    title: 'IBOT',
    description: '든든한 파트너 챗봇',
  },
  {
    title: '인공지능 챗봇',
    description: '누구든 쉽게 할수 있어요!',
  },
  {
    title: '응대서비스',
    description: '24시간 365일 無중단',
  },
  {
    title: '즉각 대응 답변',
    description: '질문자의 의도 파악',
  },
  {
    title: '선택은 당신의 몫',
    description: '꼼꼼히 비교 하세요!',
  },
]

var overviewswiper = new Swiper('.overview_swiper', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  slidesPerView: 1,
  spaceBetween: 0,
  height: '100%',
  observer: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' + className + '"><span class="swiper-pagination-btn"><span class="swiper-pagination-description">' +
        OverviewNav[index].description +
        '</span><strong class="swiper-pagination-title">' +
        OverviewNav[index].title +
        '</strong><span class="swiper-pagination-progress"></span></span></span>'
      )
    }
  },
  breakpoints: { //반응형 조건 속성
    640: { //640 이상일 경우
      slidesPerView: 1, //레이아웃 2열
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  }
});

var productswiper = new Swiper('.product_swiper', {
  loop: false,
  slidesPerView: 'auto',
  spaceBetween: 0,
  slidesPerGroup: 1,
  height: '100%',
  observer: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: '.swiper-pagination', // 페이저 버튼을 담을 태그 설정
    clickable: true, // 버튼 클릭 여부
    type: 'bullets', // 버튼 모양 결정 "bullets", "fraction"
  },
});

var referenceswiper = new Swiper('.reference_swiper', {
  loop: false,
  autoplay: false,
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 30,
  height: '100%',
  observer: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: '.swiper-pagination', // 페이저 버튼을 담을 태그 설정
    clickable: true, // 버튼 클릭 여부
    type: 'bullets', // 버튼 모양 결정 "bullets", "fraction"
  },

  breakpoints: { //반응형 조건 속성

    1200: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
    },
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
    }
  }
});