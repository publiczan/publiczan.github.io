var nav = document.querySelector('.nav')
var scroll = document.querySelector('.scroll-left')
var page = document.querySelectorAll('.page')
var pageContainer = document.querySelector('.page-container')
var footer = document.querySelector('.footer')
var animate = false;
var curFullPageIdx = 0;
var winHeight = window.innerHeight

for (i = 0; i < page.length; i++) {
    var a = document.createElement('a')
    var div = document.createElement('div')
    a.setAttribute('href', '#' + i)
    a.classList.add('a')
    a.appendChild(div)
    scroll.appendChild(a)


    if (i == page.length - 1) {
        page[i].style.height = '220px'
    } else {
        page[i].style.height = winHeight + 'px'
    }
}
var anchor = document.querySelectorAll('.a')
window.addEventListener('resize', function () {
    winHeight = window.innerHeight
    pageContainer.style.height = (winHeight * page.length) + 'px'
    for (i = 0; i < page.length; i++) {
        page[i].style.height = winHeight + 'px'
    }
}, true)
pageContainer.style.height = (winHeight * page.length) + 'px'

function blackClass() {
    if (curFullPageIdx == 0 || curFullPageIdx == 2) {
        nav.classList.add('black')
    } else {
        nav.classList.remove('black')
    }

    cur = curFullPageIdx;

    anchor[cur].classList.add('on')
    page[cur].classList.add('on')
    page[cur].style.zIndex = '1'
}
blackClass()

function indexDelete() {
    for (i = 0; i < page.length; i++) {
        page[i].style.zIndex = 0;
        anchor[cur].classList.remove('on')
        page[i].classList.remove('on')
    }
}

function pageUp(cur) {
    if (cur > 0) {
        animate = true
        var curpage = document.querySelector('#page' + cur)
        curFullPageIdx = parseInt(cur) - 1
        curpage.classList.add('pageup')
        prev = curpage.previousElementSibling
        prev.classList.add('slideup')
        indexDelete()
        pageContainer.style.transform = 'translateY(-' + (winHeight * (parseInt(cur) - 1)) + 'px)'
        curpage.addEventListener('animationend', function () {
            curpage.classList.remove('pageup')
            prev.classList.remove('slideup')
            animate = false
            blackClass()
        })
    }
}

function pageDown(cur) {
    if (page.length - 1 > cur) {
        animate = true
        var curpage = document.querySelector('#page' + cur)
        curFullPageIdx = parseInt(cur) + 1
        curpage.classList.add('pagedown')
        next = curpage.nextElementSibling
        next.classList.add('slidedown')

        if (page.length - 2 > cur) {
            indexDelete()
            pageContainer.style.transform = 'translateY(-' + (winHeight * (parseInt(cur) + 1)) + 'px)'
        } else {
            pageContainer.style.transform = 'translateY(-' + ((winHeight * (parseInt(cur))) + 220) + 'px)'
        }

        curpage.addEventListener('animationend', function () {
            curpage.classList.remove('pagedown')
            next.classList.remove('slidedown')
            animate = false
            blackClass()
        })
    }
}

window.addEventListener('mousewheel', function (e) {
    var hash = curFullPageIdx;

    if (animate != true) {
        var bIsUp = (e.deltaY > 0 || e.wheelDelta < 0);

        if (bIsUp) {
            pageDown(hash)
        } else {
            pageUp(hash)
        }
    }
}, false)

for (i = 0; i < anchor.length; i++) {
    anchor[i].addEventListener('click', function () {
        for (j = 0; j < anchor.length; j++) {
            anchor[j].classList.remove('on')
        }
        thi = parseInt(this.hash.replace('#', ''))
        if (this.hash == '#0' || this.hash == '#2') {
            nav.classList.add('black')
        } else {
            nav.classList.remove('black')
        }
        anchor[thi].classList.add('on')
        page[thi].classList.add('on')
        page[thi].style.zIndex = '1'
        if (thi == anchor.length - 1) {
            pageContainer.style.transform = 'translateY(-' + ((winHeight * (parseInt(thi - 1))) + 220) + 'px)'
        } else {
            pageContainer.style.transform = 'translateY(-' + (winHeight * (parseInt(thi))) + 'px)'
        }

        this.classList.add('on')
    })
}


$(document).ready(function () {
    
    $("#btn-temp_01").click(function () {
        $("#phone-container img").hide();
        $("#temp-img_01").show();
    });
    $("#btn-temp_02").click(function () {
        $("#phone-container img").hide();
        $("#temp-img_02").show();
    });
    $("#btn-temp_03").click(function () {
        $("#phone-container img").hide();
        $("#temp-img_03").show();
    });
    $("#btn-temp_04").click(function () {
        $("#phone-container img").hide();
        $("#temp-img_04").show();
    });
    $("#btn-temp_05").click(function () {
        $("#phone-container img").hide();
        $("#temp-img_05").show();
    });
    $("#btn-advise_01").click(function () {
        $("#img-service-container img").hide();
        $("#advise-img_01").show();
    });
    $("#btn-advise_02").click(function () {
        $("#img-service-container img").hide();
        $("#advise-img_02").show();
    });
    $("#btn-advise_03").click(function () {
        $("#img-service-container img").hide();
        $("#advise-img_03").show();
    });

    $(".btn-box > li").click(function () {

        var id = $(this).attr("id");

        $(".btn-box li").removeClass("btn_on");

        $(".btn-box > li").each(function () {
            if ($(this).attr("id") == id) {
                $(this).addClass("btn_on");
            }
        });

    });

    $('.accordion> li').on('click', function () {

        if ($(this).hasClass('on')) {
            slideUp();
        } else {
            slideUp();
            $(this).addClass('on').next().slideDown();
        }

        function slideUp() {
            $('.accordion > li').removeClass('on').next().slideUp();
        };
    })


})