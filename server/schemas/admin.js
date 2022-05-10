const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    surnames: {
      type: String,
      required: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, 
  { strict: false }
)

module.exports = model('Admin', adminSchema)