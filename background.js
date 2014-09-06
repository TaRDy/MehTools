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