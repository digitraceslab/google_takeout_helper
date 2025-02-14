# google_takeout_helper

A browser extension for simplifying user interaction with Google 
Takeout


## Installation

Currently only available using developer tools.

1. Clone the repository
2. Open the browser extension page
3. Enable developer mode
4. Load the extension from the cloned repository

### Study Page

The extension requires information from a study page. It is
intended to work with [google_takeout_export](https://github.com/digitraceslab/google_takeout_export).

The study page must provide an api entrypoint at 
"/api/takeout_items" that responds with a JSON object containing
a list of required items from Google Takeout. The JSON object
should be formatted as

```json
{
    "takeout_items": {
        "test": [
            "ITEM_NAME"
        ]
    }
}
```

A full list of possible items, as of February 2025, is provided at
the bottom of the file https://github.com/digitraceslab/google_takeout_export/blob/main/google_takeout_export/views.py.

Each item name is actually the "name" property of a checkbox tag on
takeout.google.com.

## Usage

1. Navigate to the study page
2. If you have not already, create an account and fill in the consent
   form.
3. Click the extension icon and click on "Request Data". This should
   submit a request to Google.
4. Google informs you that the takout request is ready. Click the
   extension icon and click on "Download Data". This should download
   a zip file containing the requested data.
5. Click on the extension icong and click on Upload Data. This takes
   you to the donwload page on the study site. Upload the zip file.

