KnackInitAsync = function($, callback) {

    // REQUIRED: Explicitly include jQuery
    window.$ = $;

    const scripts = [
        {src: 'https://extraordinary-khapse-4c4e7c.netlify.app/customComponents.js'}
    ]
    loadScripts(scripts, callback, () => {console.log('error loading scripts')});
}

$(document).on('knack-scene-render.scene_53', function(event, scene){
    console.log('scene_53')
    $(`<div id='fellowTable'></div>`).appendTo(`#kn-${scene.key}`);
    window.customComponents.render.fellowTable({targetDiv: 'fellowTable'});
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

