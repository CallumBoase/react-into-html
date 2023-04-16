//This is the entry point for our custom components
//Webpack will start here when compiling our code into a single browser-friendly file

//This file serves a similar purpose as the entry point for a normal react app (eg app.js)
//The main difference is this:
//  We don't actually render components when we run this file
//    But instead, we write functions that can be called to render components
//  After this script has been loaded into a html page, we can call the component rendering functions from browser JS
//    Eg by running window.customComponents.render.componentName({targetDiv: 'someId'})
//    See ./testing/index.html for example usage

//Apart from the differences described above, you can treat this file like any other react app
//  -Including:
//    -Installing and using npm packages
//    -Importing dependencies from packages or other files in the directory or sub-directories
//    -Writing JSX code in this file (or any dependencies) 
//       (because we will compile JSX into normal javascript when we run `npm run build` (using babel))

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Import our custom components
import FellowTable from './Examples/example-components/FellowTable.js';
import HelloWorld from './Examples/example-components/HelloWorld.js';
import MultiFileUploader from './Examples/example-components/MultiFileUploader/MultiFileUploader.js';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.fellowTable = function fellowTable(settings = { targetDiv }) {
  ReactDOM.render(
    <FellowTable />,
    document.getElementById(settings.targetDiv)
  );
}

customComponents.render.helloWorld = function helloWorld(settings = { targetDiv }) {
  ReactDOM.render(
    <HelloWorld />,
    document.getElementById(settings.targetDiv)
  );
}

customComponents.render.multiFileUploader = function multiFileUploader(settings = { targetDiv }) {
  ReactDOM.render(
    <MultiFileUploader />,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;