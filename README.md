### _**NOTES**_ -

- Frontend Debugging Tools: React Developer Tools, Redux DevTools
- Backend Debugging Tools: Mongo Shell, Postman
- Deployment Debugging Tools: Heroku CLI

## Deploy to Heroku
- Clone the project, cd into the root folder, and run npm install. 
- Create a MongoDB database either locally or on MongoDB Atlas and note your connection credentials. 
- Create a config file (make sure to name it config.js) in the config folder, which exports your db.uri  connection (from MongoDB - Atlas). This file will be ignored by git so your db credentials will be kept safe when the app is deployed. 
- Create an environmental variables file (make sure to name it “.env”) in the client root folder, which stores all of your API keys. This file will be ignored by git so your API keys will be kept safe when the app is deployed. 
- Add your environment variables and config variables to your Heroku Site account (they must be the same values as what you have locally). 
- Make sure master is working as it should, then click the deploy button next to your site on Heroku. 

## Local Development
- Clone the project and run npm install. 
- Create a MongoDB database either locally or on MongoDB Atlas and note your connection credentials. 
- Create a config file (make sure to name it config.js) in the config folder, which exports your db.uri  connection (from MongoDB Atlas). This file will be ignored by git so your db credentials will be kept safe when the app is deployed. 
- Create an environmental variables file (make sure to name it “.env”) in the client root folder, which stores all of your API keys. This file will be ignored by git so your API keys will be kept safe when the app is deployed. 

## How to start the server

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. If you are interested in how this works follow the nodemon In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script server`

Runs just the server in development mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## File structure

#### `client` - Holds the client application

- #### `public` - This holds all of our static files
- #### `src`
  - #### `assets` - This folder holds assets such as images, docs, and fonts
  - #### `components` - This folder holds all of the different components that will make up our views
  - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
  - #### `App.js` - This is what renders all of our browser routes and different views
  - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
- #### `.env` - Holds all the environment variables like API keys

#### `server` - Holds the server application

- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client

#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README

#### `.gitignore` - Tells git which files to ignore

#### `README` - This file!

## Learn More

- React: https://reactjs.org/docs/getting-started.html
- Node: https://nodejs.org/en/docs/
- Express: https://expressjs.com/
- Heroku: https://devcenter.heroku.com/categories/reference
- MongoDB Atlas: https://docs.atlas.mongodb.com/

### _**Developers**_ -

- Rachana Podaralla
- Dave Hellmer
- Justin Calma
