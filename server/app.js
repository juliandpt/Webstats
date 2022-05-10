const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('colors')

const app = express();
const port = process.env.PORT || 8080
const domain = require('./models/domain')
const admin = require('./models/admin')
const contact = require('./models/contact')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/domain', domain)
app.use('/admin', admin)
app.use('/contact', contact)

app.listen(port, () => console.log(`Server listening on port ${port}`.blue))