'use strict'

/**
 * Module dependencies.
 */
import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import path, { join } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'

import myRoutes from './routes/index.js'
import db from './models/index.js'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// Get the default connection
const { mongoose } = db
const connection = mongoose.connection

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const corsOptions = {
  origin: 'http://localhost:3000'
}

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))
app.use(myRoutes)

// Set up default mongoose connection to MongoDB Atlas
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.once('open', function () {
  console.log('we\'re connected to MongoDBAtlas!')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
