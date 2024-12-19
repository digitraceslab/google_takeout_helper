console.log("content.js loaded");

browser.runtime.onMessage.addListener(msg => {
    console.log('Someone called', msg);
});

console.log("listener added");