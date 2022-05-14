const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../schemas/admin')
const service = require('../services/services')
const middleware = require('../services/middleware')
require('dotenv')
require('../database/keys')
require("colors")

let router = express.Router()

router.post('/login', async (req, res) => {
  console.log('POST /login: %s'.italic.yellow, req.body.email)

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
        .status(404)
        .send({
          message: 'user not found'
        })
    }
    
    if (service.encryptPassword(req.body.password) !== admin.password) {
      console.error('%s password dont match'.red, req.body.email)

      return res
        .status(400)
        .send({
          message: 'invalid credentials'
        })
    }

    let token = service.createToken(admin._id)

    console.log('%s logged in succesfully!'.green, req.body.email)

    return res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      .send({
        admin,
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

  newAdmin.save((error, admin) => {
    if (error) {
      console.error('Error inserting admin in database: \n%s'.red, error)

      return res
        .status(500)
        .send({
          message: 'Error inserting admin in database'
        })
    }

    console.log('%s registered in database!'.green, req.body.email)

    return res
      .status(200)
      .send(admin)
  })
})

router.get('/user', middleware.verifyToken, async (req, res) => {
  Admin.findOne( { _id: req.sub._id }, '_id name email', (err, admin) => {
    if (err) {
      return res
        .status(404)
        .send({
          message: 'user not found'
        })
    }

    return res
      .status(200)
      .send(admin)
  })
})

router.post('/logout', middleware.verifyToken, async (req, res) => {
  return res
      .status(200)
      .cookie('token', '', { maxAge: 0 })
      .send({
        message: 'logged out!'
      })
})

router.delete('/delete/:id', middleware.verifyToken, async (req, res) => {
  console.log('DELETE /delete: %s'.italic.yellow, req.params.id)
  console.log(req.params.id)

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
          message: 'deleted'
        })
    })
})

router.post('/edit/:id', middleware.verifyToken, async (req, res) => {
  console.log('POST /edit: %s'.italic.yellow, req.params.id)
  console.log(req.params.id)

  Admin.findByIdAndUpdate(
    req.params.id, 
    { 
      name: req.body.name,
      surnames: req.body.surnames,
      email: req.body.email,
      password: service.encryptPassword(req.body.password),
    }, 
    (error, admin) => {
      if (error) {
        console.error('Error editing admin: \n%s'.red, error)

        return res
          .status(500)
          .send({
            status: 'error'
          })
      }

      console.log('%s data updated!'.green, req.body.name)

      return res
        .status(200)
        .send({
          message: 'edited'
        })
    })
})

router.get('/getAdmins', middleware.verifyToken, async (req, res) => {
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
        .send(admins)
    })
})

module.exports = router