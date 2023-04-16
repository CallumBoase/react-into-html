# A library helping build react components for rending on static html pages

## Purpose
It's often useful to render standalone React components onto static HTML websites. This is especially true when creating customised pages in website builders like Squarespace or in Knack apps.

However, it's tricky to achieve this, especially when you don't have direct access to the server of the website you want to embed on (like in a Knack app or Squarespace).

When following online instructions in these circumstances you often run into frustrating issues, especially when you don't have direct access to the server or terminal for the website you're adding the component to:
* JSX code cannot be run directly in the browser, it requires compiling to normal Javascript first (via Babel)
* Imports between javascript files can get tricky in some circumstances, with CORS errors blocking access to scripts from different domains etc
* If you don't have access to the server filesystem directly, it's tricky to install and use NPM packages (requiring CDNs etc which sometimes don't fully support all features)

This library helps these problems, by providing a workable environment for developing react components that can be loaded into a static HTML pages via a single script tag (containing all required dependencies) and rendered into a target DIV as required.

## Setting up your development environment
1. Fork this repo from github.com and open it in VS Studio Code.
2. Open a terminal and run `NPM install` to install dependancies

## Usage

### Basics
1. Open `customComponents_dev.js`. This file serves a similar purpose as the entry point for a normal react app (eg app.js), but is used slightly differently:
    * We don't actually render any components directly. Instead, we write functions that can be called to render components. 
    * The functions we declare are then saved to the browser window object

2. Write a basic react component in `customComponents_dev.js` like so:
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
3. Once this is done, open a terminal and run `npm run build`. This will instruct webpack to compile `customComponents_dev.js` and all it's dependencies into a single file, and will also convert JSX code to browser-friendly code. The output will get stored in `./public/customComponents.js`

4. Now create a static html file. Load `./public/customComponents.js` in at the top, then create a target div and call the custom component from the window object using normal javascript. Open this in a browser and you should see "Hello world from react!" as a H1. (no need to run a server - just open the static html page).
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
2. Create a separate component file called `FellowTable.js` in the `components` folder. This component imports it's dependencies and exports the component for usage elsewhere.

```js
// ./components/Fellowtable.js

import React from 'react';
import * as KnackAPI from 'knack-api-helper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px !important'
}));

const FellowTable = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [fellows, setFellows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const knackAPI = new KnackAPI({
        applicationId: '63306ddbdfad5247a024eac3',
        auth: 'view-based'
      });
      const fellows = await knackAPI.getMany({
        scene: 'scene_161',
        view: 'view_490'
      });
      setFellows(fellows.records);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Cohort</StyledTableCell>
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
            : fellows.map(fellow => (
                <TableRow key={fellow.id}>
                  <StyledTableCell>{fellow.field_10}</StyledTableCell>
                  <StyledTableCell>{fellow.field_447_raw}</StyledTableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FellowTable;

```

3. Import the component into `customComponents_dev.js`. Notice how we still have our original helloWorld component - you can define multiple components to be called on-demand.

```js
//customComponents_dev.js

//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Import our custom components
import FellowTable from './components/FellowTable.js';

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

customComponents.render.fellowTable = function fellowTable(settings = { targetDiv }) {
  ReactDOM.render(
    <FellowTable />,
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
    <div id="fellowTable"></div>
    <script>
      window.customComponents.render.fellowTable({targetDiv: 'fellowTable'});
    </script>
  </body>
</html>
```
## Deploying compiled code
* Once `./public/customComponents.js` has been compiled, you're free to serve it somewhere on the web, and import it into existing projects as required.

### Netlify
* You could set up Netlify site that imports your forked version of this repo and automatically publishes the `public` folder when you make a commit to the `main` branch.
* A sample `netlify.toml` file is included for this purpose.
* Full instructions on setting up Netlify auto-deploy from github are beyond the scope of this readme, but are easy to find online.

### Deploying somewhere else
* You don't need to deploy to Netlify. Anywhere that can host a javascript file will do.

## Using the deployed in a Knack app

### Local testing when using Knack.window object

## Netlify auto-deploying
new commits to the MAIN branch of this (original) repo will trigger an auto-deploy of the DIST folder to Netlify.
Netlify will NOT run `npm run build` during deployment, so make sure you have run this before pushing to github.

## Why?
If you want to add a react component to a HTML page (like in a Knack app) this is useful.

Compiling it like this means you can develop in React using normal conventions, and then compile it into a single script file where you custom components can be rendered on a static HTML page on-demand.

Doing it this way, we avoid a bunch of complexity from other methods, including browsers being unable to render JSX, cross origin issues of import statements in script tags etc. It becomes quite maintainable.