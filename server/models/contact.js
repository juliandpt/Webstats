const express = require('express')
const colors = require("colors")
const sendgridMail = require('@sendgrid/mail')
require('dotenv').config()

const router = express.Router()
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/sendEmail', async (req, res) => {
  console.log('POST /sendEmail'.italic.yellow)
  console.log(req.body.email)

  const message = {
    to: 'jdptdev@gmail.com',
    from: 'jdptdev@gmail.com',
    subject: 'Mensaje de la plataforma Webstats',
    templateId: 'd-1e79e29176f04bbc95f6166360764e92',
    dynamicTemplateData: {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    },
  };

  await sendgridMail.send(message)
    .then(() => {
      console.log('Email sent succesfully!'.green)
      return res.status(200).send({
        status: "ok"
      })
    })
    .catch((error) => {
      console.error('Error sending email'.red)
      console.error(error)
      return res.status(500).send({
        status: error
      })
    })
})

module.exports = router