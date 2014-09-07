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
  GetValueSetDisplay('goat_curse', DEFAULT_GOAT_CURSE, '#goat_curse');

  // init the goat curse preview
  UpdateGoatCursePreview();

  // setup on change for goat or goat_curse to update the preview
  $('#the_goat').change(UpdateGoatCursePreview);
  $('#goat_curse').change(UpdateGoatCursePreview);

  SetCheckValue('use_self_star', false, '#self_star_enable');
  SetCheckValue('use_badge', true, '#custom_badge_enable');
  SetCheckValue('use_blame_button', true, '#blame_button_enable');

  //console.log('added the values');
}

function UpdateGoatCursePreview()
{
  console.log('in goat curse preview');
  var goat = $('#the_goat').val();
  var curse = $('#goat_curse').val();

  console.log("goat is: " + goat);
  console.log("curse is: " + curse);

  var goat_at = "@" + goat;
  var curse_full = curse + " " + goat_at + "! ";
  var curse_empty = goat_at + " ";

  console.log("curse empty is: " + curse_empty);

  var blame_text = ((curse.length > 0) ? curse_full : curse_empty); 

  console.log("blame text is: " + blame_text);

  $('#curse_preview').val(blame_text);
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

  //console.log('val is: ' + val);

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

  // grab goat to blame info
  StoreByProp('goat', '#the_goat', 'value');
  StoreByProp('goat_curse', '#goat_curse', 'value');

  // reload the tab and then close this window
  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    console.log('tab id is:' + arrayOfTabs[0].id);
    chrome.tabs.reload(arrayOfTabs[0].id, null, function() { window.close(); });
  });
}

document.addEventListener('DOMContentLoaded', load);