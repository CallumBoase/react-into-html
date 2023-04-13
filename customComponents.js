import React from 'react';
import ReactDOM from 'react-dom';

import FellowTable from './components/FellowTable.js';
import HelloWorld from './components/HelloWorld.js';
import MultiFileUpload from './components/MultiFileUpload.js';

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

customComponents.render.multiFileUpload = function multiFileUpload(settings = { targetDiv }) {
  ReactDOM.render(
    <MultiFileUpload />,
    document.getElementById(settings.targetDiv)
  );
}

window.customComponents = customComponents;