# React For Static HTML
A library to help you easily build react components for rendering on static html pages.

## Purpose
It's often useful to render standalone React components onto static HTML websites. This is especially true when creating customised pages in website builders like Squarespace or in Knack apps.

However, it's tricky to achieve this, especially when you don't have direct access to the server of the website you want to embed on (like in a Knack app or Squarespace).

When following online instructions for rendering react components on existing projects there can be frustrating issues:
* JSX code cannot be run directly in the browser, it requires compiling to normal Javascript first (via Babel)
* Imports between javascript files can get tricky in some circumstances, with CORS errors blocking access to scripts from different domains etc
* If you don't have access to the server filesystem directly, it's tricky to install and use NPM packages (requiring CDNs etc which sometimes don't fully support all features)

This library helps these problems. It's basically some developer tooling and some boilerplate code for developing react components that can be loaded into a static HTML pages via a single script tag (containing all required dependencies) and rendered on-demand.

## Security
* Note that all code you write and bundle using this library is CLIENT-SIDE! So don't include any sensitive information, API keys or similar!

## Setting up your development environment
1. Make sure you have NPM installed on your local machine, and have access to a terminal (eg through VS Studio Code). 
2. Fork this repo and save it your local machine.
3. Open a terminal, navigate to the directory where you have the forked repo, and run `npm install`. This will install dependancies, including dev dependencies.

## Usage

### Basic example
1. Open `customComponents_dev.js`. This file contains boilerplate code which you can modify and extend as needed. It  serves a similar purpose as the entry point for a normal react app (eg app.js), but is used slightly differently
    * We don't actually render any components directly. Instead, we write functions that can be called later. When called, these functions render react components. 
    * The functions we declare will be saved to the browser `window` object to be called on-demand from static html.

```js
//customComponents_dev.js
//This is how it will look when you first open it

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.helloWorld = function hellowWorld(settings = { targetDiv }) {
  ReactDOM.render(
    //JSX code goes here
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
```

2. Write some basic JSX code in place of `//JSX code goes here`, so your file now looks like this:
```js
//customComponents_dev.js

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.helloWorld = function hellowWorld(settings = { targetDiv }) {
  ReactDOM.render(
    <>
        <h1>Hello world from react!</h1>
    </>,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
```
3. Once this is done, open a terminal again, and run `npm run build`. This will instruct webpack to compile `customComponents_dev.js` and all it's dependencies into a single file, and will also convert JSX code to browser-friendly code. The output will get stored in `./public/customComponents.js`

4. Now navigate to `./testing/index.html`. This html file shows some basic boilerplate HTML. Currently, all it does is load the compiled `customComponent.js` in the `<head>`. We'll need to modify it to render our `helloWorld` component.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../public/customComponents.js"></script>
  </head>
  <body>
    <!-- create div and render component into it here -->
  </body>
</html>

```
5. Now, let's modify it to create a `div` called `helloWorld` and then render our `helloWorld` component into that div from the `window` object:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../public/customComponents.js"></script>
  </head>
  <body>
    <div id="helloWorld"></div>
    <script>
      window.customComponents.render.helloWorld({targetDiv: 'helloWorld'})
    </script>
  </body>
</html>

```

6. Now, open `index.html` in a browser and you should see the hello world component rendered. (No need to run a server, just open index.html directly in the browser).

### Multiple components in the window object
It's possible to add multiple different components to the window object, by adding each of them to `customComponents_dev.js`.
Here is an example

```js
//customComponents_dev.js

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.helloWorld = function hellowWorld(settings = { targetDiv }) {
  ReactDOM.render(
    <>
        <h1>Hello world from react!</h1>
    </>,
    document.getElementById(settings.targetDiv)
  );
}

customComponents.render.goodbye = function goodbye(settings = { targetDiv }) {
  ReactDOM.render(
    <>
        <h1>Goodbye from react!</h1>
    </>,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
```

After compiling via `npm run build`, you can now render either or both of these components from `index.html`, like this:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../public/customComponents.js"></script>
  </head>
  <body>
    <div id="helloWorld"></div>
    <div id="goodbye"></div>
    <script>
      window.customComponents.render.helloWorld({targetDiv: 'helloWorld'})
      window.customComponents.render.goodbye({targetDiv: 'goodbye'})
    </script>
  </body>
</html>

```

### Advanced components
Of course, we're going to want to develop much more complex components. You're free to do this just like you would in a normal react app, including:
* Install and using NPM packages
* Writing code in separate files and using `import` and `export` statements to re-use code between different files (including your components themselves)
* Writing JSX code

Various examples are included in `./Examples/example-components`. Each example component has a readme explaining how to set it up, and render it.

## Deploying compiled code
* Once `./public/customComponents.js` has been compiled, you're free to serve it somewhere on the web, and import it into existing projects as required.
* Anywhere that can serve a javascript file will do.

### Netlify hosting
* One option is to set up Netlify site with auto-deploy of the `public` folder from the `main` branch of your github repo.
* A sample `netlify.toml` file to setup this build logic is included if you choose to use this method.
* Full instructions on setting up Netlify auto-deploy from github are beyond the scope of this readme, but are easy to find online.

## Local testing
* For more information on testing your compiled components locally, see instructions in `./testing/readme_localTesting.md`

## Globals.js
In the root directory, you'll see a file called `globals.js`. This (or any other file you want) can be used to store global variables that might be used in all your components. There's nothing special about this file - anything you import into `customComponents_dev.js` will be including in your compiled code.

## Using the deployed script in a Knack app
One common use-case is creating a React component to embed into a Knack app, to do more advanced functionality than natively available in Knack.

This section provides some basic instructions for writing React components to include in Knack.

### Summary
* Create your custom components and bundle them as outlined above.
* Deploy your compiled script ( `customComponents.js` ) somewhere on the web
* Load the script from wherever you're serving it on the we, into your Knack app. This make your custom components available via `window.customComponents` like described above.
* On a Knack scene or view render event, add a target div to the DOM and then call `window.customComponents.yourComponent.render()` and point it at the div you created. Your custom component should now render on the Knack page.

<details>
    <summary>Example code to use in Knack App javascript area</summary>

```js
//Load your compiled component script, so it's available in the window object.
//This is the same as writing <script src="...customComponents.js"> into plain thml
//KnackInitAsync blocks the app loading until callback() is run 
//See https://docs.knack.com/docs/load-external-javascript-files
KnackInitAsync = function($, callback) {

    // REQUIRED: Explicitly include jQuery
    window.$ = $;

    const scripts = [
        {src: 'https://extraordinary-khapse-4c4e7c.netlify.app/customComponents.js'}
    ]
    loadScripts(scripts, callback, () => {console.log('error loading scripts')});
}

//Adding our component after view_79, when view_79 renders
$(document).on('knack-view-render.view_79', function(event, view){
    $(`<div style="width:100%" id='helloWorld'></div>`).insertAfter(`#${view.key}`);
    window.customComponents.render.helloWorld({targetDiv: 'helloWorld'})
})

//Helper function to load scripts into a Knack app
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
```

</details>
<br>

### Local testing when using Knack.window object
* When developing for Knack, you may want to use the `window.Knack` object in your component code, for example `window.Knack.getUserToken()` to get the logged in user's token to validate an API call. This means, your script can only be tested inside Knack, not locally.
* This can become pretty annoying! It's possible to simulate the `window.Knack` object for local testing as discussed in the readme `./testing/readme_localTesting.md`