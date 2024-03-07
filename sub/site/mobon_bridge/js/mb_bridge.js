function adjust_height() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.onresize = function () {
    setTimeout(function () {
        var content = document.querySelector(".navigator a.active");
        content.click();

        adjust_height();

    }, 500);
}


window.onload = function () {
    adjust_height()
    var header = document.querySelector('header');
    var adWrap = document.querySelector('.adWrap');
    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');
    var btnfx = document.querySelector('.btn-fx');

    var utube_ifr = document.querySelectorAll(".utube");
    var utube_link = ["ofeDoAxsklE", "V23s65LJQKg", "fA9mSfNN0UE", "yal_vthlgaI", "9WLO9K3mtZ0", "d3avaZVwhlU"];
    for (let i = 0; i < utube_ifr.length; i++) {
        utube_ifr[i].src = "https://www.youtube.com/embed/" + utube_link[i];
    }

    for (var i = 0; i < navigatorA.length; i++) {
        (function (idx) {
            navigatorA[idx].onclick = function (e) {
                e.preventDefault();
                // console.log("fdsfsdf" + idx);
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

        // console.log("start_y : " + start_y);
    }

    function touch_end(event) {
        end_y = event.changedTouches[0].pageY;
        // console.log("end_y : " + end_y);

        var result = start_y - end_y;
        if (result < 0) {
            result = result * -1;
        }
        // console.log("result : " + result);
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
    // console.log("boxList.length :: " + boxList.length);
    var animation = true;
    var top = 0;
    var delta = 0;
    var footerHeight = document.getElementById("footer").offsetHeight;
    var idx;
    var direction;
    // console.log("footerHeight" + footerHeight);


    function mouseEvent(idx) {
        //  console.log("animation~~~~~~~idx : " + idx);
        //  if(idx == 4 ) return ;
        // console.log("animation~~~~~~~animation : " + animation);
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

            //  console.log("delta : " + delta);
            // console.log("start~~~~~~~now : " + now);
            // console.log("idx~~~~~~~now : " + idx);
            // if((now >= 4 &&  delta >= 1) ||  idx == "down"){

            // }else{
            //     boxList[now].classList.remove("active");
            // }

            // 위로 
            if ((delta < 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]" || idx == "[object MouseScrollEvent]")) || idx == "up") {
                // console.log("위로");
                direction = "up";
                if (now >= 0) {

                    innerscroll(direction);
                    return false;
                }
                // console.log("위로now : " + now);
                return false;
            } else if ((delta > 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]" || idx == "[object MouseScrollEvent]")) || idx == "down") {
                // 아래로 
                // console.log("아래로");
                direction = "down";

                if (now < boxList.length) {
                    // console.log("아래로111111");

                    innerscroll(direction);
                    return false;
                }
                // console.log("아래로now : " + now);
                return false;
            } else {

                // console.log("idx!!!!!!!!!!!!!!!! : " + idx);

                now = idx;

                move(now);
                fun_navi();
                return false;
            }


            function fun_navi() {
                for (var i = 0; i < navigatorA.length; i++) {
                    navigatorA[i].classList.remove("active");
                }
                if (now != 9) {
                    navigatorA[now].classList.add("active");
                }
                if (now == 0) {
                    header.classList.add("first");
                } else {
                    header.classList.remove("first");
                }
                if (now == 8) {
                    header.classList.add("last");
                    adWrap.classList.remove('active')
                } else {
                    header.classList.remove("last");
                }
                if (now == 9) {
                    header.classList.add('last')
                    adWrap.classList.remove('active')
                }
                if (now == 2 || now == 4 || now == 6 || now == 8 || now == 9) {
                    navigator.classList.add("other");
                    header.classList.add("other");
                } else {
                    navigator.classList.remove("other");
                    header.classList.remove("other");
                }
            }

            function innerscroll(direction) {
                if (direction == "up") {
                    if ($(".step0" + now + ".active .inner").scrollTop() == 0) {
                        //console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step0" + now + ".active .inner").scrollTop() + $(".step0" + now + ".active .inner").innerHeight() >= $(".step0" + now + ".active .inner").prop('scrollHeight')) {
                        //console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }

                animation = true;
            }
        }
    }



    function move(direction) {
        // console.log("directiondirectiondirection" + direction);

        // if((now >= 4 &&  delta >= 1) ||  idx == "down"){

        // }else{
        //     boxList[now].classList.remove("active");
        // }

        for (var i = 0; i < box.length; i++) {
            boxList[i].classList.remove("active");
        }



        if (direction == "up") {

            if (now != 0) {
                now--;
                // console.log("위로now--" + now);
            }

            var locate = boxList[now].offsetTop;


        } else if (direction == "down") {

            if (now < boxList.length - 1) {
                now++;
                // console.log("아래로now++" + now);
            }

            var locate = boxList[now].offsetTop;
            if (now == boxList.length - 1) {
                locate = boxList[now - 1].offsetTop;
                locate = locate + footerHeight;
            }


        } else {
            locate = boxList[direction].offsetTop;
        }



        // console.log("locate : " + locate);
        var locateSum = 0;
        locateSum = locateSum - locate;
        // console.log("locateSum : " + locateSum);

        var content = document.querySelector(".content");
        content.style.setProperty("transform", "translate3d(0px, " + locateSum + "px, 0px)");

        boxList[now].classList.add("active");

        setTimeout(function () {
            animation = true;
            // console.log('finish!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }, 1000);

    }

}
$(document).ready(function () {
    var click = function () {
        $('.btn-top').on("click", function () {
            $("#scrolltop").trigger("click");
        });
        $('.btn-view').on('click', function () {
            $('#' + $(this).data("img") + '').addClass('active');
            $('body').css('overflow', 'hidden')
        })
        $('.img-target .close-btn').on('click', function (e) {
            $(this).closest('.img-target').removeClass('active');
            $('body').css('overflow', '')
        });
        $(".firstArrow").on("click", function () {
            $("#firstArrow").trigger("click");
        });
        $(".mainAdBtn").on("click", function () {
            $(".adWrap").addClass('active')
            $('body').css('overflow', 'hidden')
        });
        $(".adClose").on("click", function () {
            $(".adWrap").removeClass('active')
        });
        $(".agreebtn").on("click", function () {
            $(this).parents('.checkBox').next('div').toggleClass('active')
        });
        $(".privacybtn").on("click", function () {
            $(this).parents('.checkBox').next('div').toggleClass('active')
        });


    }

    $(function () {
        click()
    });

    $(function () {
        $('#slider01').slick({
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            centerMode: true,

        });
        $('#slider02').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 1500,
            arrows: true,
            dots: true,
            pauseOnHover: false,
            centerMode: false,

            responsive: [{
                    breakpoint: 1260,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }
            ]

        });

        $('.pop_slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: true,
            draggable: true,
            autoplay: true,
            autoplaySpeed: 2000,
            variableWidth: false,
            centerMode: false
        });
    })
});