let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
    console.log("resize");
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});
window.onresize = function () {
    setTimeout(function () {
        var content = document.querySelector(".navigator a.active");
        content.click();
    }, 500);
}

window.onload = function () {
    var header = document.querySelector('header');
    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');
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
    //var footerHeight = document.getElementById("footer").offsetHeight;
    var idx;
    var direction;
    // console.log("footerHeight" + footerHeight);


    function mouseEvent(idx) {
        //  console.log("animation~~~~~~~idx : " + idx);
        //  if(idx == 4 ) return ;
        // console.log("animation~~~~~~~animation : " + animation);
        //footerHeight = document.getElementById("footer").offsetHeight;
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

                    if (now == 1) {

                        // console.log("위로위로위로위로");
                        innerscroll(direction);
                        return false;

                    } else if (now == 2) {

                        // console.log("위로위로위로위로");
                        innerscroll2(direction);
                        return false;

                    } else if (now == 3) {

                        // console.log("아래로222222");
                        innerscroll3(direction);
                        return false;

                    } else if (now == 4) {

                        // console.log("아래로222222");
                        innerscroll4(direction);
                        return false;

                    } else if (now == 5) {

                        // console.log("아래로222222");
                        innerscroll5(direction);
                        return false;

                    } else if (now == 8) {

                        // console.log("아래로222222");
                        innerscroll6(direction);
                        return false;

                    } else {

                        move(direction);
                        fun_navi();
                        return false;
                    }

                }
                // console.log("위로now : " + now);
                return false;
            } else if ((delta > 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]" || idx == "[object MouseScrollEvent]")) || idx == "down") {
                // 아래로 
                // console.log("아래로");
                direction = "down";

                if (now < boxList.length) {
                    // console.log("아래로111111");


                    if (now == 1) {
                        // console.log("아래로222222");
                        innerscroll(direction);
                        return false;

                    } else if (now == 2) {

                        // console.log("아래로222222");
                        innerscroll2(direction);
                        return false;

                    } else if (now == 3) {

                        // console.log("아래로222222");
                        innerscroll3(direction);
                        return false;

                    } else if (now == 4) {

                        // console.log("아래로222222");
                        innerscroll4(direction);
                        return false;

                    } else if (now == 5) {

                        // console.log("아래로222222");
                        innerscroll5(direction);
                        return false;

                    } else if (now == 8) {

                        // console.log("아래로222222");
                        innerscroll6(direction);
                        return false;

                    } else {

                        move(direction);
                        fun_navi();
                        return false;
                    }
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
                if (now != 8) {
                    navigatorA[now].classList.add("active");
                }
                if (now == 0) {
                    header.classList.add("first");
                } else {
                    header.classList.remove("first");
                }

                if (now % 2 == 1 && now < 4 || now % 2 == 1 && now < 6 || now % 2 == 1 && now < 8) {
                    navigator.classList.add("other");
                    header.classList.add("other");
                } else {
                    navigator.classList.remove("other");
                    header.classList.remove("other");
                }
            }

            function innerscroll(direction) {

                $(".step02 section").scroll(function () {
                    // console.log("스크롤22:" +  $(".step02 section").scrollTop());
                    // console.log("스크롤33:" + $(".step02 section").innerHeight());
                    // console.log("스크롤344:" + $(".step02 section .inner").prop('scrollHeight'));


                });


                if (direction == "up") {
                    if ($(".step02.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step02.active .inner").scrollTop() + $(".step02.active .inner").innerHeight() >= $(".step02.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }


                // if($(".step02 section").scrollTop() + 615 == $(".step02 section .show").height()){
                //     console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                //     direction = "down";
                //     move(direction);
                //     fun_navi();
                //     return false;
                // }else if($(".step02 section").scrollTop() == 0){
                //     console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                //     direction = "up";
                //     move(direction);
                //     fun_navi();
                //     return false;
                // }



                animation = true;
                // $(".step02 section").scroll(function () { 
                //     console.log("위로22:" + $(this).scrollTop());
                //     console.log("위로33:" + $(".step02 section .show").height());

                //     if($(this).scrollTop() == 0){
                //         console.log("위로22:위로22:위로22:위로22:위로22:위로22:위로22:위로22:");
                //         direction = "up";
                //         move(direction);
                //         fun_navi();
                //         return false;
                //     }else{
                //         return false;
                //     }
                // });



            }


            function innerscroll2(direction) {


                // console.log("스크롤22:" +  $(".step03 section").scrollTop());
                // console.log("스크롤33:" + $(".step03 section").innerHeight());
                // console.log("스크롤344:" + $(".step03 section .inner").prop('scrollHeight'));

                if (direction == "up") {
                    if ($(".step03.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step03.active .inner").scrollTop() + $(".step03.active .inner").innerHeight() >= $(".step03.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }
                animation = true;

            }

            function innerscroll3(direction) {


                // console.log("스크롤22:" +  $(".step03 section").scrollTop());
                // console.log("스크롤33:" + $(".step03 section").innerHeight());
                // console.log("스크롤344:" + $(".step03 section .inner").prop('scrollHeight'));

                if (direction == "up") {
                    if ($(".step04.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step04.active .inner").scrollTop() + $(".step04.active .inner").innerHeight() >= $(".step04.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }
                animation = true;

            }

            function innerscroll4(direction) {


                // console.log("스크롤22:" +  $(".step03 section").scrollTop());
                // console.log("스크롤33:" + $(".step03 section").innerHeight());
                // console.log("스크롤344:" + $(".step03 section .inner").prop('scrollHeight'));

                if (direction == "up") {
                    if ($(".step05.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step05.active .inner").scrollTop() + $(".step05.active .inner").innerHeight() >= $(".step05.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }
                animation = true;

            }

            function innerscroll5(direction) {


                // console.log("스크롤22:" +  $(".step03 section").scrollTop());
                // console.log("스크롤33:" + $(".step03 section").innerHeight());
                // console.log("스크롤344:" + $(".step03 section .inner").prop('scrollHeight'));

                if (direction == "up") {
                    if ($(".step06.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step06.active .inner").scrollTop() + $(".step06.active .inner").innerHeight() >= $(".step06.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
                        direction = "down";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                }
                animation = true;

            }

            function innerscroll6(direction) {


                // console.log("스크롤22:" +  $(".step03 section").scrollTop());
                // console.log("스크롤33:" + $(".step03 section").innerHeight());
                // console.log("스크롤344:" + $(".step03 section .inner").prop('scrollHeight'));

                if (direction == "up") {
                    if ($(".step08.active .inner").scrollTop() == 0) {
                        // console.log("맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:맨위22:");
                        direction = "up";
                        move(direction);
                        fun_navi();
                        return false;
                    }
                } else if (direction == "down") {
                    if ($(".step08.active .inner").scrollTop() + $(".step08.active .inner").innerHeight() >= $(".step08.active .inner .scroll").prop('scrollHeight')) {
                        // console.log("맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33맨아래33");
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




    const to = location.hash;
    var hash2 = to.replace('#', '');
    console.log("hansh... " + hash2);
    if (hash2 == "mobwith") {
        mouseEvent(0);
    } else if (hash2 == "whatwedo") {
        mouseEvent(1);
    } else if (hash2 == "partner") {
        mouseEvent(2);
    } else if (hash2 == "location") {
        mouseEvent(3);
    }
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }



}
$(document).ready(function () {
    var click = function () {
        $('.btn-view').on('click', function () {
            $('#' + $(this).data("img") + '').addClass('active');
            $('body').css('overflow', 'hidden')
        })
        $('.img-target').on('click', function (e) {
            $(this).removeClass('active');
            $('body').css('overflow', '')
        });
        $(".firstArrow").on("click", function () {
            $("#firstArrow").trigger("click");
        });
        $(".mainAdBtn").on("click", function () {
            $(".adWrap").addClass('active')
        });
        $(".adClose").on("click", function () {
            $(".adWrap").removeClass('active')
        });
    }

    $(function () {
        click()
    });
});