/*
    File  : ui_chart.js
    Date  : 2025.10.22
    menu  : chart 테스트
*/

/*
    File  : ui3.js
    Date  : 2025.12.17
    menu  : 공통 js
*/


//* common */
// bubbleOpen 클릭시 bubbleWrap 나타나는 말풍선 이벤트
// .bubbleOpen 클릭시 bubbleWrap을 wrap 하위로 이동 > 모달영역이 클릭영역(bubbleOpen) 영역을 벗어날 경우 bubble이 잘리는 현상 방지를 위해 bubble 태그를 wrap 하위로 옮김

var bubbleOpen = function () {
    $(document).on("click", ".bubbleOpen", function (e) {
        e.stopPropagation();
        e.preventDefault();

        const $btn = $(this);
        const btnName = $btn.data("popbubblename");
        const $wrap = $('.bubbleWrap[data-popbubblewrapname="' + btnName + '"]');

        if (!$wrap.length) return;

        if ($wrap.hasClass("bubbleOn")) {
            $wrap.removeClass("bubbleOn pos-top pos-bottom").hide();
            return;
        }

        $(".bubbleWrap").not($wrap)
            .removeClass("bubbleOn pos-top pos-bottom")
            .hide();

        const winHeight = window.innerHeight;
        const btnOffset = $btn.offset();
        const btnTop = btnOffset.top;
        const scrollTop = $(window).scrollTop();
        const btnCenter = btnTop - scrollTop + ($btn.outerHeight() / 2);

        $wrap.removeClass("pos-top pos-bottom");

        let topPos, leftPos;
        if (btnCenter > winHeight / 2) {
            $wrap.addClass("pos-top");
            topPos = btnOffset.top - $wrap.outerHeight() - 8;
            leftPos = btnOffset.left;
        } else {
            $wrap.addClass("pos-bottom");
            topPos = btnOffset.top + $btn.outerHeight() + 8;
            leftPos = btnOffset.left;
        }

        $("#Wrap").prepend($wrap);

        $wrap.css({
            position: "absolute",
            top: topPos,
            left: leftPos,
            display: "block",
            zIndex: 1000
        }).addClass("bubbleOn");
    });

    $(document).on("click", ".bubbleClose, .bubbleDim", function () {
        $(this).closest(".bubbleWrap")
            .removeClass("bubbleOn pos-top pos-bottom")
            .hide();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".bubbleOpen, .bubbleWrap").length) {
            $(".bubbleWrap")
                .removeClass("bubbleOn pos-top pos-bottom")
                .hide();
        }
    });
};

//* diagram */
var diagram = function () {
    // [1] 선 그리기 함수 (생략 없이 유지)
    function drawGraphLines() {
        const colors = ["#489eff", "#b4b4b4", "#7277ff", "#6c9dfe", "#72beff", "#72e7ff", "#6bfbf1"];
        let colorIndex = 0;

        $(".graph li").each(function () {
            const $li = $(this);
            const $info = $li.children(".info");
            const $line = $info.find(".line");
            const $subLis = $li.children("ul").children("li");

            if (!$subLis.length) {
                $line.find(".graph-svg").empty();
                return;
            }

            const parentOffset = $li.offset();
            const parentCenter = {
                x: parentOffset.left,
                y: parentOffset.top + $li.outerHeight() / 2
            };

            $line.find(".graph-svg").each(function (idx) {
                const $svg = $(this);
                const $childLi = $subLis.eq(idx);
                if (!$childLi.length) return;

                const childOffset = $childLi.offset();
                const childCenter = {
                    x: childOffset.left,
                    y: childOffset.top + $childLi.outerHeight() / 2
                };

                const dx = childCenter.x - parentCenter.x;
                const dy = childCenter.y - parentCenter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                const lineHeight = 30;
                const startX = -30;
                const startY = $li.outerHeight() / 2 - lineHeight / 2;
                const color = colors[colorIndex % colors.length];

                $svg.css({
                    "position": "absolute",
                    "top": startY + "px",
                    "left": startX + "px",
                    "width": distance + "px",
                    "height": lineHeight + "px",
                    "transform-origin": "0 50%",
                    "transform": `rotate(${angle}deg)`,
                    "overflow": "visible",
                    "pointer-events": "auto",
                    "display": "block"
                }).attr("viewBox", `0 0 ${distance} ${lineHeight}`);

                $svg.html(`
                    <path class="graph-line"
                        d="M 0 ${lineHeight / 2} C ${distance / 3} ${lineHeight / 2 - 50}, ${(distance / 3) * 2} ${lineHeight / 2 + 50}, ${distance} ${lineHeight / 2}"
                        fill="none" stroke="${color}" stroke-width="30"
                        stroke-linecap="round" opacity="0.35" 
                        style="transition: all 0.2s; cursor:pointer;" />
                `);
                colorIndex++;
            });
        });
    }

    // [2] 팝업 클릭 이벤트 (기존 코드 유지)
    $(document).on("click", ".bubbleOpen", function (e) {
        e.stopPropagation();
        e.preventDefault();
        const name = $(this).attr("data-popBubbleName") || $(this).data("popbubblename");
        const $wrap = $(`.bubbleWrap[data-popBubbleWrapName="${name}"]`);
        if (!$wrap.length) return;
        if ($wrap.hasClass("bubbleOn")) {
            $wrap.removeClass("bubbleOn").hide();
        } else {
            $(".bubbleWrap").removeClass("bubbleOn").hide();
            const pos = $(this).offset();
            $wrap.css({
                "position": "absolute",
                "top": pos.top + 35,
                "left": pos.left,
                "z-index": 1000
            }).show().addClass("bubbleOn");
        }
    });

    // [3] 정방향: 선 호버 -> 자식 li 강조
    $(document).on("mouseenter", ".graph-line", function () {
        const $path = $(this);
        const $svg = $path.closest(".graph-svg");
        const $parentLi = $svg.closest("li");
        const idx = $parentLi.find(".graph-svg").index($svg);
        const $targetChildLi = $parentLi.children("ul").children("li").eq(idx);

        $path.attr({
            "opacity": 1,
            "stroke-width": 36
        });
        if ($targetChildLi.length) $targetChildLi.addClass("is-target-hover");

    }).on("mouseleave", ".graph-line", function () {
        $(this).attr({
            "opacity": 0.35,
            "stroke-width": 30
        });
        $(".is-target-hover").removeClass("is-target-hover");
    });

    // [4] 역방향: li 호버 -> 연결된 SVG 선 강조 (핵심 수정 부분)
    $(document).on("mouseenter", ".graph li", function (e) {
        e.stopPropagation();
        const $thisLi = $(this);
        const $parentLi = $thisLi.parent("ul").closest("li");
        if (!$parentLi.length) return;

        // 내가 부모의 몇 번째 자식인지 찾기
        const myIdx = $thisLi.index();
        // 부모의 line 영역 안에서 내 index와 일치하는 선(path) 찾기
        const $linkedPath = $parentLi.find("> .info .line .graph-svg").eq(myIdx).find(".graph-line");

        // SVG에 직접 마우스 올린 것과 동일한 효과 부여
        $linkedPath.attr({
            "opacity": 1,
            "stroke-width": 36
        });
        // 본인 li에도 효과 부여 (필요 시)
        $thisLi.addClass("is-target-hover");

    }).on("mouseleave", ".graph li", function () {
        // 모든 강조 효과 초기화
        $(".graph-line").attr({
            "opacity": 0.35,
            "stroke-width": 30
        });
        $(".is-target-hover").removeClass("is-target-hover");
    });

    $(window).on("load resize", function () {
        setTimeout(drawGraphLines, 200);
    });
    drawGraphLines();
};

diagram();
/* 공통 */
$(function () {
    diagram();
    bubbleOpen(); // 공통 팝업 (기존)
});