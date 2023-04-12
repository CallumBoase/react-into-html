# A react component that can be compiled into browser-friendly code

## How to install
1. Clone this repo
2. Run NPM install to install dependancies
3. Build your react component as needed. You can install new dependencies, split your files into folders etc, just make sure the entry point is index.js
4. When finished, run in terminal `npx webpack` . This will compile index.js and all dependencies into ./dist/bundle.js
5. Once that is done, you can use bundle.js in a static html file like index.html