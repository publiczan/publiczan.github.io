var picker = function () {
    var picker = $('#df-input').daterangepicker({
        autoApply: true,
        opens: 'right',
        locale: {
            format: 'YYYY-MM-DD',
            daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        },
        ranges: {
            오늘: [moment(), moment()],
            어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            이번달: [moment().startOf("month"), moment().endOf("month")],
            전월: [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            전전월: [moment().subtract(2, "month").startOf("month"), moment().subtract(2, "month").endOf("month")],
            "최근 7일": [moment().subtract(7, "days"), moment().subtract(1, "days")],
            "최근 30일": [moment().subtract(30, "days"), moment().subtract(1, "days")],
            "최근 90일": [moment().subtract(90, "days"), moment().subtract(1, "days")],
            "최근 180일": [moment().subtract(180, "days"), moment().subtract(1, "days")]
        }
    }, function (start, end) {
        $('#df-input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));
    });

    // 달력이 열릴 때
    $('#df-input').on('show.daterangepicker', function (ev, pickerObj) {
        var $cal = $('.daterangepicker');

        $cal.find('.custom-header').remove(); // 기존 제거

        $cal.find('.drp-calendar').each(function (index) {
            var $thisCal = $(this);
            var $thead = $thisCal.find('table thead tr').first();
            $thead.empty();

            var isLeft = index === 0; // 왼쪽 달력
            var isRight = index === 1; // 오른쪽 달력

            var prevBtn = isLeft ? '<button type="button" class="prev-month">&lt;</button>' : '';
            var nextBtn = isRight ? '<button type="button" class="next-month">&gt;</button>' : '';
            var monthYearBtns = `
            <div class="month-year-btns" style="display:inline-block; margin:0 10px;">
                <button type="button" class="month-btn">` + (pickerObj.startDate.month() + 1) + `월</button>
                <button type="button" class="year-btn">` + pickerObj.startDate.year() + `년</button>
            </div>
        `;

            $thead.append(`<th colspan="7" style="position:relative; text-align:center;">${prevBtn}${monthYearBtns}${nextBtn}</th>`);

            var $monthBtn = $thead.find('.month-btn');
            var $yearBtn = $thead.find('.year-btn');

            // 월 팝업
            var $monthPopup = $('<div class="month-popup" style="position:absolute; background:#fff; border:1px solid #ccc; padding:5px; display:none;"></div>');
            for (var i = 1; i <= 12; i++) {
                var active = i === pickerObj.startDate.month() + 1 ? 'font-weight:bold;' : '';
                $monthPopup.append(`<button class="month-select-btn" style="margin:2px; ${active}">${i}월</button>`);
            }
            $thead.append($monthPopup);

            // 년 팝업
            var $yearPopup = $('<div class="year-popup" style="position:absolute; background:#fff; border:1px solid #ccc; padding:5px; display:none;"></div>');
            var year = pickerObj.startDate.year();
            for (var y = year - 5; y <= year + 5; y++) {
                var active = y === year ? 'font-weight:bold;' : '';
                $yearPopup.append(`<button class="year-select-btn" style="margin:2px; ${active}">${y}년</button>`);
            }
            $thead.append($yearPopup);

            // 버튼 이벤트
            $monthBtn.on('click', function (e) {
                e.stopPropagation();
                $monthPopup.toggle();
                $yearPopup.hide();
            });
            $yearBtn.on('click', function (e) {
                e.stopPropagation();
                $yearPopup.toggle();
                $monthPopup.hide();
            });

            $monthPopup.on('click', '.month-select-btn', function () {
                var month = parseInt($(this).text());
                var newStart = pickerObj.startDate.clone().month(month - 1).date(1);
                var newEnd = pickerObj.endDate.clone().month(month - 1).endOf('month');
                pickerObj.setStartDate(newStart);
                pickerObj.setEndDate(newEnd);
                pickerObj.updateView();
                $monthBtn.text(month + '월');
                $monthPopup.hide();
            });

            $yearPopup.on('click', '.year-select-btn', function () {
                var year = parseInt($(this).text());
                var newStart = pickerObj.startDate.clone().year(year);
                var newEnd = pickerObj.endDate.clone().year(year);
                pickerObj.setStartDate(newStart);
                pickerObj.setEndDate(newEnd);
                pickerObj.updateView();
                $yearBtn.text(year + '년');
                $yearPopup.hide();
            });

            // prev/next 버튼
            $thead.find('.prev-month').on('click', function () {
                pickerObj.setStartDate(pickerObj.startDate.clone().subtract(1, 'month'));
                pickerObj.setEndDate(pickerObj.endDate.clone().subtract(1, 'month'));
                pickerObj.updateView();
                $monthBtn.text(pickerObj.startDate.month() + 1 + '월');
                $yearBtn.text(pickerObj.startDate.year() + '년');
            });
            $thead.find('.next-month').on('click', function () {
                pickerObj.setStartDate(pickerObj.startDate.clone().add(1, 'month'));
                pickerObj.setEndDate(pickerObj.endDate.clone().add(1, 'month'));
                pickerObj.updateView();
                $monthBtn.text(pickerObj.startDate.month() + 1 + '월');
                $yearBtn.text(pickerObj.startDate.year() + '년');
            });
        });

        // 바깥 클릭 시 팝업 닫기
        $(document).on('click.monthyearpopup', function (e) {
            if (!$(e.target).closest('.month-year-btns, .month-popup, .year-popup').length) {
                $('.month-popup, .year-popup').hide();
            }
        });
    });
    $('.drp-calendar.left').on('wheel', function (e) {
        e.preventDefault(); // 스크롤 막기
        var picker = $('#df-input').data('daterangepicker');
        if (e.originalEvent.deltaY < 0) { // 위로 스크롤
            picker.setStartDate(picker.startDate.clone().subtract(1, 'month'));
            picker.setEndDate(picker.endDate.clone().subtract(1, 'month'));
        } else { // 아래로 스크롤
            picker.setStartDate(picker.startDate.clone().add(1, 'month'));
            picker.setEndDate(picker.endDate.clone().add(1, 'month'));
        }
        picker.updateView();
    });

    $('.drp-calendar.right').on('wheel', function (e) {
        e.preventDefault();
        var picker = $('#df-input').data('daterangepicker');
        if (e.originalEvent.deltaY < 0) {
            picker.setStartDate(picker.startDate.clone().subtract(1, 'month'));
            picker.setEndDate(picker.endDate.clone().subtract(1, 'month'));
        } else {
            picker.setStartDate(picker.startDate.clone().add(1, 'month'));
            picker.setEndDate(picker.endDate.clone().add(1, 'month'));
        }
        picker.updateView();
    });
};

$(function () {
    picker()
});