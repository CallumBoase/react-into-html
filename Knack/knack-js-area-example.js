KnackInitAsync() {
    const scripts = [
        'https://fastidious-frangipane-44e57d.netlify.app/customComponents.js'
    ]
    loadScripts(scripts, callback, () => {console.log('error loading scripts')});
}

//Assuming that we have a rich text view containing <div id="reactComponent"></div> and it's view_76
$(document).on('knack-view-render.view_76', function(event, view, record){
    window.customComponents.helloWorld({targetDiv: 'reactComponent'});
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

