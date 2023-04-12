import React from 'react';
import ReactDOM from 'react-dom';

import FellowTable from './components/FellowTable.js';
import HelloWorld from './components/HelloWorld.js';

window.customComponents = [

  {

    fellowTable(settings = {targetDiv}) {

      ReactDOM.render(
        <>
          <h1>Hello! Fixed!</h1>
          <FellowTable />
        </>,
        document.getElementById(settings.targetDiv)
      );
  
    },

    helloWorld(settings = {targetDiv}) {
        
        ReactDOM.render(
          <HelloWorld />,
          document.getElementById(settings.targetDiv)
        );
    
      }

  }

]