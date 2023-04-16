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
    * We don't actually render any components directly. Instead, we write functions that can be called later, which render components. 
    * The functions we declare will be saved to the browser `window` object to be called on-demand from static html.

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

4. Now create a static html file. Load `./public/customComponents.js` in at the top, then create a target div and call the custom component from the window object using normal javascript. Open this in a browser and you should see "Hello world from react!" as a H1. (no need to run a server - just open the static html page directly in the browser).
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
### More advanced components
Of course, we're going to want to develop much more complex components. You're free to do this just like you would in a normal react app now including:
* Install and using NPM packages
* Writing code in separate files and using `import` and `export` statements to re-use code between different files
* Writing JSX code

Here is an example of a more involved component that uses the Material UI Component library.

1. Install dependencies via terminal by running `npm install XXX` (where XXX is the package/s you want to install)
2. Create a separate component file eg `Advanced.js` in the `components` folder. Write an advanced component as required, including importing dependencies and exporting the component for usage elsewhere.

<details>
    <summary>Example code for Advanced.JS inside here</summary>

```js
// ./components/Advanced.js

import React from 'react';
import * as KnackAPI from 'knack-api-helper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';

//Override default table styling - add !important - to avoid conflict with Knack CSS styling
//We know the need to do this due to trial and error :)
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px !important'
}));

//Define our component which is called Advanced
const Advanced = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {

    //Fetch data from the Knack API to display in our component
    const fetchData = async () => {
      const knackAPI = new KnackAPI({
        applicationId: '63306ddbdfad5247a024XXXX',
        auth: 'view-based'
      });
      const records = await knackAPI.getMany({
        scene: 'scene_161',
        view: 'view_490'
      });
      setRecords(records.records);
      setIsLoading(false);
    };
    fetchData();

  }, []);

  //JSX for our component:
  //--While we wait for the API call, show skeleton loading of 10 table rows
  //--Once the API call has returned records, show them in a table
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                </TableRow>
              ))
            : records.map(record => (
                <TableRow key={record.id}>
                  <StyledTableCell>{record.field_10}</StyledTableCell>
                  <StyledTableCell>{record.field_447_raw}</StyledTableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Advanced;

```

</details>
<br>

3. Import the component into `customComponents_dev.js`. Notice how we still have our original helloWorld component - you can define multiple components to be called on-demand.

```js
//customComponents_dev.js

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Import our custom components
import Advanced from './components/Advanced.js';

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

customComponents.render.advanced = function advanced(settings = { targetDiv }) {
  ReactDOM.render(
    <Advanced />,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
```
4. In terminal, run `npm run build` to compile into the browser-friendly file `./public/customComponents.js`.
5. Create a html file like before, but this time we can call multiple components on-demand

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
      window.customComponents.render.helloWorld({targetDiv: 'helloWorld'});
    </script>
    <div id="advanced"></div>
    <script>
      window.customComponents.render.advanced({targetDiv: 'advanced'});
    </script>
  </body>
</html>
```
## Deploying compiled code
* Once `./public/customComponents.js` has been compiled, you're free to serve it somewhere on the web, and import it into existing projects as required.
* Anywhere that can serve a javascript file will do.

### Netlify hosting
* One option is to set up Netlify site that imports your forked version of this repo and automatically publishes the `public` folder when you make a commit to the `main` branch.
* A sample `netlify.toml` file to setup the build logic is included if you choose to use this method.
* Full instructions on setting up Netlify auto-deploy from github are beyond the scope of this readme, but are easy to find online.

## Local testing
* You can test your compiled components locally. See instructions in `./testing/readme_localTesting.md`

## Using the deployed script in a Knack app
One common use-case is creating a React component to embed into a Knack app, to do more advanced functionality than natively available in Knack.

This section provides some basic instructions for writing React components to include in Knack.

### Summary
* Create your custom components and bundle them as outlined above.
* Deploy your compiled script ( `customComponents.js` ) somewhere on the web
* Load your compiled script into the Knack app. This make your custom components available via `window.customComponents` like described above.
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