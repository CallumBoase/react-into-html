import React from 'react';
import ReactDOM from 'react-dom';

import FellowTable from './components/FellowTable.js';
import HelloWorld from './components/HelloWorld.js';
import MultiFileUploader from './components/MultiFileUploader/MultiFileUploader.js';
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';

const customComponents = {render: {}}

customComponents.render.fellowTable = function fellowTable(settings = { targetDiv }) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <FellowTable />
    </ThemeProvider>,
    document.getElementById(settings.targetDiv)
  );
}

customComponents.render.helloWorld = function helloWorld(settings = { targetDiv }) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <HelloWorld />
    </ThemeProvider>,
    document.getElementById(settings.targetDiv)
  );
}

customComponents.render.multiFileUploader = function multiFileUploader(settings = { targetDiv }) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <MultiFileUploader />
    </ThemeProvider>,
    document.getElementById(settings.targetDiv)
  );
}

window.customComponents = customComponents;