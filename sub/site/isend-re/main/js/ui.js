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
        for (let i = 1; i <= 25; i++) {
            html += `
            <li><picture><img src ="../images/pt_logo_${String(i).padStart(2, '0')}.png"alt =""></picture></li>
            `;
        }
        $conBox.html(html);
    });
};
$(function () {
    clickev()
    imgev()
});