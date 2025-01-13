const deselectAllButton = document.getElementById('deselectAll');
const requestDataButton = document.getElementById('requestData');
const downloadDataButton = document.getElementById('downloadData');
const uploadDataButton = document.getElementById('uploadData');

requestDataButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'requestData' });
});

downloadDataButton.addEventListener('click', () => {
  console.log('Download Data button clicked');
});

uploadDataButton.addEventListener('click', () => {
  console.log('Upload Data button clicked');
});

deselectAllButton.addEventListener('click', () => {
  console.log('Deselect Data button clicked');
});