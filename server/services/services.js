
const websiteLogo = require('website-logo')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
require('../database/keys')

async function getDomainLogo(url) {
  let logo

  return new Promise((resolve, reject) => {
    try {
      websiteLogo(url, function (error, result) {
        if (result.icon !== null) {
          logo = result.icon.href
          resolve(logo)
        }
        else if (result.openGraph[0] !== undefined) {
          logo = result.openGraph[0].href
          resolve(logo)
        }
        else {
          console.error('Logo not generated: \n%s'.red, error)
          logo = "/icons/noimage.svg"
          resolve(logo)
        }
      })
    }
    catch (error) {
      console.error('Logo not generated: \n%s'.red, error)
      logo = "/icons/noimage.svg"
      resolve(logo)
    }
  })
}

function createToken(id) {
  return jwt.sign( { _id: id }, process.env.SECRET_TOKEN)
}

function decodeToken(token) {
  return jwt.verify(token, process.env.SECRET_TOKEN)
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