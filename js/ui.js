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
    $(document).ready(function () {
        open_menu();

        function windowsc() {
            var headerTop = $(".header").offset().top;

            if (headerTop > 100) {
                $(".header").addClass("other");
            } else {
                $(".header").removeClass("other");
            }
        }
        $(window).on('scroll', function () {
            windowsc();
        });
        $(window).resize(function () {
            open_menu();
        });

        function open_menu() {
            var windowWidth = $(window).width();
            if (windowWidth < 768) {
                // 768px 이하일 때
                $('.tab-hd').hide(); // 기존 버튼 숨기기
                // 새로운 셀렉트 메뉴 추가
                $('.tab-sct').remove();
                if (!$('.tab-sct').length) {
                    var selectMenu = $('<select class="tab-sct"></select>');

                    // 각 버튼의 데이터를 옵션으로 추가
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
                // 768px 이상일 때
                $('.tab-hd').show(); // 기존 버튼 보이기
                $('.tab-sct').remove(); // 셀렉트 메뉴 제거
            }

            function tabmenu(value) {
                if (value == 'all') {
                    $('.tab-con li').show('1000');
                } else {
                    $('.tab-con li').not('.' + value).hide('1000');
                    $('.tab-con li').filter('.' + value).show('1000');
                }
            }
            $('.tab-hd button, .tab-hd select').on('click change', function () {
                var value = $(this).hasClass('tab-sct') ? $(this).val() : $(this).data('ft');

                $('.tab-hd button').removeClass('active');
                $('.tab-hd button[data-ft="' + value + '"]').addClass('active');

                tabmenu(value);
            });
        }
    })
    $('.step03 .tab-hd button').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        const value = $(this).attr('data-ft');
        if (value == 'all') {
            $('.tab-con li').show('1000');
        } else {
            $('.tab-con li').not('.' + value).hide('1000')
            $('.tab-con li').filter('.' + value).show('1000')
        }
    })
    $('.step .txtBox > div').each(function (index) {
        $(this).delay($(this).data('delay')).queue(function () {
            $(this).addClass('animate-in');
        });
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
    })

    $('body').on('click', '.iconone,.ppview', function () {
        $(this).closest('.ppview').remove()
    })
}

$(function () {
    nav()
    content()
});