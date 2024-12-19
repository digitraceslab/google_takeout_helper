console.log("document", document)

const requestDataButton = document.getElementById('requestData');
const downloadDataButton = document.getElementById('downloadData');
const uploadDataButton = document.getElementById('uploadData');

requestDataButton.addEventListener('click', () => {
  console.log('Request Data button clicked');
});

downloadDataButton.addEventListener('click', () => {
  console.log('Download Data button clicked');
});

uploadDataButton.addEventListener('click', () => {
  console.log('Upload Data button clicked');
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('deselectAll').addEventListener('click', () => {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        console.log(tabs)
        browser.tabs.sendMessage(
            tabs[0].id,
            { action: 'deselectAll' }
        );
      });
    });
});
