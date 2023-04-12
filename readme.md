How to use

1. Clone repo to your machine
2. Run NPM install to install dev dependencies
3. app.js should remain unchanged
4. ./components can contain any number of components you require. Write them in normal react JSX code
5. When you're ready run `npx babel app.js ./components --out-dir public` to compile JSX code (app.js and anything inside ./components) into browser-friendly javascript.
6. Open index.html in live server to preview