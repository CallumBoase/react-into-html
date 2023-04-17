# Using example components
1. Each of the example components uses slightly different dependencies. You can either manually determine what is needed for the component you want to test, or (easier) you can make sure the dependencies section of your `package.json` contains the below (at minimum). Thenm in a terminal, run `npm install` to install the missing packages.
```js
    {
        "dependencies": {
            "@emotion/react": "^11.10.6",
            "@emotion/styled": "^11.10.6",
            "@mui/icons-material": "^5.11.16",
            "@mui/material": "^5.12.0",
            "axios": "^1.3.5",
            "knack-api-helper": "^2.1.4",
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
        },
    }

```

2. Adjust the example component (if needed) to work with your specific configuration or environment (eg your own Knack app).
    * HelloWorld.js should not require any adjustment
    * DataTable.js will require adjustment - see line 1-14 of DataTable.js
    * MultiFileUploader.js 
        * will require adjustment. Everything that needs adjusting is found in this file: `./Examples/example-components/MultiFileUploaders/globals.js`
        * The API calls to Knack in this component are authenticated via window.Knack.getUserToken(), so to test it locally, you'll need to update the `./testing/knackWindow.js` file as per instructions in `./testing/readme_testing.md`.

3. Once your components are configured, follow the normal instructions (see `readme.md`) to bundle them into 1 browser-friendly file and load them into a static HTML page.
