var nav = function () {
    $(function () {
        $("nav li > a").on("click", function (e) {
            var $li = $(this).parent("li");
            var $sub = $li.children("ul");
            var $parents = $li.parents("li");

            $("nav li").not($li).not($parents)
                .removeClass("on")
                .children("ul").slideUp();

            if ($sub.length) {
                e.preventDefault();
                if ($li.hasClass("on")) {
                    $li.removeClass("on");
                    $sub.stop(true, true).slideUp();
                } else {
                    $li.addClass("on");
                    $sub.stop(true, true).slideDown();
                }
            } else {
                $li.addClass("on");
            }
            $parents.addClass("on").children("ul").show();
        });

        $('nav .btn-wide').on("click", function () {
            $(this).closest('nav').toggleClass('on')
            $(this).closest('nav').siblings('article').toggleClass('on')
            if ($(this).closest('nav').hasClass('on')) {
                $("nav").animate({
                    width: "80px",
                }, 100);
            } else {
                $("nav").animate({
                    width: "240px",
                }, 100);
            }
        });
    });
}
var moveTabBg = function ($tabBox) {
    var $tabHd = $tabBox.find('.tab-hd');
    var $active = $tabHd.find('li.on');
    var $bg = $tabHd.find('.bg');

    if (!$active.length || !$bg.length) return;

    // position().left와 outerWidth()를 사용하여 위치와 너비 계산
    var leftPos = $active.position().left;
    var activeWidth = $active.outerWidth();

    // 너비가 0보다 클 때만 (화면에 보일 때만) 적용
    if (activeWidth > 0) {
        $bg.css({
            'left': leftPos + 'px',
            'width': activeWidth + 'px'
        });
    }
};
var tabev = function () {
    setTimeout(function () {
        $('.tabBox.type01').each(function () {
            moveTabBg($(this));
        });
    }, 100);

    $('.infoBox.fix > .tabBox > .tab-con > div').eq(0).addClass('on');
    $('.tabBox .tab-hd li').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var $tabBox = $this.closest('.tabBox');
        var index = $this.index();
        var $tabCon = $tabBox.children('.tab-con');

        $this.addClass('on').siblings().removeClass('on');
        $tabCon.children('div').removeClass('on').eq(index).addClass('on');

        $tabCon.find('.tabBox').each(function () {
            $(this).find('.tab-hd li').removeClass('on').eq(0).addClass('on');
            $(this).find('.tab-con > div').removeClass('on').eq(0).addClass('on');
        });
        moveTabBg($tabBox);
    });
    $(document).on('click', function (e) {
        var $target = $(e.target);

        if ($target.closest('.infoBox.fix .tabBox').length === 0) {
            $('.infoBox.fix > .tabBox > .tab-con > div').removeClass('on');
        }
    });
}
var scroll = function () {
    $(function () {
        var $btn = $('.btn-top');
        $(window).on('scroll', function () {
            $btn.toggle($(this).scrollTop() > 100);
        });
        $btn.on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
    });
}
var hover = function () {
    $(function () {
        $('.tooltipBox i').hover(function () {
            $(this).siblings('div').css('display', 'block')
        }, function () {
            $(this).siblings('div').css('display', 'none')
        });
    });

    $(function () {
        $('.brand .row ul>li').hover(function () {
            $(this).siblings('li').removeClass('on')
        });
    });
    $(function () {
        $('.sankeyBox .info').hover(function () {
            $(this).closest('li').addClass('on')
        }, function () {
            $(this).closest('li').removeClass('on')
        });
    });
}
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
}
var clickev = function () {

    $(function () {
        var combobtn = $('.cb-btn')

        combobtn.on('click', function (e) {
            e.preventDefault();
            $(this).closest('.comboBox').toggleClass('on');
            combobtn.not($(this)).closest('.comboBox').removeClass('on');
        })
        $('.cb-dt li').on('click', function (e) {
            e.preventDefault();
            var selectedText = $(this).text();
            var $comboBox = $(this).closest('.comboBox');
            var $btn = $comboBox.find('.cb-btn');
            var $btnSpan = $btn.find('span');
            $btnSpan.text(selectedText);

            $(this).addClass('on').siblings().removeClass('on');
            $btn.addClass('on');
            $comboBox.removeClass('on');
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.comboBox').length) {
                $('.comboBox').removeClass('on');
            }
        });
    });
    //콤보박스
    $(function () {

        $('.mdBtn').on('click', function () {
            const targetId = $(this).data('md');

            // 🔥 모든 item 원래 z-index로
            $('.funnelBox .item').removeClass('is-modal');

            // 🔥 클릭한 버튼의 item만 최상단
            $(this).closest('.funnelBox .item').addClass('is-modal');

            // 모달 열기
            $('.mdBox').removeClass('on');
            $('#' + targetId).addClass('on');
            setTimeout(function () {
                $targetModal.find('.tabBox.type01').each(function () {
                    moveTabBg($(this));
                });
            }, 150);
            // $('html').css('overflow', 'hidden');
        });

        $('body').on('click', '.btn-close', function () {
            $(this).closest('.mdBox').removeClass('on');

            // 🔥 z-index 원복
            $('.funnelBox .item').removeClass('is-modal');

            $('body').css('overflow', '');
        });

        $('body').on('click', '.mdBox', function (e) {
            if ($(e.target).is('.mdBox')) {
                $(this).removeClass('on');

                // 🔥 z-index 원복
                $('.funnelBox .item').removeClass('is-modal');

                $('body').css('overflow', '');
            }
        });
    });
    //모달
    $(function () {
        $(".moreBox").each(function () {
            var $box = $(this);
            var $items = $box.find("ul > li");
            var $btn = $box.find(".btn-more");

            $items.hide().slice(0, 5).show();

            $btn.on("click", function (e) {
                e.preventDefault();

                $items.filter(":hidden").slice(0, 5).slideDown();

                if ($items.filter(":hidden").length == 0) {
                    $btn.fadeOut("slow");
                }
            });
        });
    });
    //더보기
    $(function () {
        $(".tableBox.hover tr").on('click', function () {
            $(this).addClass('on').siblings().removeClass('on');
        });
    });
    //테이블
    $(function () {
        $('.promo').on('click', 'input[type="checkbox"]', function () {
            $(this).closest('li').toggleClass('on')
        });

        $(".flx-btnBox button").on("click", function () {
            var target = $(this).data("target");
            $("html, body").animate({
                scrollTop: $(target).offset().top
            }, 400);
        });
    });
    //프로모션 이벤트

    $(function () {
        $('.oneck .item').on("click change", function (e) {
            let $checkbox = $(this).find('.switchbox input[type=checkbox]');
            if (e.type === "click") {
                if ($(e.target).closest('button').length || $(e.target).is('input[type=checkbox], .switchbox')) return;
                $checkbox.prop("checked", !$checkbox.prop("checked"));
            }
            $(this).toggleClass("on", $checkbox.prop("checked"));
        }).trigger("change");
    });
    //원클릭 캠페인 이벤트
    $(function () {
        $('.sortable').on('click', 'li', function () {
            $(this).addClass('on').siblings().removeClass('on');
        });
    });
    //viewBox 넘버링 이벤트
    $(function () {
        $(".camSet .viewBox .switchbox input[type=checkbox]").on("change", function () {
            $(this).closest(".right").find("button").toggle(this.checked);
        });
        $('.variable').on('click', function () {
            $('.variableBox').toggleClass('on');
        });
        $('.tempBox .item').on('click', function () {
            $(this).addClass('on').siblings().removeClass('on')
        });
        $('body').on('click', '.variableBox .btnBox button', function () {
            let value = $(this).data("copy");
            navigator.clipboard.writeText(value);
            $('.variableBox').removeClass('on');
        });
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.variableBox, .variable').length) {
                $('.variableBox').removeClass('on');
            }
        });
    });
    //캠페인설정 모달 이벤트
    $(function () {
        $(".camtype .radioBox input[type=radio]").on("change", function () {

            let val = $(this).val();
            $(".tag img").attr("src", "../../images/page/badge_" + val + ".png");
        });
    });
    //캠페인설정타입모달이벤트
    $(function () {
        $('.rfm .con-row button').hover(
            function () {
                var $row = $(this).closest('.con-row');
                if ($row.hasClass('on')) {
                    $(this).addClass('show');
                }
            },
            function () {
                $(this).removeClass('show');
            }
        );

        function num($ele) {
            $ele.each(function () {
                var $this = $(this);
                var target = parseFloat($this.text().replace(/,/g, ""));
                if (isNaN(target)) return;

                var isInt = Number.isInteger(target);

                $this.css({
                    visibility: "visible",
                    display: "flex"
                }).text("0");

                $({
                    val: 0
                }).animate({
                    val: target
                }, {
                    duration: 1000,
                    easing: "swing",
                    step: function (now) {
                        if (!isInt) {
                            $this.text(now.toFixed(2));
                        } else if (target >= 500) {
                            $this.text(Math.floor(now).toLocaleString());
                        } else {
                            $this.text(Math.floor(now));
                        }
                    },
                    complete: function () {
                        if (!isInt) {
                            $this.text(target.toFixed(2));
                        } else if (target >= 500) {
                            $this.text(target.toLocaleString());
                        } else {
                            $this.text(target);
                        }
                    }
                });
            });
        }
        num($(".con-row .flx span"));

        $(".rfm .con-row").on("click", function () {
            var $row = $(this);

            $row.siblings(".con-row").removeClass("on")
                .find("li:not(.flx)").css({
                    display: "none",
                    opacity: 0
                });

            $row.addClass("on")
                .find("li:not(.flx)").css({
                    display: "flex",
                    opacity: 1
                });

            num($row.find("span"));
        });
    });
    //rfm
    $(function () {
        $(document).ready(function () {
            $('.Lpop button, .Ppop button').on('click', function () {
                $(this).addClass('on').siblings().removeClass('on');
                var type = $('.Lpop button.on').data('type') || '.df';
                var pos = $('.Ppop button.on').data('class') || 'st';
                $('.popupBox').hide().removeClass('st ct bt');
                $(type).show().addClass(pos);
            });

            $('input[name="oncambtn"]').on('change', function () {
                var val = $(this).val();
                if (val === "02") {
                    $('.linkInput').show();
                } else {
                    $('.linkInput').hide().find('input').val('');
                }
                $('.popupBox .popbtnBox').toggle(val !== "03");
            });

            $('.txtcont').on('input', function () {
                var $this = $(this);
                var val = $this.val();
                var $row = $this.closest('.row');

                if ($row.hasClass('st2')) {
                    var formatted = val.replace(/\n/g, "<br>");
                    $('.popupBox .txtBox strong').html(val.length > 0 ? formatted : "제목 영역 입니다.");
                } else if ($row.hasClass('st3')) {
                    var formatted = val.replace(/\n/g, "<br>");
                    $('.popupBox .txtBox p').html(val.length > 0 ? formatted : "본문 영역 입니다.");
                } else if ($row.hasClass('st4')) {
                    $('.popupBox .popbtnBox button').text(val.length > 0 ? val : "버튼 영역 입니다.");
                }
            });

            if ($('input[name="oncambtn"]:checked').val() !== "02") {
                $('.linkInput').hide();
            }
        });
    });
};

var loadev = function () {
    $(function () {
        $('.txtcont').on('input', function () {
            let len = $(this).val().length;
            $(this).next('.count').find('.now').text(len);
        });
    })
}
$(function () {
    clickev()
    scroll()
    tabev()
    hover()
    nav()
    check()
    loadev()
});