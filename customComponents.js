import React from 'react';
import ReactDOM from 'react-dom';

import FellowTable from './components/FellowTable.js';
import HelloWorld from './components/HelloWorld.js';
import MultiFileUploader from './components/MultiFileUploader/MultiFileUploader.js';

const customComponents = {render: {}}

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

window.customComponents = customComponents;