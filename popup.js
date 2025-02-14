// This script is executed in the popup window for the extension 
// (which shows up when you click on the extension).
//
// The popup window contains three buttons: requestData, downloadData,
// and uploadData. When a button is clicked, we send a message to 
// background.js to perform the corresponding action.
//
// The popup also displays an alert message when requested by other
// components.

if (typeof browser === 'undefined') {
  if (typeof importScripts === 'function') {
      // Chrome (service worker)
      importScripts('browser-polyfill.js');
  } else {
      console.error('Browser not supported');
  }
}

const requestDataButton = document.getElementById('requestData');
const downloadDataButton = document.getElementById('downloadData');
const uploadDataButton = document.getElementById('uploadData');

console.log('Popup script loaded');

requestDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'requestData' });
});

downloadDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'downloadData' });
});

uploadDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'uploadData' });
});

function resizePopup() {
  const popup = document.querySelector('html');
  const height = popup.scrollHeight;
  const width = popup.scrollWidth;
  popup.style.height = `${height}px`;
  popup.style.width = `${width}px`;
}

browser.runtime.onMessage.addListener((message) => {
  console.log('Someone called content popup', message);
  if (message.action === 'showAlert') {
    alertContainer.textContent = message.message;
    alertContainer.style.display = 'block';
    resizePopup();
  }
});
