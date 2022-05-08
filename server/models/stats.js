const express = require('express')
const ssllabs = require('node-ssllabs');
const service = require('../services/services')
require('../database/keys')
require("colors")

let router = express.Router()
let Domain = require('../database/schemas')
let today = new Date();

router.get('/domain', async (req, res) => {
  console.log('GET /stats/domain=%s'.italic.yellow, req.body.domain)

  switch (await service.domainStatus(req.body.domain)) {
    case "isOk":
      await Domain.findOneAndUpdate(
        { host: req.body.domain}, 
        {
          numSearches: searches
        },
        { 
          new: true
        }, 
        function (err, results) {
          if (err) {
            return res
            .status(400)
            .send({
              status: "reject"
            })
          }

          console.log('Generated results for: %s'.green, req.body.domain)

          return res
          .status(200)
          .send({
            results
          })
        }).clone()

    case "isOld":
      await ssllabs.analyze({
        "host": req.body.domain,
        "fromCache": true,
        "all": "on",
      }, async function (error, response) {
        if (error) {
          console.error('Errors ocurred for %s: \n%s'.red, req.body.domain, error)

          return res
            .status(400)
            .send({
              status: "reject"
            })
        }

        let numSearches = await Domain.find({host: req.body.domain}, 'numSearches')
        searches = parseInt(numSearches[0].numSearches) + 1

        await Domain.findOneAndUpdate(
          { host: req.body.domain}, 
          {
            date: today,
            numSearches: searches,
            ...response
          },
          { 
            new: true
          }, 
          function (error, results) {
            if (error) {
              console.error('Errors ocurred for %s: \n%s'.red, req.body.domain, error)

              return res
                .status(400)
                .send({
                  status: "reject"
                })
            }

            console.log('Generated results for: %s'.green, req.body.domain)

            return res
            .status(200)
            .send({
              results
            })
          }).clone()
      })
      break

    case "isNew":
      await ssllabs.analyze({
        "host": req.body.domain,
        "startNew": true,
        "all": "on",
      }, async function (error, response) {
        if (error) {
          console.error('Errors ocurred for %s: \n%s'.red, req.body.domain, error)

          return res
            .status(400)
            .send({
              status: "reject"
            })
        }
    
        let data = {
          date: today,
          numSearches: 1,
          logo: await service.getDomainLogo(req.body.domain),
          ...response,
        }
    
        const newDomain = new Domain({
          ...data
        })
    
        newDomain.save((error, response) => {
          if (error) console.error('Error inserting domain in database: \n%s'.red, error)

          else console.error('%s inserted in database!'.green, req.body.domain)
        })
    
        console.log('Generated results for %s'.green, req.body.domain)
        return res
          .status(200)
          .send({
            ...data
          })
      });

      break
  }
})

router.get('/recent', async (req, res) => {
  console.log('GET /stats/recent'.italic.yellow)

  Domain.find(
    {}, 
    'host numSearches logo',
    { sort: { 
        date: -1
      } 
    })
      .then((results) => {
        console.log('Generated results'.green)

        return res
          .status(200)
          .send({
            results
          })
      })
      .catch((error) => {
        console.error('Errors ocurred: \n%s'.red, error)

        return res
          .status(400)
          .send({
            status: "reject"
          })
      })
})

router.get('/')

module.exports = router