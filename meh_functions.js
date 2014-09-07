function Dialog() {}

function Textarea() {}

Dialog.show = function(e) {
    var t = $("#overlay");
    t.length ? t.show() : ($("body").prepend('<div id="overlay"></div>'), $("#overlay").on("click", function() {
        Dialog.close()
    })), $(e).addClass("dialog").show()
}, Dialog.close = function() {
    $(".dialog").hide(), $("#overlay").hide()
}

jQuery.fn.shake = function(e, t, n) {
    return this.each(function() {
        $(this).css("position", "relative");
        for (var r = 1; e >= r; r++) $(this).animate({
            left: -1 * t
        }, n / e / 4).animate({
            left: t
        }, n / e / 2).animate({
            left: 0
        }, n / e / 3)
    }), this
}, Textarea.autoGrow = function(e) {
    e.scrollHeight > e.clientHeight && (e.style.height = e.scrollHeight + "px")
}, Textarea.moveCursorToEnd = function(e) {
    if (e)
        if ("number" == typeof e.selectionStart) e.selectionStart = e.selectionEnd = e.value.length;
        else if ("undefined" != typeof e.createTextRange) {
        e.focus();
        var t = e.createTextRange();
        t.collapse(!1), t.select()
    }
};