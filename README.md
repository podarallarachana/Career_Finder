### _**NOTES**_ 

- Frontend Debugging Tools: React Developer Tools, Redux DevTools
- Backend Debugging Tools: Mongo Shell, Postman
- Deployment Debugging Tools: Heroku CLI

## Deploy to Heroku
- Clone the project, cd into the root folder, and run npm install. 
- Create a MongoDB database either locally or on MongoDB Atlas and note your connection credentials. 
- Create a config file (make sure to name it config.js) in the config folder, which exports your db.uri  connection (from MongoDB - Atlas). This file will be ignored by git so your db credentials will be kept safe when the app is deployed. In addition to the required uri, a entry for "token" must also exist in the db entry. This is used for bcrypt and can be a small passphrase such as "bittersweet".
- Create an environmental variables file (make sure to name it “.env”) in the client root folder, which stores all of your API keys. This file will be ignored by git so your API keys will be kept safe when the app is deployed. 
- Add your environment variables and config variables to your Heroku Site account (they must be the same values as what you have locally). 
- Make sure master is working as it should, then click the deploy button next to your site on Heroku. 

## Local Development
- Clone the project and run npm install. 
- Create a MongoDB database either locally or on MongoDB Atlas and note your connection credentials. 
- Create a config file (make sure to name it config.js) in the config folder, which exports your db.uri  connection (from MongoDB Atlas). This file will be ignored by git so your db credentials will be kept safe when the app is deployed. In addition to the required uri, a entry for "token" must also exist in the db entry. This is used for bcrypt and can be a small passphrase such as "bittersweet".
- Create an environmental variables file (make sure to name it “.env”) in the client root folder, which stores all of your API keys. This file will be ignored by git so your API keys will be kept safe when the app is deployed. 

## Useful API and Config Information

CareerOneStop API
Required: User ID and API Token
Obtained via: https://www.careeronestop.org/Developers/WebAPI/registration.aspx

College Scorecard API
Required: API Token
Obtained via:	https://collegescorecard.ed.gov/data/documentation/
  or:	https://api.data.gov/signup/

Environmental Variables

.env file
The API information listed in section 9.1 needs to be added to the .env file found in the <ProjectRoot>/client directory. If the file does not exist it can be created in place as a text file and saved as “.env”. The file should have the following format:
REACT_APP_USER_ID=[CareerOneStop User ID]
REACT_APP_TOKEN=[CareerOnestop API Token]
REACT_APP_TOKEN_SCORECARD=[College Scorecard API Token]
where [CareerOneStop User ID] and [CareerOnestop API Token] are the User ID and API token, respectively, obtained from CareerOneStop and [College Scorecard API Token] is the API token obtained from College Scorecard.

config.js file
In addition to API information, the MongoDB server information will also need to have access control information added. This will be added to the config.js file found in the <ProjectRoot>/server/config/ directory. As with the .env file, if not found it can be added in place as a text file named “config.js”. The file should have the following format:
module.exports = {
db: {
uri:"mongodb+srv://[USERNAME]:[PASSWORD]@[DB HOSTNAME]"
token: "[PASSPHRASE]"
    }
  };
where [USERNAME] is the database username, [PASSWORD] is the database password, and [DB HOSTNAME] is the address of the mongoDB database itself. [PASSPHRASE] can be any word or short phrase such as "bittersweet".


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

### _**Developers**_ 

- Rachana Podaralla
- Dave Hellmer
- Justin Calma
