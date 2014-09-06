console.log('so you wanna be a goat?');

// known bugs:
// does not work on main forum page, only on topics right now

chrome.runtime.sendMessage({method: "getLocalStorage", key: "ignore_this"}, function(response) {
  var user_name = response.data.username;
  var badge = response.data.badge;
  var goat = response.data.goat;

  SetCustomUserInfo(user_name, badge);
  AddGoatBlameButton(goat);

  //console.log(response.data);
  //console.log(response.data.username);
  //console.log(response.data.badge);
  //console.log(response.data.goat);
});


function SetCustomUserInfo(user_name, badge) {
	console.log('username is: ' + user_name);

	var href_name = "/@" + user_name;
	var badge_name = badge;
	// other options are: octopus, staff, scapegoat, kickstarter, vmp, korean-member-support

	var badge_title = "Breakfast Octopus, Scapegoat of the Month, Kickstarter Backer, Very Mediocre Person";

	var comment_html = "<a class=\"h-card p-nickname\" href=\"" + href_name + "\"><span><span class=\"badge " + badge_name + "\" title=\"" + badge_title + "\"></span>" + user_name + "</span></a>";

	$('a.h-card[href="' + href_name + '"]').html(comment_html);
}

function AddGoatBlameButton(goat)
{
	$('a.action.reply').parent().after('<li><a class="action blame">Blame</a></li>')

	// stolen from meh style sheet .action.reply and slightly modified
	$(".action.blame").click(function() {
        var e = $(this),
            t = e.closest(".comment"),
            n = goat;
        if ($(window).width() >= 576) {
            var r = t.find("form.add.reply").first(),
                o = r.find('input[name="text"]');
            o.val("@" + n + " ").focus(), e.hasClass("clicked") || r.is(":visible") ? e.hasClass("clicked") && r.is(":visible") && r.slideUp(100) : r.slideDown(100, function() {
                o.focus(), Textarea.moveCursorToEnd(o[0])
            }), t.find(".action.blame").not(e).removeClass("clicked"), e.toggleClass("clicked")
        } else {
            var r = $("#add-reply-mobile"),
                i = r.find("textarea");
            i.val("@" + n + " "), r.find("input[name=comment]").val(t.attr("id")), Dialog.show("#add-reply-mobile"), Textarea.moveCursorToEnd(i[0])
        }
    })
}