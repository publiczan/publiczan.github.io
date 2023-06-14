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
    var header = document.querySelector('.btn-fx');
    var adWrap = document.querySelector('.adWrap');
    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');
    var btnfx = document.querySelector('.btn-fx');
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
                if (now == 0) {
                    btnfx.classList.add("first");
                } else {
                    btnfx.classList.remove("first");
                }
                if (now != 7) {
                    navigatorA[now].classList.add("active");
                }
                if (now == 6) {
                    navigator.classList.add('last')
                    btnfx.classList.add('last')
                    adWrap.classList.remove('active')
                } else {
                    btnfx.classList.remove('last')
                }
                if (now == 7) {
                    navigator.classList.add('last')
                    btnfx.classList.add('last')
                    adWrap.classList.remove('active')
                }
                if (now == 1 || now == 3 || now == 4 || now == 6 || now == 7) {
                    navigator.classList.add("other");
                    btnfx.classList.add("other");
                } else {
                    navigator.classList.remove("other");
                    btnfx.classList.remove("other");
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
        $('.btn-top').on("click", function (e) {
            $("#scrolltop").trigger("click");
        });
        $('.btn-view').on('click', function () {
            $('#' + $(this).data("img") + '').addClass('active');
            $('body').css('overflow', 'hidden')
        })
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

        $('.tab-hd ul li').on('click', function (e) {
            e.preventDefault();
            $(".tab-hd ul li").removeClass("active");
            var index = $(this).addClass("active").index();
            $(".tab-con >div").removeClass("active");
            $(".tab-con >div").eq(index).addClass("active")
        });
        //tabBox 이벤트

    }

    $(function () {
        click()
    });
});