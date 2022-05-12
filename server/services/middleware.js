const service = require('../services/services')
const Domain = require('../schemas/domain')
require('../database/keys')
require('dotenv').config()

const timestamp = new Date();

async function domainStatus(dom) {
  var result = await Domain.find({ host: dom }, 'lastUpdated');

  if (result[0] === undefined) return 'isNew'

  else if (result[0].lastUpdated < timestamp.setDate(timestamp.getDate() - 7)) return 'isOld'

  else return 'isOk'
}

async function verifyToken(req, res, next) {
  try {
    console.log(req.headers.authorization)
    if(!req.headers.authorization) {
      return res.status(401).send({
        message: "Unauthenticated"
      })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .send({
          message: "Unauthenticated"
        })
    }

    const payload = service.decodeToken(token)

    req.sub = payload
    next()
  }
  catch (error) {
    return res
      .status(401)
      .send({
        message: "Unauthenticated"
      })
  }
}

module.exports = {
  domainStatus,
  verifyToken
}