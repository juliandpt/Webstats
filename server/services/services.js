
const websiteLogo = require('website-logo')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
require('../database/keys')

const timestamp = new Date();
const timestampAdd = new Date(timestamp.getDate() + 1)

async function getDomainLogo(url) {
  let logo

  return new Promise((resolve, reject) => {
    websiteLogo(url, function (error, result) {
      if (error) reject('Logo not generated: \n%s'.red, error)

      if (result.icon !== null) {
        logo = result.icon.href
        resolve(logo)
      }
      else if (result.openGraph[0] !== undefined) {
        logo = result.openGraph[0].href
        resolve(logo)
      }
      else {
        reject('Logo not generated: \n%s'.red, error)
      }
    })
  })
}

function createToken(admin) {
  var payload = {
    sub: admin,
    iat: timestamp.getTime(),
    exp: timestampAdd.getTime()
  }

  return jwt.sign(payload, process.env.SECRET_TOKEN)
}

function decodeToken(token, secret) {
  return jwt.verify(token, secret)
}

function encryptPassword(password) {
  return sha256(password)
}

module.exports = {
  getDomainLogo,
  createToken,
  decodeToken,
  encryptPassword
}