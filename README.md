# Webstats

*Webstats is a web service responsible for analyzing the security implemented in the different endpoints of any web domain.*

## Frontend

*Front-end guide for Webstats project.*

### Built with 🛠️

- [Nuxt](https://nuxtjs.org) - The web framework used.
- [Vuetify](https://vuetifyjs.com/) - Web style library.
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client.
- [Vue-echarts](https://www.npmjs.com/package/vue-echarts) - Apacge Echarts chart package optimized for Vue.

### Requirements 📋

*Nuxt installation:*

during the installation of [NodeJS](https://nodejs.org)

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

*Vue-echarts installation:*

```sh
npm install echarts
npm install vue-echarts
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

## Backend

*Back-end guide for Webstats project.*

### Built with 🛠️

- [Node.js](https://nodejs.org/en/) - server of the project.
- [Express](https://www.npmjs.com/package/express) - provides a set of features for web and mobile applications.
- [Cors](https://www.npmjs.com/package/cors) - provides Connect/Express middleware that can be used to enable CORS with various options.
- [Nodemon](https://www.npmjs.com/package/nodemon/v/1.18.10) - automatically restarts the node application when file changes are detected in the directory.
- [Colors](https://www.npmjs.com/package/colors) - allows to set a console output with the desired color.
- [Dotenv](https://www.npmjs.com/package/dotenv) - allows to access the environment variables of the .env file.
- [Mongoose](https://www.npmjs.com/package/mongoose) - allows to establish the connection to the MongoDB database.
- [SengridMail](https://www.npmjs.com/package/@sendgrid/mail) - allows to send emails to a user.
- [Node-ssllabs](https://www.npmjs.com/package/node-ssllabs) - allows to interact with the [SSL Labs API](https://www.ssllabs.com/projects/ssllabs-apis/).
- [WebsiteLogo](https://www.npmjs.com/package/website-logo) - allows to extract de logo from a web domain.
- [Sha256](https://www.npmjs.com/package/sha256) - provides the text encryption algorithm.
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - provides the tools to create user tokens.

### Requirements 📋

*Express:*

```sh
npm install express
```

*Nodemon:*

```sh
npm install nodemon
```

*Colors:*

```sh
npm install colors
```

*Cors:*

```sh
npm install cors
```

*Dotenv:*
```sh
npm install dotenv
```

*Mongoose:*

```sh
npm install mongoose
```

*Sengrid mail:*

```sh
npm install @sendgrid/mail
```

*Node-ssllabs:*

```sh
npm install node-ssllabs
```

*Website logo:*

```sh
npm install website-logo
```

*Sha256:*

```sh
npm install sha256
```

*Jsonwebtoken:*

```sh
npm install jsonwebtoken
```

### Environment configuration ⚙️

*1. Server creation:*
```sh
npm init --yes
```
*2. Create the different files and directories of the project*

*3. Create `.env` file with the necessary environment variables:*

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

## Author ✒️

Julián de Pablo - [@juliandpt](https://www.github.com/juliandpt) - [juliandepablo.com](https://juliandepablo.com/)