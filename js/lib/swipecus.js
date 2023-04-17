// $(function () {
//     $('.listItem').swipeTo({
//         minSwipe: 0,
//         angle: 10,
//         wrapScroll: '.btn-drag-del',
//         binder: false,
//         swipeStart: function () {
//             console.log('start');
//         },
//         swipeMove: function () {
//             console.log('move');

//         },
//         swipeEnd: function () {
//             console.log('end');
//             $('.alarm-del').css('display', 'block')
//         },
//     });

//     nonclickItem()
//     deleteItem();
// })
// var nonclickItem = function () {
//     var nonclick = $('.listItem').on('click', function (e) {
//         e.preventDefault()
//         $(this).removeClass('swiped open').css('transform', '')

//     })
// }
// var deleteItem = function () {
//     // var deleteItemFnc = $('body').on('click tab', '.btn-drag-del', function () {blank
//     //     var that = $(this);blank
//     //     that.parent().fadeOut('fast')
//     // })
//     var click = $('.btn-drag-del').on('click', function () {

//         $(this).closest('.listItem').fadeOut('fast')
//         $('body').append('<span class="copied">삭제 되었습니다</span>')
//         $('.copied').css('opacity', '1')
//         setTimeout(function () {
//             $('.copied').css('opacity', '0').remove()
//         }, 400);
//     })
// }