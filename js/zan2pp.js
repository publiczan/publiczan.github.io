window.onload = function () {


    var header = document.querySelector('header');
    var menu = document.querySelector('.menu');

    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');

    for (var i = 0; i < navigatorA.length; i++) {
        (function (idx) {
            navigatorA[idx].onclick = function (e) {
                e.preventDefault();
                mouseEvent(idx);
            }
        })(i);
    }

    var mobileNav = document.querySelector('.menu');
    var mobileNav = document.querySelectorAll('.menu a');
    console.log("mobileNav : " + mobileNav);
    for (var i = 0; i < mobileNav.length; i++) {
        (function (idx) {
            mobileNav[idx].onclick = function (e) {
                e.preventDefault();
                mouseEvent(idx);
            }
        })(i);
    }

    let start_y, end_y;
    const box = document.querySelectorAll(".box")
    for (var i = 0; i < box.length; i++) {
        box[i].addEventListener('touchstart', touch_start);
        box[i].addEventListener('touchend', touch_end);
    }

    function touch_start(event) {
        start_y = event.touches[0].pageY;

        console.log("start_y : " + start_y);
    }

    function touch_end(event) {
        end_y = event.changedTouches[0].pageY;
        console.log("end_y : " + end_y);

        var result = start_y - end_y;
        if (result < 0) {
            result = result * -1;
        }
        console.log("result : " + result);
        if (result > 50) {
            if (start_y > end_y) {
                mouseEvent("down");
            } else {
                mouseEvent("up");
            }
        }
    }

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    var animation = false;
    //현재위치
    var now = "0";

    document.addEventListener("mousewheel", mouseEvent, true);
    //파이어폭스 
    document.addEventListener("DOMMouseScroll", mouseEvent, true);

    var boxList = document.getElementsByClassName("box");

    boxList[now].classList.add("active");
    console.log("boxList.length :: " + boxList.length);
    var animation = true;
    var top = 0;
    var delta = 0;
    var footerHeight = document.getElementById("footer").offsetHeight;
    var idx;
    console.log("footerHeight" + footerHeight);


    function mouseEvent(idx) {

        footerHeight = document.getElementById("footer").offsetHeight;
        if (animation == true) {
            animation = false;


            if (!event) event = window.event;
            if (event.wheelDelta) {

                delta = -event.wheelDelta / 120;
                if (window.opera) delta = -delta;

            } else if (event.detail) {

                delta = event.detail / 3;

            }

            console.log("delta : " + delta);
            console.log("start~~~~~~~now : " + now);
            console.log("idx~~~~~~~now : " + idx);
            if ((now >= 3 && delta == 1) || idx == "down") {

            } else {
                boxList[now].classList.remove("active");
            }

            // 위로 
            if ((delta < 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "up") {
                console.log("위로");

                if (now >= 0) {

                    if (now != 0) {
                        now--;
                    }

                    var locate = boxList[now].offsetTop;

                    move(locate);

                }
                console.log("now : " + now);

            } else if ((delta > 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "down") {
                // 아래로 
                console.log("아래로");

                if (now < boxList.length) {

                    if (now < boxList.length - 1) {
                        now++;
                    }

                    var locate = boxList[now].offsetTop;

                    if (now == boxList.length - 1) {
                        locate = boxList[now - 1].offsetTop;
                        locate = locate + footerHeight;
                    }

                    move(locate);
                }
                console.log("now : " + now);

            } else {

                console.log("idx!!!!!!!!!!!!!!!! : " + idx);
                now = idx;
                locate = boxList[idx].offsetTop;

                move(locate);
            }

            for (var i = 0; i < navigatorA.length; i++) {
                navigatorA[i].classList.remove("active");
            }

            if (now != 4) {
                navigatorA[now].classList.add("active");
            }

            if (now == 0) {
                header.classList.add("other");
            } else {
                header.classList.remove("other");
            }
        }
    }

    function move(locate) {
        console.log("locate : " + locate);
        var locateSum = 0;
        locateSum = locateSum - locate;
        console.log("locateSum : " + locateSum);

        var content = document.querySelector(".content");
        content.style.setProperty("transform", "translate3d(0px, " + locateSum + "px, 0px)");

        boxList[now].classList.add("active");

        setTimeout(function () {
            animation = true;
            console.log('finish!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }, 1000);

    }
    (function () {
        var burger = document.querySelector('.lineWrap'),
            header = document.querySelector('header');
        burger.onclick = function () {
            header.classList.toggle('open');
        }

    }());

}

$(document).ready(function () {
    $(".navigator h1").on("click", function () {
        $(this).siblings("ul").find("li").removeClass("active");
    });
    $(".navigator a").on("click", function () {
        $(this).parent("li").addClass("active").siblings().removeClass("active");
        $(this).closest("header").removeClass("open");
    });
    $('.type-text01').each(function () {
        var items = $(this).attr('title') + ';' + $(this).text();
        $(this).empty().attr('title', '').teletype({
            text: $.map(items.split(';'), $.trim),
            typeDelay: 50,
            backDelay: 50,
            cursor: '▋',
            delay: 80000,
            preserve: false,
            prefix: '[WEB PORTFOLIO!]#',
            loop: 0
        });
    });

    $('.type-text02').each(function () {
        var items = $(this).attr('title') + ';' + $(this).text();
        $(this).empty().attr('title', '').teletype({
            text: $.map(items.split(';'), $.trim),
            typeDelay: 50,
            backDelay: 50,
            cursor: '▋',
            delay: 80000,
            preserve: false,
            prefix: '[THANK]#',
            loop: 0
        });
    });

    var $tabButtonItem = $('#tab-button li'),
        $tabSelect = $('#tab-select'),
        $tabContents = $('.tabcon'),
        activeClass = 'active';

    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(':first').hide();

    // button
    $tabButtonItem.find('a').on('click', function (e) {
        var target = $(this).attr('href');

        $tabButtonItem.removeClass(activeClass);
        $(this).parent().addClass(activeClass);
        $tabSelect.val(target);
        $tabContents.hide();
        $(target).show();
        e.preventDefault();
    });

    // select
    $tabSelect.on('change', function () {
        var target = $(this).val(),
            targetSelectNum = $(this).prop('selectedIndex');

        $tabButtonItem.removeClass(activeClass);
        $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
        $tabContents.hide();
        $(target).show();
    });


    $(".step03 .modalBtn").on("click", function () {
        $(this).addClass('active').siblings().removeClass('active');

        var checkName = $(this).attr('data-name');
        $("#" + checkName).addClass('active').siblings().removeClass('active');
        $("#" + checkName).closest('.modalWrap').fadeIn();

        $(".modalWrap.active").fadeIn();
        $(".modalWrap .close").on("click", function () {
            $(".modalWrap").fadeOut();
        });
        $(".modalWrap").on("click", function () {
            $(".modalWrap").fadeOut();
        });
    });
});