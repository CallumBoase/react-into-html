Create a react component and load it into a static html page 
Instead of including multiple script tags, bundle everything into 1



Sure! Here are the step-by-step instructions for creating a simple React component and loading it into a static HTML page using Webpack to bundle your code:

Install Node.js and npm (Node Package Manager) on your computer if you don’t already have them installed.

Create a new directory for your project and navigate to it in a command prompt or terminal window.

Run the following command to initialize a new Node.js project:

npm init -y
This will create a package.json file in your project directory.

Run the following command to install React, ReactDOM, Webpack, and its dependencies:
npm install --save react react-dom
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-react
Create a new file called your-react-component.js in your project directory and paste the following code into it:
import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('root')
);
Create a new file called webpack.config.js in your project directory and paste the following code into it:
const path = require('path');

module.exports = {
  entry: './your-react-component.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  }
};
Run the following command from your project directory to bundle your code:
npx webpack
This will create a dist directory in your project directory containing the bundled bundle.js file.

Create a new file called index.html in your project directory and paste the following code into it:
<!DOCTYPE html>
<html>
  <head>
    <title>React Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
Open the index.html file in your web browser to see the “Hello, World!” message displayed by your React component.
Is there anything else you’d like to know?