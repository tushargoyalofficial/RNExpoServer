const express = require('express')
const router = express.Router()

// IMPORT OTHER ROUTES
const usersRouter = require('./users')
const uploadImageRouter = require('./uploadimage')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

/* PING PONG */
router.get('/ping', (req, res) => {
  res.status(200).json({
    responseCode: 200,
    success: true,
    message: 'pong'
  })
})

// USER ROUTES
router.use('/users', usersRouter)
router.use('/image', uploadImageRouter)

module.exports = router
