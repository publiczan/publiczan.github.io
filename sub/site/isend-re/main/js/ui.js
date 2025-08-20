var clickev = function () {
    $(function () {
        $('.mo-btn').on('click', function () {
            $('header').toggleClass('on')
        });
    });
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

            if ($(this).hasClass('ot')) {
                $comboBox.find('input.cb-input').remove();
                $('<input type="text" class="cb-input" placeholder="직접 입력">').insertAfter($comboBox.find('.cb-btn'));
            } else {
                $comboBox.find('input.cb-input').remove();
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.comboBox').length) {
                $('.comboBox').removeClass('on');
            }
        });
    });
    $(function () {
        $('.mdBtn').on('click', function () {
            const targetId = $(this).data('md');
            $('#' + targetId).addClass('on');
            //$('html').css('overflow', 'hidden');
        });
        $('body').on('click', '.btn-close', function () {
            $(this).closest('.mdBox').removeClass('on');
            $('body').css('overflow', '');
        });

        $('body').on('click', '.mdBox', function (e) {
            if ($(e.target).is('.mdBox')) {
                $(this).removeClass('on');
                $('body').css('overflow', '');
            }
        });
    });
};
var imgev = function () {
    $(function () {
        const $conBox = $('.step.sc07 .conBox .item ul');
        let html = '';
        for (let i = 1; i <= 20; i++) {
            html += `
            <li><picture><img src ="../images/pt_logo_${String(i).padStart(2, '0')}.png"alt =""></picture></li>
            `;
        }
        $conBox.html(html);
    });
};
var quickbtn = function () {
    $(function () {

        var $btn = $(".sc08 .inner .inputBox .btn-quick");
        var $wrap = $(".wrap");

        if ($btn.length && $wrap.length) {
            if ($(window).width() <= 767) {
                $wrap.append($btn);
                $btn.css({
                    position: "fixed",
                    bottom: "0rem"
                });
            } else {
                // PC이면 다시 원래 위치
                $(".sc08 .inner .inputBox").append($btn);
                $btn.css({
                    position: "",
                    bottom: ""
                });
            }
        } else {}
    });
};
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
var animation = function () {
    $(function () {
        const $counters = $("section");
        const exposurePercentage = 10;
        const loop = true;
        $(window).on('scroll', function () {
            $counters.each(function () {
                const $el = $(this);
                const rect = $el[0].getBoundingClientRect();
                const winHeight = window.innerHeight;
                const contentHeight = rect.bottom - rect.top;
                if (rect.top <= winHeight - (contentHeight * exposurePercentage / 30) && rect.bottom >= (contentHeight * exposurePercentage / 30)) {
                    $el.addClass('on');
                }
                if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                    $el.removeClass('on');
                }
            });
            $('.wrap').toggleClass(
                'other',
                $('.sc04').hasClass('on') || $('.sc05').hasClass('on')
            );
        }).scroll();
    });
}

$(function () {
    clickev()
    imgev()
    quickbtn()
    scroll()
    animation()
});