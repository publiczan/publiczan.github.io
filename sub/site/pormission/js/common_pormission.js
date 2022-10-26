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
            if ((now >= 2 && delta == 1) || idx == "down") {

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

            if (now == 0) {
                header.classList.add("other");
            } else {
                header.classList.remove("other");
            }
            if (now == 3) {
                header.classList.add("footer");
            } else {
                header.classList.remove("footer");
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

}


$(function () {
    function step02Animation(idx) {
        $(".type-list").find("li").removeClass("active");
        $(".type-list-detail").find(".detail-list").removeClass("active");
        $(".type-list li").eq(idx).addClass("active");
        $(".type-list-detail").find(".detail-list").siblings().removeClass("active");
        if (idx == 0) {
            $(".type-list-detail").find(".detail-list").eq(0).addClass("active");
        } else if (idx == 1) {
            $(".type-list-detail").find(".detail-list").eq(1).addClass("active");
        } else if (idx == 2) {
            $(".type-list-detail").find(".detail-list").eq(2).addClass("active");
        } else if (idx == 3) {
            $(".type-list-detail").find(".detail-list").eq(3).addClass("active");
        }

    }
    step02Rolling();

    function step03Animation(idx) {
        $(".step03").find("dl").removeClass("active");
        $(".step03").find("img").removeClass("active");
        $(".step03 dl").eq(idx).addClass("active");
        $(".step03").find("img").siblings().removeClass("active");
        if (idx == 0) {
            $(".step03").find("img").eq(0).addClass("active");
        } else if (idx == 1) {
            $(".step03").find("img").eq(1).addClass("active");
        }
    }
    step03Rolling();

    function step02Rolling() {
        var step02Length = 4;
        var conNum = 0;
        var conrollingSpeed = 2000;

        function step02Time() {
            if (conNum < (step02Length - 1)) {
                conNum++;
            } else {
                conNum = 0;
            }
            step02Animation(conNum);
        }

        step02_rolling_timer = setInterval(step02Time, conrollingSpeed);
        $(".type-list li").each(function (index) {
            $(this).click(function () {
                clearInterval(step02_rolling_timer);
                condNum = index;
                step02Animation(condNum);
                step02_rolling_timer = setInterval(step02Time, 2000);
                return false;
            });
        });
    }

    function step03Rolling() {
        var step03Length = 2;
        var conNum = 0;
        var conrollingSpeed = 2000;

        function step03Time() {
            if (conNum < (step03Length - 1)) {
                conNum++;
            } else {
                conNum = 0;
            }
            step03Animation(conNum);
        }

        step03_rolling_timer = setInterval(step03Time, conrollingSpeed);
        $(".step03 dl").each(function (index) {
            $(this).click(function () {
                clearInterval(step03_rolling_timer);
                condNum = index;
                step03Animation(condNum);
                step03_rolling_timer = setInterval(step03Time, 2000);
                return false;
            });
        });
    }
    $('.modalbtn').on("click", function (e) {
        e.preventDefault()

        var checkName = $(this).attr('data-name');
        $("#" + checkName).addClass('active').siblings().removeClass('active');
        $('.dim').addClass('active')

    });
    $('.ico-modalnone').on("click", function () {
        $('.modal').removeClass('active')
        $('.dim').removeClass('active')
    });
    $('.dim').on('click', function () {
        $('.dim').removeClass('active')
        $('.modal').removeClass('active');
    });
    //dim
});