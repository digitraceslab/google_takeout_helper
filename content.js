console.log("content.js loaded");

// Below is a list of items that will be included in the Takeout request. Comment
// out any that are not required for the study.

const takeout_items = [
//    "Access Log Activity",
//    "Alerts",
//    "Android Device Configuration Service",
//    "Arts & Culture",
//    "Assignments",
//    "Blogger",
//    "Calendar",
//    "Canvas",
//    "Chrome",
//    "Classroom",
//    "Contacts",
//    "Crisis User Reports",
//    "Cursive",
//    "Data Shared for Research",
//    "Discover",
//    "Drive",
//    "Embark",
//    "Firebase Dynamic Links",
    "Fit",
    "Fitbit",
    "Gemini",
//    "Google Account",
//    "Google Business Profile",
//    "Google Chat",
//    "Google Cloud Search",
//    "Google Developers",
//    "Google Earth",
//    "Google Feedback",
//    "Google Finance",
//    "Google Help Communities",
//    "Google Meet",
//    "Google One",
//    "Google Pay",
//    "Google Photos",
//    "Google Play Books",
//    "Google Play Console",
//    "Google Play Games Services",
//    "Google Play Movies & TV",
//    "Google Play Store",
//    "Google Podcasts",
//    "Google Shopping",
//    "Google Store",
//    "Google Translator Toolkit",
//    "Google Workspace Marketplace",
//    "Groups",
//    "Home App",
//    "Keep",
    "Location History (Timeline)",
    "Mail",
//    "Maps",
//    "Maps (your places)",
    "Messages",
    "My Activity",
//    "My Maps",
//    "Network Planner",
//    "News",
//    "Personal Safety",
//    "Phone Audio",
//    "Pinpoint",
//    "Profile",
//    "Purchases & Reservations",
//    "Reminders",
//    "Saved",
//    "Search Contributions",
//    "Search Notifications",
//    "Street View",
//    "Tasks",
//    "Voice",
//    "YouTube and YouTube Music",
]

function request_takeout() {
    // Select required checkboxes
    console.log("selectCheckboxes called");
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

    // Click on the button containit "Next step"
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.trim() === "Next step") {
            button.click();
        }
    });
}

browser.runtime.onMessage.addListener(msg => {
    console.log('Someone called', msg);
    if(msg["action"] == "requestData"){
        request_takeout();
    }
});

console.log("listener added");