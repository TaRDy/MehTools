// inject this into the webpage so we can replace the meh.com .action.reply with our own
$(".action.reply").off('click').click(function() {
        var e = $(this),
            t = e.closest(".comment"),
            n = e.parents(".comment, .reply").first().find(".created .p-nickname").first().text();
        if ($(window).width() >= 576) {
            var r = t.find("form.add.reply").first(),
                o = r.find('input[name="text"]');

            o.val("@" + n + " ").focus();

            if (e.hasClass("clicked") && r.is(":visible")) {
              r.slideUp(100);
            }
            else {              
              r.slideDown(100, function() {
                o.focus()
                Textarea.moveCursorToEnd(o[0])
              });
            }

            // manage our clicks            
            t.find(".action.reply").not(e).removeClass("clicked");
            t.find(".action.blame").not(e).removeClass("clicked");
            e.toggleClass("clicked");

        } else {
            var r = $("#add-reply-mobile"),
                i = r.find("textarea");
            i.val("@" + n + " "), r.find("input[name=comment]").val(t.attr("id")), Dialog.show("#add-reply-mobile"), Textarea.moveCursorToEnd(i[0])
        }
    });