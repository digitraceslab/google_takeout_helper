const requestDataButton = document.getElementById('requestData');
const downloadDataButton = document.getElementById('downloadData');
const uploadDataButton = document.getElementById('uploadData');

requestDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'requestData' });
});

downloadDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'downloadData' });
});

uploadDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'uploadData' });
});

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'showAlert') {
    alert(message.message);
  }
});
