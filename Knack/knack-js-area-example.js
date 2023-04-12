//External scripts to load into the Knack app
//Dependencies for React, React-Dom, MUI and knackApiHelper
const scripts = [
    { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/@mui/material@5/umd/material-ui.production.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/knack-api-helper@2.1.4/browser.js' },
];

//Block the app loading while we load the external scripts
KnackInitAsync = function ($, callback) {
    // REQUIRED: Explicitly include jQuery
    window.$ = $;

    loadScripts(scripts, callback, null)
};

//Assuming that we have a rich text view containing <div id="reactComponent"></div> and it's view_76
$(document).on('knack-view-render.view_76', function(event, view, record){
    loadScripts([{ src: 'https://extraordinary-khapse-4c4e7c.netlify.app/app.js', type: 'module'}])
})

//Helper function to load scripts
const loadScripts = (scripts, onSuccess, onFailure) => {
    let loadedScripts = 0;
    let failedScripts = 0;

    if(typeof onSuccess !== 'function'){
        onSuccess = function(){
            console.log('Scripts loaded');
        }
    }

    if(typeof onFailure !== 'function'){
        onFailure = function(){
            console.error('Failed to load scripts');
        }
    }

    scripts.forEach(({ src, type }) => {
        const script = document.createElement('script');
        script.src = src;
        if (type) {
            script.type = type;
        }

        script.addEventListener('load', () => {
            loadedScripts++;
            if (loadedScripts === scripts.length) {
                onSuccess();
            }
        });

        script.addEventListener('error', () => {
            failedScripts++;
            onFailure();
        });

        document.body.appendChild(script);
    });
};

