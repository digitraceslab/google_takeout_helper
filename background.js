importScripts("./browser-polyfill.js");


browser.runtime.onInstalled.addListener(() => {
    console.log('Google Takeout Helper extension installed.');
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Someone called');
});
