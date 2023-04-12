How to use

1. Clone repo to your machine
2. Open a GIT BASH (linux) terminal
3. All development takes place inside the ./dev folder. 
    * The dev folder should always contain only app.js and index.html
    * There should only be 1 folder called components, and this can have as many .js files inside as you want
    * Write standard react JSX code in app.js and any component .js files. We will transpile to browser-friendly code later
4. When you're ready to preview the app, in terminal run `npm run build` . This will transpile JSX to browser-friendly javascript and also copy index.html. All final files will be stored in ./public
5. Open ./public/index.html in live server to preview

There is a netlify site https://extraordinary-khapse-4c4e7c.netlify.app/ configured to watch github repo https://github.com/CallumBoase/react-into-html and deploy the ./public directory as per branch main automatically.

Therefore you can visit https://extraordinary-khapse-4c4e7c.netlify.app/ to see changes after deploy to github (takes 20 seconds to build or so)


## Loading the react app in a Knack app
See knack-js-area-example.js