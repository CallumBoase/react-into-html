# A react component that can be compiled into browser-friendly code

## How to install
1. Clone this repo
2. Run NPM install to install dependancies
3. Build your react component as needed. You can install new dependencies, split your files into folders etc, just make sure the entry point is index.js
4. When finished, run in terminal `npx webpack` . This will compile index.js and all dependencies into ./dist/bundle.js
5. Once that is done, you can use bundle.js in a static html file like index.html

## Why?
If you want to add a react component to a HTML page (like in a Knack app) this is useful.

Compiling it like this means you can develop in React using normal conventions, and then compile it into a single script file that can be rendered on a static HTML page.

We avoid a bunch of complexity from other methods, including browsers being unable to render JSX, cross origin issues of import statements in script tags etc.