function load() { 
  console.log('loading popup...');

  var saveButton = $('save_btn');
  saveButton.addEventListener('click', function(evt) {
    save_settings();
  });

  var badge = $('badge');
  var currentBadge = localStorage['badge'] || DEFAULT_BADGE;
  for (var i = 0; i < badge.options.length; i++) {
    if (badge.options[i].value == currentBadge) {
      badge.selectedIndex = i;
      break;
    }
  }
  localStorage['badge'] = badge.options[badge.selectedIndex].value;
  badge.addEventListener('change', function() {
    localStorage['badge'] = badge.options[badge.selectedIndex].value;
  }, false);



  SetValueAddListener('username', DEFAULT_USERNAME, 'my_username');  
  SetValueAddListener('goat', DEFAULT_GOAT, 'the_goat');
  SetValueAddListener('badge', DEFAULT_BADGE, 'badge');

  console.log('added the values');  
}

function SetValueAddListener(storage_id, default_val, html_id)
{
  var val = localStorage[storage_id] || default_val;

  localStorage[storage_id] = val;

  if ($(html_id) === null)
    return;


  $(html_id).value = val;

  $(html_id).addEventListener('change', function(evt) {
  localStorage[storage_id] = $(html_id).value;
  }, false);
}

function save_settings(){
  console.log('saving...');

  // chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
  //   var code = 'window.location.reload();';
  //   chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
  // });

  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    console.log('tab id is:' + arrayOfTabs[0].id);
    chrome.tabs.reload(arrayOfTabs[0].id, null, function() { window.close(); });
  });

  //window.close();

  //chrome.storage.local.set({ 'username': $('my_username').value });
}

function ClosePopup() {
  window.close();
}

document.addEventListener('DOMContentLoaded', load);