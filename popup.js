if (typeof browser === 'undefined') {
  if (typeof importScripts === 'function') {
      // Chrome (service worker)
      importScripts('webextension-polyfill.js');
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
