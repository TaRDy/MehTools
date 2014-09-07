function to_bool(str)
{
  return str !== "false";
}

function load() { 
  console.log('loading popup...');

  $('#save_btn').click(save_settings);
  
  // get the current badge 
  var currentBadge = localStorage['badge'] || DEFAULT_BADGE;

  // select the current badge
  $('#badge option[value="' + currentBadge + '"]').prop('selected', true);

  // set the local storage
  localStorage['badge'] = $('#badge option:selected').val();


  GetValueSetDisplay('username', DEFAULT_USERNAME, '#my_username');  
  GetValueSetDisplay('goat', DEFAULT_GOAT, '#the_goat');

  SetCheckValue('use_self_star', false, '#self_star_enable');
  SetCheckValue('use_badge', true, '#custom_badge_enable');
  SetCheckValue('use_blame_button', true, '#blame_button_enable');

  //console.log('added the values');
}

function GetValueSetDisplay(storage_id, default_val, html_id)
{
  var val = localStorage[storage_id] || default_val;

  localStorage[storage_id] = val;

  $(html_id).val(val);
}

function SetCheckValue(storage_id, default_val, html_id)
{
  var val = localStorage[storage_id] || default_val;

  console.log('val is: ' + val);

  localStorage[storage_id] = val;

  $(html_id).prop('checked', to_bool(val));
}

function StoreByProp(storage_id, html_id, property_val)
{
  localStorage[storage_id] = $(html_id).prop(property_val);
}

function save_settings(){
  console.log('saving...');

  // get the enabled states
  StoreByProp('use_self_star', '#self_star_enable', 'checked');
  StoreByProp('use_badge', '#custom_badge_enable', 'checked');
  StoreByProp('use_blame_button', '#blame_button_enable', 'checked');

  // grab username
  StoreByProp('username', '#my_username', 'value');

  // grab the desired badge for local storage
  StoreByProp('badge', '#badge option:selected', 'value');

  // grab goat to blame
  StoreByProp('goat', '#the_goat', 'value');

  // reload the tab and then close this window
  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    console.log('tab id is:' + arrayOfTabs[0].id);
    chrome.tabs.reload(arrayOfTabs[0].id, null, function() { window.close(); });
  });
}

document.addEventListener('DOMContentLoaded', load);