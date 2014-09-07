//background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorageByKey")
      sendResponse({data: localStorage[request.key]});
  	else if (request.method == "getLocalStorage")
  		sendResponse({data: localStorage });
    else
      sendResponse({}); // snub them.
});

// Show the Page Action icon if we are on the correct site
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (~tab.url.indexOf('meh.com/forum')) {
  	console.log('background tab id is:' + tabId);
    chrome.pageAction.show(tabId);
  }
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        // lets setup the local storage to some defaults
        localStorage['use_badge'] = true;
        localStorage['use_blame_button'] = true;
        localStorage['use_self_star'] = false;

        localStorage['username'] = DEFAULT_USERNAME;
        localStorage['badge'] = DEFAULT_BADGE;
        localStorage['goat'] = DEFAULT_GOAT;
        localStorage['goat_curse'] = DEFAULT_GOAT_CURSE;

    }else if(details.reason == "update"){
        // do nothing here for now, keep the user's settings

        //var thisVersion = chrome.runtime.getManifest().version;
        //console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
