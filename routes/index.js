const express = require('express')
const router = express.Router()

// IMPORT OTHER ROUTES
const usersRouter = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// USER ROUTES
router.use('/users', usersRouter)

module.exports = router
