const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("MongoDB is connected to:", db.connection.host))
  .catch((error) => console.error(error))