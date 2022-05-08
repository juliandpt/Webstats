
const websiteLogo = require( 'website-logo' )
const Domain = require('../database/schemas')
const timestamp = new Date();
require('../database/keys')

async function domainStatus(dom) {
  var result = await Domain.find({ host: dom }, 'date');

  if (result[0] === undefined) return 'isNew'

  else if (result[0].date > timestamp.setDate(timestamp.getDate() - 7)) return 'isOld'

  else return 'isOk'
}

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
        console.log("bad")
      }
    })
  })
}

module.exports = {
  domainStatus,
  getDomainLogo
}