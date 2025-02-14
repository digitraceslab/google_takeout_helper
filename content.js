// This script is added to the actual website and can modify diplayed
// content. It listens for messages from the background script and performs
// the corresponding action.
//
// The actions are:
//  - requestData: Run the workflow to request data from Google Takeout.
//                 Selects the required checkboxes and clicks appropriate
//                 buttons to start the export process.
//  - downloadData: Clicks the download button on the Google Takeout page.
//
// The script is loaded into the page when it matches the URL
// "takeout.google.com". However nothing is executed unless a message is
// received first.

console.log("content.js loaded");

if (typeof browser === 'undefined') {
    if (typeof importScripts === 'function') {
        // Chrome (service worker)
        importScripts('browser-polyfill.js');
    } else {
        console.error('Browser not supported');
    }
}

// Below is a list of items that will be included in the Takeout request. Comment
// out any that are not required for the study.

function click_on(element_type, text_content, timeout = 100) {
    setTimeout(() => {
        let elements = document.querySelectorAll(element_type);
        elements.forEach(element => {
            if (element.textContent.trim() === text_content) {
                console.log(element);
                element.scrollIntoView(
                    {behavior: 'smooth', block: 'center'}
                );
                element.click();
            }
        });
    }, timeout);
}

function request_takeout(takeout_items) {
    // Select required checkboxes
    console.log("request_takeout called");
    // First deselect all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Then select the required checkboxes
    takeout_items.forEach(item => {
        let checkbox = document.querySelector(`input[type="checkbox"][name="${item}"]`);
        if (checkbox && checkbox.type === "checkbox") {
            checkbox.checked = true;
        }
    });
    
    // Click on the button containing "Next step"
    click_on("button", "Next step", 1);

    // wait for a moment for the next panel to open
    click_on("div", "2 GB", 500);
    click_on("li", "50 GB", 500);

    // Click on the button containing "Create export"
    click_on("button", "Create export", 500);
}


function download_data() {
    // We start on the manage exports page. We expect a single file export, which should
    // have a download link immediately visible
    let download_button = document.querySelector('button[aria-label="Download"]');
    if(download_button){
        console.log(download_button);
        download_button.click();
    } else {
        console.error("Download button not found");
    }
}


browser.runtime.onMessage.addListener(msg => {
    console.log('Someone called content', msg);
    
    if(msg["action"] == "requestData"){
        request_takeout(msg["payload"]["takeout_items"]);
    }
    
    if(msg["action"] == "downloadData"){
        download_data();
    }
});

