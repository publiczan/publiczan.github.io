var nav = function () {
    $('body').on('click', '.hv-target, ul.menuBox .hv-target', function () {
        var dataConValue = $(this).data("con");
        var $targetElement = $('#' + dataConValue);

        $targetElement.toggleClass('active');
        $(this).parent().addClass('active');
        $('header').prepend('<button type="button" class="btn-close active">close</button>');

        var index = $(this).closest('li').index();
        if (index > -1) {
            $('.step03 .tab-hd button').eq(index + 1).trigger('click');
        }

        // if (!$targetElement.is('.con.step02')) {
        //     $('header').toggleClass('other', $targetElement.hasClass('active'));
        // }
    })

    $('body').on('click', '.btn-close', function () {
        $('.btn-close').remove()
        $('article').removeClass('active')
        $('.con').removeClass('active')
    })
}
var content = function () {
    $('article .con.active').css({
        'overflow-y': 'auto',
        'height': '100vh'
    });

    document.addEventListener('scroll', function (e) {
        if (e.target === document) return;

        var $target = $(e.target);
        if ($target.hasClass('con') || $target.closest('.con').length > 0) {
            var currentScroll = $target.scrollTop();

            console.log("🔥 강제 포착된 스크롤:", currentScroll);

            if (currentScroll > 50) {
                $(".header").addClass("other");
            } else {
                $(".header").removeClass("other");
            }
        }
    }, true);
    $(window).resize(function () {
        open_menu();
    });

    function open_menu() {
        var windowWidth = $(window).width();
        if (windowWidth < 768) {
            $('.tab-hd').hide();
            $('.tab-sct').remove();

            if (!$('.tab-sct').length) {
                var selectMenu = $('<select class="tab-sct"></select>');

                $('.tab-hd button').each(function () {
                    var option = $('<option></option>')
                        .text($(this).text())
                        .attr('value', $(this).data('ft'));

                    if ($(this).hasClass('active')) {
                        option.attr('selected', 'selected');
                    }
                    selectMenu.append(option);
                });

                $('.tab-hd').after(selectMenu);

                selectMenu.change(function () {
                    var selectedValue = $(this).val();
                    $('.tab-hd button').removeClass('active');
                    $('.tab-hd button[data-ft="' + selectedValue + '"]').addClass('active');
                    tabmenu(selectedValue);
                });
            }
        } else {
            $('.tab-hd').show();
            $('.tab-sct').remove();
        }
    }

    function tabmenu(value) {
        if (value == 'all') {
            $('.tab-con li').show(1000);
        } else {
            $('.tab-con li').not('.' + value).hide(1000);
            $('.tab-con li').filter('.' + value).show(1000);
        }
    }

    $('.tab-hd button, .tab-hd select').on('click change', function () {
        var value = $(this).hasClass('tab-sct') ? $(this).val() : $(this).data('ft');
        $('.tab-hd button').removeClass('active');
        $('.tab-hd button[data-ft="' + value + '"]').addClass('active');
        tabmenu(value);
    });

    $('.step03 .tab-hd button').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        const value = $(this).attr('data-ft');
        if (value == 'all') {
            $('.tab-con li').show(1000);
        } else {
            $('.tab-con li').not('.' + value).hide(1000);
            $('.tab-con li').filter('.' + value).show(1000);
        }
    });

    $('body').on('click', '.step03 .tab-con li button', function () {
        const closestLi = $(this).closest('li');
        if (!$(this).attr('onclick') && !closestLi.hasClass('wp')) {
            const imgsrc = $(this).closest('figcaption').siblings('img').attr('src');
            const modifiedImgsrc = imgsrc.replace(/(\.jpg|\.png|\.gif)$/, '_b$1');

            $(this).closest('article').append(
                "<div class='ppview'><div><button type='button' class='iconone'>close</button><img src='" + modifiedImgsrc + "'></div></div>"
            );
        }
    });

    $('body').on('click', '.iconone, .ppview', function () {
        $(this).closest('.ppview').remove();
    });

    $('.step .txtBox > div').each(function () {
        $(this).delay($(this).data('delay')).queue(function () {
            $(this).addClass('animate-in');
        });
    });

    open_menu();
};

$(function () {
    nav()
    content()
});