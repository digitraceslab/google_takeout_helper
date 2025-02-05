console.log("content.js loaded");

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
    //click_on("button", "Create export", 500);
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

function upload_data() {
}


browser.runtime.onMessage.addListener(msg => {
    console.log('Someone called', msg);
    
    if(msg["action"] == "requestData"){
        request_takeout(msg["payload"]["takeout_items"]);
    }
    
    if(msg["action"] == "downloadData"){
        download_data();
    }
    
    if(msg["action"] == "uploadData"){
        upload_data();
    }
});

