const { Schema, model } = require('mongoose')

const domainSchema = new Schema({
    lastUpdated: {
      type: Date,
      required: true
    },
    lastSearched: {
      type: Date,
      required: true
    },
    timesSearched: {
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