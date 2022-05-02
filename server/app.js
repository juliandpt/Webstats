const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080
const stats = require('./models/stats')
const contact = require('./models/contact')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/stats', stats)
app.use('/contact', contact)

app.listen(port, () => console.log(`Server listening on port ${port}`))