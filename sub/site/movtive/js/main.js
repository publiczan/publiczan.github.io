function adjust_height() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.onload = function () {
    adjust_height()

    var header = document.querySelector('header');
    var menu = document.querySelector('.menu');

    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');
    var scrolldown = document.querySelectorAll('.scrolldown');
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
    console.log("boxList.length :: " + boxList.length);
    var animation = true;
    var top = 0;
    var delta = 0;
    //var footerHeight = document.getElementById("footer").offsetHeight;
    var idx;
    console.log("footerHeight" + footerHeight);


    function mouseEvent(idx) {
        //console.log("idx : " + idx);
        //footerHeight = document.getElementById("footer").offsetHeight;
        if (animation == true) {
            animation = false;


            if (!event) event = window.event;
            if (event.wheelDelta) {

                delta = -event.wheelDelta / 120;
                if (window.opera) delta = -delta;

            } else if (event.detail) {

                delta = event.detail / 4;

            }

            // console.log("delta : " + delta);
            // console.log("start~~~~~~~now : " + now);
            // console.log("idx~~~~~~~now : " + idx);
            if ((now >= 2 && delta == 1) || idx == "down") {

            } else {
                boxList[now].classList.remove("active");
            }

            // 위로
            if ((delta < 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "up") {
                // console.log("위로");

                if (now >= 0) {

                    if (now != 0) {
                        now--;
                    }

                    var locate = boxList[now].offsetTop;

                    move(locate);

                }
                // console.log("now : " + now);

            } else if ((delta > 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "down") {
                // 아래로
                // console.log("아래로");

                if (now < boxList.length) {

                    if (now < boxList.length - 1) {
                        now++;
                    }

                    var locate = boxList[now].offsetTop;

                    // if (now == boxList.length - 1) {
                    //     locate = boxList[now - 1].offsetTop;
                    //     locate = locate + footerHeight;
                    // }

                    move(locate);
                }
                // console.log("now : " + now);

            } else {

                // console.log("idx!!!!!!!!!!!!!!!! : " + idx);
                now = idx;
                locate = boxList[idx].offsetTop;

                move(locate);
            }

            if (now != 4) {
                top = now * 79;
                // console.log("top!!!!!!!!!!!!!!!! : " + now);
                var circle = document.querySelector(".circle");
                var down = document.querySelector(".scrolldown");
                circle.style.setProperty("top", top + "px");
            }

            for (var i = 0; i < navigatorA.length; i++) {
                navigatorA[i].classList.remove("active");
                circle.classList.remove("active");
                header.classList.remove("other");
                navigator.classList.remove("other");
            }
            if (now == 0) {
                header.classList.add("first");
            } else {
                header.classList.remove("first");
            }
            if (now == 1 || now == 2) {
                navigator.classList.add("other");
                header.classList.add("other");
            } else {
                header.classList.remove("other");
                navigator.classList.remove("other");
            }
            if (now != 4) {
                navigatorA[now].classList.add("active");
                circle.classList.add("active");

            }
            if (now > 1) {
                down.style.display = 'none';
            } else {
                down.style.display = 'block';
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

    $('.modalbtn').on("click", function (e) {
        e.preventDefault()

        var checkName = $(this).attr('data-name');
        $("#" + checkName).addClass('active').siblings().removeClass('active');
        $('.dim').addClass('active')

    });
});