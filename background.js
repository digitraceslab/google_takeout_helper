importScripts("./browser-polyfill.js");


browser.runtime.onInstalled.addListener(() => {
    console.log('Google Takeout Helper extension installed.');
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Someone called', message);
    
    if (message.action === 'requestData') {
        browser.tabs.create({ url: "https://takeout.google.com" }).then((tab) => {

            function handleTabUpdate(updatedTabId, changeInfo, updatedTab) {
                if (updatedTabId === tab.id && changeInfo.status === 'complete') {
                    console.log('Tab is loaded');
                    browser.tabs.sendMessage(
                        tab.id, { action: 'requestData' }
                    );
                }
            }
            
            browser.tabs.onUpdated.addListener(handleTabUpdate);
        }).catch((error) => {
            console.error('Error creating tab:', error);
        });
    }
});

