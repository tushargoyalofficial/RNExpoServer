const express = require('express')
const router = express.Router()

// IMPORT OTHER ROUTES
const usersRouter = require('./users')
const uploadImageRouter = require('./uploadimage')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// USER ROUTES
router.use('/users', usersRouter)
router.use('/image', uploadImageRouter)

module.exports = router
