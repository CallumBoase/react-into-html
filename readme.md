# A react component that can be compiled into browser-friendly code

## Development environment
1. Clone this repo from github.com
2. Run NPM install to install dependancies
3. Build your react component as needed in the components folder. You can install new dependencies, split your files into folders etc
4. To make your custom component accessible, add it to customComponents.js as under customComponents.render as per example in that file. This makes your custom component accessible under `window.customComponents.render.yourComponent()` when loading into a static html page.
4. When finished, run in terminal `npm run build` . This will compile index.js and all dependencies into `./dist/customComponents.js`
5. Once that is done, you can use `./dist/customComponents.js` in a static html page and render your custom components as required, see `index.html` as an example.

## Netlify auto-deploying
new commits to the MAIN branch of this (original) repo will trigger an auto-deploy of the DIST folder to Netlify.
Netlify will NOT run `npm run build` during deployment, so make sure you have run this before pushing to github.

## Why?
If you want to add a react component to a HTML page (like in a Knack app) this is useful.

Compiling it like this means you can develop in React using normal conventions, and then compile it into a single script file where you custom components can be rendered on a static HTML page on-demand.

Doing it this way, we avoid a bunch of complexity from other methods, including browsers being unable to render JSX, cross origin issues of import statements in script tags etc. It becomes quite maintainable.