const express = require('express')
const ssllabs = require('node-ssllabs');
const service = require('../services/services')
const middleware = require('../services/middleware')
const Domain = require('../schemas/domain')
require('../database/keys')
require("colors")

let router = express.Router()
let timestamp = new Date();
let restTimestamp = timestamp.getDate()-7

router.get('/search', async (req, res) => {
  console.log('GET /domain/domain=%s'.italic.yellow, req.body.domain)

  switch (await middleware.domainStatus(req.body.domain)) {
    case "isOk":
      await Domain.findOneAndUpdate(
        { host: req.body.domain },
        {
          lastSearched: timestamp,
          $inc: {
            'timesSearched': 1
          }
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
        }).clone

      break

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

        await Domain.findOneAndUpdate(
          { host: req.body.domain },
          {
            lastUpdated: timestamp,
            lastSearched: timestamp,
            $inc: {
              'timesSearched': 1
            },
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
          }).clone
      })
      break

    case "isNew":
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

        let data = {
          lastUpdated: timestamp,
          lastSearched: timestamp,
          timesSearched: 1,
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

router.get('/recents', async (req, res) => {
  console.log('GET /domain/recents'.italic.yellow)

  Domain.find({}, 'host lastSearched logo timesSearched', { sort: { lastSearched: -1 } })
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

router.get('/tops', async (req, res) => {
  console.log('GET /domain/tops'.italic.yellow)

  Domain.find({}, 'host timesSearched logo', { sort: { timesSearched: -1 } })
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
        .status(500)
        .send({
          status: "reject"
        })
    })
})

router.get('/grades', async (req, res) => {
  console.log('GET /domain/grades'.italic.yellow)

  let grades = new Array()

  Domain.find({}, 'endpoints')
    .then((results) => {
      for (i = 0; i < results.length; i++) {
        endpoints = results[i].endpoints

        for (j = 0; j < endpoints.length; j++) {
          grades.push(results[i].endpoints[j].grade)
        }
      }

      console.log('Generated results'.green)

      return res
        .status(200)
        .send({
          grades
        })
    })
    .catch((error) => {
      console.error('Errors ocurred: \n%s'.red, error)

      return res
        .status(500)
        .send({
          status: "reject"
        })
    })
})

router.get('/weekly', async (req, res) => {
  console.log('GET /domain/weekly'.italic.yellow)

  var date = new Date();
  date.setDate(date.getDate() - 7);

  Domain.aggregate(
    [
      { 
        $match: 
        { 
          lastSearched: 
          {
            $gte: date,
            $lte: timestamp
          },
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastSearched" } },
          totalSearches: {
            $sum: 1
          }
        }
      }
    ],
    function (error, result) {
      if (error) {
        console.error('Errors ocurred: \n%s'.red, error)

        return res
          .status(500)
          .send({
            status: "reject"
          })
      }

      console.log('Generated results'.green)

      return res
        .status(200)
        .send({
          result
        })
    }
  )
})

module.exports = router