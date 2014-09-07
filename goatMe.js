// Add some type of header here?
// Author: TaRDy

// inject our inject.js so we can modify the meh.com scripts
// taken from: http://stackoverflow.com/questions/9263671/google-chome-application-shortcut-how-to-auto-load-javascript/9310273#9310273
var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

console.log('so you wanna be a goat?');

  // known bugs:
  // does not work on main forum page, only on topics right now

  chrome.runtime.sendMessage({method: "getLocalStorage", key: "ignore_this"}, function(response) {
  
    // we have to know the structure of the data beforehand in order to parse this...
    var use_custom_badge = response.data.use_badge;
    var show_blame = response.data.use_blame_button;
    var self_star = response.data.use_self_star;

    var user_name = response.data.username;
    var badge = response.data.badge;

    var goat = response.data.goat;
    var goat_curse = response.data.goat_curse;

    if ( to_bool(use_custom_badge) )
      SetCustomUserInfo(user_name, badge);

    if ( to_bool(show_blame) )
      AddGoatBlameButton(goat, goat_curse);

    if ( to_bool(self_star) )
      StarPostsByUser(user_name);

    //console.log(response.data);
  });

function to_bool(str)
{
  return str !== "false";
}

function SetCustomUserInfo(user_name, badge) {
	console.log('username is: ' + user_name);

	var href_name = "/@" + user_name;
	var badge_name = badge;
	// other options are: octopus, staff, scapegoat, kickstarter, vmp, korean-member-support

	var badge_title = "Breakfast Octopus, Scapegoat of the Month, Kickstarter Backer, Very Mediocre Person";

	var comment_html = "<a class=\"h-card p-nickname\" href=\"" + href_name + "\"><span><span class=\"badge " + badge_name + "\" title=\"" + badge_title + "\"></span>" + user_name + "</span></a>";

	$('a.h-card[href="' + href_name + '"]').html(comment_html);
}

function AddGoatBlameButton(goat, goat_curse)
{
	$('a.action.reply').parent().after('<li><a class="action blame">Blame</a></li>')

	// stolen from meh style sheet .action.reply and slightly modified
	$(".action.blame").click(function() {
        var e = $(this),
            t = e.closest(".comment"),
            n = goat;

        var goat_at = "@" + n;
        var blame_text = (goat_curse.length > 0) ? goat_curse + " " + goat_at + "! " : goat_at + " ";

        if ($(window).width() >= 576) {
            var r = t.find("form.add.reply").first(),
                o = r.find('input[name="text"]');

            o.val(blame_text).focus();

            if (e.hasClass("clicked") && r.is(":visible"))
            {
              r.slideUp(100);
            }
            else {
              r.slideDown(100, function() {
                o.focus();
                Textarea.moveCursorToEnd(o[0]);
              });
            }

            // manage our clicks
            t.find(".action.blame").not(e).removeClass("clicked");
            t.find(".action.reply").not(e).removeClass("clicked");
            e.toggleClass("clicked");

        } else {
            var r = $("#add-reply-mobile"),
                i = r.find("textarea");
            i.val(blame_text), r.find("input[name=comment]").val(t.attr("id")), Dialog.show("#add-reply-mobile"), Textarea.moveCursorToEnd(i[0])
        }
    })
}

function StarPostsByUser(user_name)
{
  var href_name = "/@" + user_name;

  // gather all the unstarred stars on the page
  var unvoted = $('.votes.abstain');

  for (i = 0; i < unvoted.length; i++)
  {
    var star = $(unvoted[i]);

    // look to see if the username is in the parent comment
    var parent_id = star.data("parentId");
    var parent_comment = $("#" + parent_id);

    // if we had any results it must be valid!
    if (parent_comment.find('a.h-card[href="' + href_name + '"]').length)
    {
      CallStarPost(star);
    }
  }
}

function CallStarPost(star)
{
  var e = star;
  ($.post("/forum/votes/add", {
            _csrf: $("input[name=_csrf]").attr("value"),
            parentId: e.data("parentId"),
            parentType: e.data("parentType")
        }), e.addClass("for").removeClass("abstain"), e.html(parseInt(e.html()) + 1))
}