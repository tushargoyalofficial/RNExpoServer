'use strict'

/**
 * Module dependencies.
 */
import { Router } from 'express'

// IMPORT OTHER ROUTES
import usersRouter from './users.js'
import uploadImageRouter from './uploadimage.js'
const router = Router()

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

export default router
