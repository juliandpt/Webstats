const { Schema, model } = require('mongoose')

const domainSchema = new Schema({
    date: {
      type: Date,
      required: true
    },
    numSearches: {
      type: Number,
      required: true
    },
    logo: {
      type: String,
      required: false
    },
  }, 
  { strict: false }
)

module.exports = model('Domain', domainSchema)