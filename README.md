# Webstats

*Webstats is a web service responsible for collecting relevant information from the .*

## Frontend

*Front-end guide for Webstats project.*
### Requirements 📋

*Nuxt installation:*

```sh
npm init nuxt-app <project-name>
```

*Vuetify installation:*

during the installation of the nuxt project.

*- or -*

```sh
vue add vuetify
```

*Axios installation:*

during the installation of the nuxt project.

*- or -*

```sh
npm install axios
```

*Axios installation:*

```sh
npm install axios
```

### Environment configuration ⚙️

*Project creation:*

```sh
npm init nuxt-app <project-name>
```

*Install dependencies:*

```sh
npm install
```

*Execute project in development mode:*

```bash
npm run dev
```

### Deployment 📦

*Build for production and launch server:*

```sh
npm run build
npm run start
```

*Generate static project:*

```sh
npm run generate
```

*For more help, visit the [Nuxt Documentation page](https://nuxtjs.org/docs).*

### Built with 🛠️

- [Nuxt](https://nuxtjs.org) - The web framework used
- [Vuetify](https://vuetifyjs.com/) - Web style library
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client

## Backend

*Back-end guide for Webstats project.*

### Requirements 📋

*Express:*

```sh
npm install express
```

*Nodemon:*

```sh
npm install nodemon
```

*Cors:*

```sh
npm install cors
```

*Dotenv:*
```sh
npm install dotenv
```

*Pg:*

```sh
npm install pg
```

*Sengrid mail:*

```sh
npm install @sendgrid/mail
```

*Colors:*

```sh
npm install colors
```

### Environment configuration ⚙️

*1. Server creation:*
```sh
npm init --yes
```
*2. Create the different files and directories of the project*

*3. Create `.env` file and add the following environment variables:*

```.env
PORT=8080
DATABASE_URL=postgres://ovrkgbvvuyafcj:11b8210583fa658f4bc07d44ad5acd6bd9407299bdc55c8651dce70741696b45@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d59n4a1tuqvqk8
SENDGRID_API_KEY=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
```

*4. Add the next line on package.json file:*
```tree
└─ server
    └─ package.json
        └─ "scripts"
            └─ *"dev": "nodemon server.js"*
```

### Deployment 📦

*Activate server:*
```sh
npm run dev
```

### Built with 🛠️

- [node.js](https://nodejs.org/en/) - server of the project.
- [Express](https://www.npmjs.com/package/express) - provides a set of features for web and mobile applications
- [Cors](https://www.npmjs.com/package/cors) - provides Connect/Express middleware that can be used to enable CORS with various options
- [Nodemon](https://www.npmjs.com/package/nodemon/v/1.18.10) - automatically restarts the node application when file changes are detected in the directory
- [Dotenv](https://www.npmjs.com/package/dotenv) - allows to access the environment variables of the .env file
- [Pg](https://www.npmjs.com/package/mariadb) - allows to establish the connection to the Postgresql-Heroku database
- [SengridMail](https://www.npmjs.com/package/@sendgrid/mail) - allows you to send emails to a user
- [Colors](https://www.npmjs.com/package/colors) - allows you to set a console output with the desired color.

## Authors ✒️

Julián de Pablo - [@juliandpt](https://www.github.com/juliandpt) - [juliandepablo.com](https://juliandepablo.com/)