const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../schemas/admin')
const service = require('../services/services')
const middleware = require('../services/middleware')
require('dotenv')
require('../database/keys')
require("colors")

let router = express.Router()

router.get('/login', async (req, res) => {
  console.log('GET /login: %s'.italic.yellow, req.body.email)

  Admin.findOne({ email: req.body.email }, (error, admin) => {
    if (error) {
      console.error('Error getting admin data: \n%s'.red, error)

      return res
        .status(500)
        .send({
          status: 'error'
        })
    }

    if (!admin) {
      console.error('%s not found'.red, req.body.email)

      return res
        .status(400)
        .send({
          status: 'error'
        })
    }
    
    if (service.encryptPassword(req.body.password) !== admin.password) {
      console.error('%s password dont match'.red, req.body.email)

      return res
        .status(401)
        .send({
          status: 'error'
        })
    }

    let token = service.createToken(admin)

    console.log('%s logged in succesfully!'.green, req.body.email)

    return res
      .status(200)
      .send({
        status: 'success',
        token: token
      })
  })
})

router.put('/register', async (req, res) => {
  console.log('PUT /register: %s'.italic.yellow, req.body.email)

  const newAdmin = new Admin({
    name: req.body.name,
    surnames: req.body.surnames,
    email: req.body.email,
    password: service.encryptPassword(req.body.password),
  })

  newAdmin.save((error, response) => {
    if (error) {
      console.error('Error inserting admin in database: \n%s'.red, error)

      return res
        .status(500)
        .send({
          status: 'error'
        })
    }

    console.log('%s registered in database!'.green, req.body.email)

    return res
      .status(200)
      .send({
        status: 'success'
      })
  })
})

router.delete('/delete/:id', middleware.verifyToken, async (req, res) => {
  console.log('DELETE /delete: %s'.italic.yellow, req.params.id)

  Admin.findByIdAndDelete(req.params.id, (error, admin) => {
      if (error) {
        console.error('Error deleting admin: \n%s'.red, error)

        return res
          .status(500)
          .send({
            status: 'error'
          })
      }

      console.log('Admin deleted!'.green,)

      return res
        .status(200)
        .send({
          status: 'success'
        })
    })
})

router.post('/edit/:id', middleware.verifyToken, async (req, res) => {
  console.log('POST /edit: %s'.italic.yellow, req.params.id)

  Admin.findByIdAndUpdate(req.params.id, { ...req.body }, (error, admin) => {
      if (error) {
        console.error('Error editing admin: \n%s'.red, error)

        return res
          .status(500)
          .send({
            status: 'error'
          })
      }

      console.log('Admin data updated!'.green,)

      return res
        .status(200)
        .send({
          status: 'success'
        })
    })
})

router.get('/getAdmins', async (req, res) => {
  console.log('GET /getAdmins'.italic.yellow)

  Admin.find({}, (error, admins) => {
      if (error) {
        console.error('Error editing admin: \n%s'.red, error)

        return res
          .status(500)
          .send({
            status: 'error'
          })
      }

      console.log('Admin data sent succesfully!'.green,)

      return res
        .status(200)
        .send({
          admins
        })
    })
})

module.exports = router