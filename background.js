// Check if the environment is a service worker (Chrome) or a regular script (Firefox)
if (typeof browser === 'undefined') {
    if (typeof importScripts === 'function') {
        // Chrome (service worker)
        importScripts('browser-polyfill.js');
    } else {
        console.error('Browser not supported');
    }
}


browser.runtime.onInstalled.addListener(() => {
    console.log('Google Takeout Helper extension installed.');
});

function load_url_with_action(url, action_name, payload){
    browser.tabs.create({ url: url }).then((tab) => {
        function handleTabUpdate(updatedTabId, changeInfo, updatedTab) {
            if (updatedTabId === tab.id && changeInfo.status === 'complete') {
                browser.tabs.sendMessage(
                    tab.id, { action: action_name, payload: payload }
                );
            }
        }
        
        browser.tabs.onUpdated.addListener(handleTabUpdate);
    }).catch((error) => {
        console.error('Error creating tab:', error);
    });
}


function fetchTakeoutItems(url) {
    const origin = new URL(url).origin;
    return fetch(`${origin}/api/takeout_items/`)
        .then(response => response.json())
        .then(data => data.items)
}


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Someone called background', message);
    
    if(message.action === "requestData"){
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            const currentTab = tabs[0];
            const url = new URL(currentTab.url);
            const studyPageUrl = url.origin
            try {
                fetchTakeoutItems(studyPageUrl).then(takeout_items => {
                    console.log('Takeout items:', takeout_items);
                    localStorage.setItem('studyPageUrl', studyPageUrl);
                    load_url_with_action("https://takeout.google.com", 'requestData', {"takeout_items": takeout_items});
                }).catch(error => {
                    console.error('Error fetching takeout items:', error);
                    browser.runtime.sendMessage({ action: 'showAlert', message: 'Please open the study page and try again.' });
                });
            } catch(error) {
                console.error('Error fetching takeout items:', error);
                browser.runtime.sendMessage({ action: 'showAlert', message: 'Please open the study page and try again.' });
            }
        });
    }

    if(message.action === "downloadData"){
        load_url_with_action("https://takeout.google.com/manage", 'downloadData', {});
    }

    if(message.action === "uploadData"){
        // Open the upload page (test page for now)
        const studyPageUrl = localStorage.getItem('studyPageUrl')
        // Check if the current page is a study page
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            const currentTab = tabs[0];
            fetchTakeoutItems(currentTab.url).then(takeout_items => {
                const url = new URL(currentTab.url);
                const uploadUrl = `${url.origin}/accounts/upload_takeout/`;
                browser.runtime.sendMessage({ action: 'showAlert', message: 'Note: using currently open study page. If you are participating in a different study, please close this page and try again.' });
                browser.tabs.create({ url: uploadUrl });
            }).catch(error => {
                // Check if the study page URL is already stored
                if (studyPageUrl) {
                    browser.tabs.create({ url: `${studyPageUrl}/accounts/upload_takeout/` });
                } else {
                    browser.runtime.sendMessage({ action: 'showAlert', message: 'Please open the study page and try again.' });
                }
            });
        });
    }
});
