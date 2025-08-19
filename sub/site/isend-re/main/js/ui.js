var clickev = function () {
    $(function () {
        $('.mo-btn').on('click', function () {
            $('header').toggleClass('on')
        });
    });
    $(function () {
        $('.top_btn').on('click', function () {
            scrollToSection(0);
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
$(function () {
    clickev()
    imgev()
    quickbtn()
});