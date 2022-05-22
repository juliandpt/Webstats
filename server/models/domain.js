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

router.post('/search', async (req, res) => {
  console.log('POST /domain/domain=%s'.italic.yellow, req.body.domain)

  switch (await middleware.domainStatus(req.body.domain)) {
    case "isOk":
      console.log('%s has alreadey been searched recently'.italic.green, req.body.domain)
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
            .send(results)
        }).clone

      break

    case "isOld":
      console.log('%s has alreadey been searched, but is old'.italic.green, req.body.domain)
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
              .send(results)
          }).clone
      })
      break

    case "isNew":
      console.log('%s has never been searched'.italic.green, req.body.domain)
      await ssllabs.analyze({
        "host": req.body.domain,
        "startNew": true,
        "all": "done",
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
          .send(data)
      });

      break
  }
})

router.get('/domains', async (req, res) => {
  console.log('GET /domain/domains'.italic.yellow)

  Domain.find({}, 'host logo timesSearched')
    .limit(20)
    .then((recents) => {
      console.log('Generated results'.green)

      return res
        .status(200)
        .send(recents)
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

router.get('/recents', middleware.verifyToken, async (req, res) => {
  console.log('GET /domain/recents'.italic.yellow)

  Domain.find({}, 'host lastSearched logo timesSearched', { sort: { lastSearched: -1 } })
    .limit(5)
    .then((recents) => {
      console.log('Generated results'.green)

      return res
        .status(200)
        .send(recents)
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

router.get('/tops', middleware.verifyToken, async (req, res) => {
  console.log('GET /domain/tops'.italic.yellow)

  Domain.find({}, 'host timesSearched logo', { sort: { timesSearched: -1 } })
    .limit(5)
    .then((tops) => {
      console.log('Generated results'.green)

      return res
        .status(200)
        .send(tops)
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

router.get('/grades', middleware.verifyToken, async (req, res) => {
  console.log('GET /domain/grades'.italic.yellow)

  Domain.aggregate(
    [
      { "$unwind": "$endpoints" },
      {
        $group: {
          _id: "$endpoints.grade",
          'grades': {
            $sum: 1
          }
        }
      }
    ],
    function (error, grades) {
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
        .send(grades)
    }
  ).limit(5)
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
      },
      { $sort: { _id: 1 } }
    ],
    function (error, weekly) {
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
        .send(weekly)
    }
  )
})

router.post('/', async (req, res) => {
  console.log('POST /domain/domain=%s'.italic.yellow, req.body.domain)

  console.log('%s has never been searched'.italic.green, req.body.domain)
    await ssllabs.analyze({
      host: req.body.domain,
      publish: true,
      fromCache: true,
      all: "done",
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
        .send(data)
    });
})

module.exports = router