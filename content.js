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

function click_on(element_type, text_content, timeout = 100, first = true) {
    var BreakException = {};
    setTimeout(() => {
        let elements = document.querySelectorAll(element_type);
        try {
          elements.forEach(element => {
            if (element.textContent.trim() === text_content) {
                element.scrollIntoView(
                    {behavior: 'smooth', block: 'center'}
                );
                element.click();
                if(first) {
                    throw BreakException;
                }
            }
          });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
    }, timeout);
}

function request_takeout(takeout_items) {
    // Select required checkboxes
    console.log("request_takeout called");
    // First deselect all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.click();
        }
    });
    // Then select the required checkboxes
    takeout_items.forEach(item => {
        let checkbox = document.querySelector(`input[type="checkbox"][name="${item}"]`);
        if (checkbox && checkbox.type === "checkbox") {
            if(!checkbox.checked) {
                checkbox.click();
            }
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
    // We start on the manage exports page. There should be a list of items, and at least
    // one contains the word "Completed" in a <p> tag.
    // We pick the first one and click.

    click_on("p", "Completed", 50);
    
    // Could click the download button, but leave it for now. 
    
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

