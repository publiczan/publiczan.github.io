//공통 js start
function copied_del() {
    $('body').append('<span class="copied">삭제 되었습니다</span>')
    $('.copied').css('opacity', '1')
    setTimeout(function () {
        $('.copied').css('opacity', '0').remove()
    }, 400);
}

function copied_save() {
    $('body').append('<span class="copied">저장 되었습니다</span>')
    $('.copied').css('opacity', '1')
    setTimeout(function () {
        $('.copied').css('opacity', '0').remove()
    }, 400);
}
var loading = function () {
    $(window).load(function () {
        loading();
        // setInterval(function () {
        //     $('#loadingBg').addClass('complete')
        // }, 2000)
    })

    function loading() {
        for (var i = 0; i < 8; i++) {
            $("#loadingBg").append('<div class="loading-con"><div class="item"></div></div>');
        }

    };

}

var nav = function () {
    $('.btn-hamburger').on('click', function () {
        $('.all-wrap').toggleClass('active')
    });
    //nav 전체 아이콘클릭 이벤트

    $('.all-menuWrap .btn-setting').on('click', function () {
        $('.gnb-sub-m').addClass('active')
    });
    //전체메뉴화면 환경설정 클릭이벤트

    $('.btn-prev.frist').on('click', function () {
        $('.gnb-sub-m').removeClass('active')
        $('.MDwrap').removeClass('active')
    });
    //전체 header > 이전버튼 이벤트

    $('.allmenu-gnb >ul>li').on('click', function () {
        $(this).children('a').nextAll('.depth').addClass('on');
    });
    //전체메뉴화면 환경설정 메뉴 > 하위메뉴 클릭이벤트

    $('.kakao-push').on('click', function () {
        $(this).nextAll('.depth').addClass('on');
    });
    //전체메뉴화면 환경설정 카카오푸시 버튼 클릭 이벤트 

    $('.depth .header .btn-prev').on('click', function (e) {
        e.preventDefault()
        $(this).closest('.depth').removeClass('on');
        return false;
    });
    //전체메뉴화면 환경설정 하위메뉴 이전버튼

    $('nav > ul > li').on('click', function () {
        $(this).toggleClass('on').siblings().removeClass('on')
    });
    //nav 메뉴 이미지onoff 
}

//알림이벤트
var alarmeev = function () {
    $(document).ready(function () {
        function has() {
            if ($('.btn-drag-del').hasClass('on') == true) {
                $('.alarm-del').css('display', 'block')
            } else {
                $('.alarm-del').css('display', 'none')
            }
        }
        $(".listItem").on('scroll', function () {
            //scroll()
            if ($(this).scrollLeft() == 0) {
                $(this).find('.btn-drag-del').removeClass('on')
                $(this).find('.ico-arrow-r-bk').show()
            } else {
                $(this).find('.btn-drag-del').addClass('on')
                $(this).find('.ico-arrow-r-bk').hide()
            }
            has()
        });

        $('.btn-drag-del').on('click', function () {
            var delbtn = $('.header .alarm-del')
            //$('.alarm-del').css('display', 'none')
            $(this).closest('.listItem').remove()
            copied_del();
            has()
        })
        $('.alarmmd-del').on('click', function () {
            $('.listItem').remove()
            has()
        })
    });
}

var timeev = function () {
    $(document).ready(function () {
        var deg = 0;

        function scroll3d() {
            var $scroller = $(".picker-scroller");
            var $clone = $(".clone-scroller");
            var $cloneScrollTop = $(".clone-scroller").scrollTop();
            var $options = $scroller.find(".option");
            var $optionsNo = $options.length;
            var $cloneHeight = lineHeight * $optionsNo;
            var totalDeg = 22.5 * $optionsNo;
            var unit = totalDeg / $cloneHeight * $cloneScrollTop;
            //    $(".output").html(totalDeg + "/" + $cloneHeight + "/" + $cloneScrollTop);
            $scroller.css("-webkit-transform", "translateZ(-90px) rotateX(" + unit + "deg)");

            var eIndex = Math.round(unit / 22.5);
            $(".output").html(eIndex);
            $($options).hide();
            $($options.get(eIndex)).show();
            for (i = eIndex; i < (eIndex + 7); i++) {
                $($options.get(i)).show();
            }
            if (eIndex > 7) {
                for (i = eIndex; i >= (eIndex - 7); i--) {
                    $($options.get(i)).show();
                }
            } else {
                for (i = 0; i < 8; i++) {
                    $($options.get(i)).show();
                }
            }

        }
        // var $scroller = $(".picker-scroller");

        $(".timeList").on('scroll', function () {
            scroll3d()
        });


    });
}

//클릭이벤트
var clickcommon = function () {
    var combobtn = $('.cb-btn')

    combobtn.on('click', function (e) {
        e.preventDefault();
        $(this).next().toggleClass('active');
        combobtn.not($(this)).next().removeClass('active');
    })

    $('.cb-detail ul li').on('click', function () {
        $(this).addClass('on').closest('.cb-detail').removeClass('active')
    })
    //comboBox 이벤트

    $('.tab-hd ul li').on('click', function (e) {
        e.preventDefault();
        $(".tab-hd ul li").removeClass("active");
        var index = $(this).addClass("active").index();
        $(".tab-con >div").removeClass("active");
        $(".tab-con >div").eq(index).addClass("active")
    });
    //tabBox 이벤트


    $('.calendar').on('click', function () {
        $(".daterangepicker").css('bottom', '0');
        $('body').append('<div class="dim">').css('overflow', 'hidden')
    });
    //캘린더 애니메이션        
}

//닫기이벤트
var close = function () {
    $(document).mouseup(function (e) {
        if ($('.comboBox').has(e.target).length === 0) {
            $('.cb-detail').removeClass('active')
        }
    });
    //외부클릭시 닫힘     

    var closebtn = $('.ico-none');
    $('body').on('click', '.ico-none,.alarmmd-del', function (e) {
        e.preventDefault()
        //$(this).closest('tr').hide()
        if ($('.MDwrap').hasClass('active')) {
            $('.MDwrap').removeClass('active')
            $('.dim').remove()
        }
    });
    //close 관련 이벤트
}

//모달 이벤트
// * 참고 button > MDbtn 클래스추가, data-md="아이디명"추가, 모달영역 MDwrap id="data-md에 사용한 아이디"추가

var modal = function () {
    $('.MDbtn').on('click', function () {
        $('#' + $(this).data("md") + '').addClass('active');
        $('body').append('<div class="dim">').css('overflow', 'hidden')
        //$('.MDbtn').not($(this)).next().removeClass('active');
    })
    //modla open
    $('.top-menu ul').on('click', function (e) {
        e.stopImmediatePropagation();

    });
    $('body').on('click', '.dim,.MDClose,.picker', function (e) {
        var $target = $(e.target);
        var $mdBtn = $target.hasClass('MDbtn')
        var $mdWrap = $target.hasClass('MDwrap')

        if (!$mdBtn && !$mdWrap) {
            $('.MDwrap').removeClass('active');
            $(".dim").remove();
            $('.picker').remove()
            $('body').css('overflow', '')
        }
    });
}

//체크박스 이벤트
var check = function () {
    $('input:checkbox[data-check-all]').each(function () {
        var checkall = $(this);
        var sel = checkall.data('check-all');
        var check = $(sel).not('[data-check-all]');
        checkall.on('change', function () {
            check.prop('checked', this.checked).each(function () {
                $(this).triggerHandler('change');
            });
        });
        check.on('change', function () {
            var checked = check.filter(':checked');
            checkall.prop({
                checked: checked.length == check.length
            });
        })
        check.eq(0).triggerHandler('change');
    });
    //all check

    // $(".push-alarm input:checkbox").on('click', function () {
    //     if ($(this).prop('checked')) {
    //         $("input:checkbox[id='gnb-onoff00']").prop("checked", false);
    //         $('#push-alarm').addClass('active')
    //         $('body').append('<div class="dim">').css('overflow', 'hidden')
    //     }
    // });
    //전체메뉴 > 환경설정 > 푸쉬알림수신설정 푸시알림
}
//공통 js end

//페이지 js start

//보고서 이벤트
var report = function () {
    $('.report .btn-drop').on("click", function (e) {
        e.stopPropagation()
        $(this).toggleClass('active')
        if ($(this).hasClass("active") == true) {
            $(this).closest('.listItem').css('max-height', '100%');
        } else {
            $(this).closest('.listItem').css('max-height', '');
        }
    });
    //보고서 more버튼 이벤트

    $(".rp-ck input:checkbox").on('click', function () {
        if ($(this).prop('checked')) {
            $('.report .tb-list').addClass('show')
        } else {
            $('.report .tb-list').removeClass('show')
        }
    });
    //보고서 > 디바이스 체크박스 이벤트
}

//광고관리 이벤트
var adpage = function () {
    $(".ad-cam input:checkbox").on('click', function () {
        if ($(this).prop('checked')) {
            $('#adCam-off').addClass('active')
            $('body').append('<div class="dim">').css('overflow', 'hidden')
        } else {
            $('#adCam-on').addClass('active')
            $('body').append('<div class="dim">').css('overflow', 'hidden')
        }
    });
    //광고관리 > 스위치버튼 이벤트
}

//전체관련 이벤트
var setting = function () {

    $('body').on('click', '.ev-btn', function () {
        $(this).next('.copied').css('opacity', '1')
        setTimeout(function () {
            $('.copied').css('opacity', '0')
        }, 500);

    });
    // 결제하기 버튼클릭 이벤트

    $(".add-kakao input:checkbox").on('click', function () {
        if ($(this).prop('checked')) {
            $(this).closest('.switchbox').siblings('button').css('display', 'block');
        } else {
            $(this).closest('.switchbox').siblings('button').css('display', 'none');
        }
    });
    //전체메뉴 > 환경설정 > 푸쉬알림수신설정 카카오관련 체크


    var kakaotb = $('.kakao .tableBox tbody')
    var maxAppend = 1;
    $('.kakao .ico-add').on('click', function () {
        if (maxAppend >= 2) return;

        kakaotb.append('<tr><td><input type = "text" placeholder = "이름 입력"></td><td><input type = "number"placeholder = "숫자만 입력"></td><td><button type = "button" class = "ico-none"><i class = "ico-close-redbg"></i></button></td></tr>')

        maxAppend++;
        copied_save()

    });
    $('body').on('click', '.kakao .ico-none', function () {
        $(this).closest('tr').remove();
        copied_del()
        maxAppend--;
    });
    //전체메뉴 > 환경설정 > 카카오알림톡담당자 close btn
}

//툴팁 이벤트
var tooltip = function () {
    // $('.tooltip').hover(function () {
    //     $(this).parent('div,dt').css('position', 'relative').find('span').css('display', 'block')
    // }, function () {
    //     $(this).parent('div,dt').css('position', '').find('span').css('display', 'none')
    // });
    //tooltip hover
    $('.tooltip').on('click', function () {
        $(this).toggleClass('active')
    });
}

//달력
var picker = function () {
    var dim = (".dim");

    $("#df-input, #dd-input").daterangepicker({
            autoApply: true,
            locale: {
                format: "YYYY-MM-DD",
                daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                monthNames: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ],
            },
            ranges: {
                오늘: [moment(), moment()],
                어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                이번달: [moment().startOf("month"), moment().endOf("month")],
                전월: [
                    moment().subtract(1, "month").startOf("month"),
                    moment().subtract(1, "month").endOf("month"),
                ],
                전전월: [
                    moment().subtract(2, "month").startOf("month"),
                    moment().subtract(2, "month").endOf("month"),
                ],
                "최근 7일": [
                    moment().subtract(7, "days"),
                    moment().subtract(1, "days"),
                ],
                "최근 30일": [
                    moment().subtract(30, "days"),
                    moment().subtract(1, "days"),
                ],
                "최근 90일": [
                    moment().subtract(90, "days"),
                    moment().subtract(1, "days"),
                ],
                "최근 180일": [
                    moment().subtract(180, "days"),
                    moment().subtract(1, "days"),
                ],
            },
        },
        function (start, end, label) {
            console.log("Choice Date: " + start.format('YYYYMMD') + ' ~ ' + end.format('YYYYMMDD'));
            $('.dim').remove()
            $("input[name=sDate]").val(start.format("YYYY-MM-DD"));
            $("input[name=eDate]").val(end.format("YYYY-MM-DD"));
            $("#searchForm").submit();
        }
    );
    $("#st-input").daterangepicker({
            singleDatePicker: true,
            autoApply: true,
            locale: {
                format: "YYYY-MM-DD",
                daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                monthNames: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ],
                customRangeLabel: "사용자 선택",
            },
        },
        function (start, end, label) {
            console.log("Choice Date: " + start.format('YYYYMMD') + ' ~ ' + end.format('YYYYMMDD'));
            $('.dim').remove()
            $("input[name=Date]").val(start.format("YYYY-MM-DD"));
        }
    );
    $("#en-input").daterangepicker({
            singleDatePicker: true,
            autoApply: true,
            locale: {
                format: "YYYY-MM-DD",
                daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                monthNames: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ],
                customRangeLabel: "사용자 선택",
            },
        },
        function (start, end, label) {
            console.log("Choice Date: " + start.format('YYYYMMD') + ' ~ ' + end.format('YYYYMMDD'));
            $('.dim').remove()
            $("input[name=sDate]").val(end.format("YYYY-MM-DD"));
        }
    );
};

var time = function () {
    function init() {
        $('#test').selectScroll({
            data: [
                [{
                    text: '00:00',
                    id: 1
                }, {
                    text: '01:00',
                    id: 2
                }, {
                    text: '02:00',
                    id: 3
                }, {
                    text: '03:00',
                    id: 4
                }, {
                    text: '5',
                    id: 5
                }, {
                    text: '6',
                    id: 6
                }, {
                    text: '7',
                    id: 7
                }, {
                    text: '8',
                    id: 8
                }, {
                    text: '9',
                    id: 9
                }, {
                    text: '10',
                    id: 10
                }, {
                    text: '11',
                    id: 11
                }, {
                    text: '12',
                    id: 12
                }]
            ],
            selectedIndex: [0],
            cancel: function () {
                console.log('Canceld')
            }
        })
    }
    var $doc = $(document)
    $doc.on('click', '#test', init)
};

$(function () {
    nav();
    clickcommon();
    modal();
    picker();
    check();
    tooltip();
    close();
    time();
    alarmeev()
    report()
    setting()
    timeev();
    loading()
});