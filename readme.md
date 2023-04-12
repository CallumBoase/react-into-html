How to use

1. Clone repo to your machine
2. Open a GIT BASH (linux) terminal
3. All development takes place inside the ./dev folder. 
    * The dev folder should always contain only app.js and index.html
    * There should only be 1 folder called components, and this can have as many .js files inside as you want
    * Write standard react JSX code in app.js and any component .js files. We will transpile to browser-friendly code later
4. When you're ready to preview the app, in terminal run `npm run build` . This will transpile JSX to browser-friendly javascript and also copy index.html. All final files will be stored in ./public
5. Open ./public/index.html in live server to preview