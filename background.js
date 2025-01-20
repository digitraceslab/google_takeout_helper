importScripts("./browser-polyfill.js");


browser.runtime.onInstalled.addListener(() => {
    console.log('Google Takeout Helper extension installed.');
});

function load_url_with_action(url, action_name){
    browser.tabs.create({ url: url }).then((tab) => {
        function handleTabUpdate(updatedTabId, changeInfo, updatedTab) {
            if (updatedTabId === tab.id && changeInfo.status === 'complete') {
                browser.tabs.sendMessage(
                    tab.id, { action: action_name }
                );
            }
        }
        
        browser.tabs.onUpdated.addListener(handleTabUpdate);
    }).catch((error) => {
        console.error('Error creating tab:', error);
    });
}


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Someone called', message);
    
    if(message.action === "requestData"){
        load_url_with_action("https://takeout.google.com", 'requestData');
    }

    if(message.action === "downloadData"){
        load_url_with_action("https://takeout.google.com/manage", 'downloadData');
    }

    if(message.action === "uploadData"){
        // Open the upload page (test page for now)
        browser.tabs.create({ url: "127.0.0.1:8000/accounts/upload_takeout/" });
    }
});
