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
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "ko"
    })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (token === 'null') {
    return res.status(401).send({
      status: "ko"
    })
  }

  const payload = service.decodeToken(token, process.env.SECRET_TOKEN)

  if (token !== query[0].token) {
    return res.status(401).send({
      status: "ko"
    })
  }

  const payloadDatabase = service.decodeToken(query[0].token, process.env.SECRET_TOKEN)

  if (moment().unix() > payloadDatabase.exp) {
    return res.status(401).send({
      status: "ko"
    })
  }

  req.sub = payload.sub
  next()
}

async function verifySearchToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "ko"
    })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token || token === 'null') {
    req.sub = 0
    next()
  } else {
    const payload = service.decodeToken(token, process.env.SECRET_TOKEN)

    req.sub = payload.sub
    next()
  }
}

async function verifyAdminToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "ko"
    })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token || token === undefined || token === 'null') {
    return res.status(401).send({
      status: "ko"
    })
  }

  const payload = service.decodeToken(token, process.env.SECRET_TOKEN)
  //const query = await pool.query("SELECT token FROM users WHERE users.id_user = ? AND isAdmin = 1", [payload.sub])

  if (query[0] === undefined) {
    return res.status(401).send({
      status: "ko"
    })
  }

  const payloadDatabase = service.decodeToken(query[0].token, process.env.SECRET_TOKEN)

  if (moment().unix() > payloadDatabase.exp) {
    return res.status(401).send({
      status: "ko"
    })
  }

  req.sub = payload.sub
  next()
}

module.exports = {
  domainStatus,
  verifyToken,
  verifyAdminToken,
  verifySearchToken
}