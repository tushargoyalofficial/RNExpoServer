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
import methodOverride from 'method-override'
import helmet from 'helmet'
import compress from 'compression'
import logger from 'morgan'
import config from './config/config.js'
import myRoutes from '../routes/index.js'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const App = (db) => {
  // Initialize express app
  const app = express()

  // Setting application local variables
  app.locals.title = config.appLocale.title
  app.locals.description = config.appLocale.description
  app.locals.keywords = config.appLocale.keywords

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const corsOptions = {
    origin: 'http://localhost:3000'
  }

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url
    next()
  })

  // Should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory'
  }

  // view engine setup
  app.set('views', join(__dirname, 'views'))
  app.set('view engine', 'hbs')

  // Showing stack errors
  app.set('showStackError', true)

  app.use(logger('dev'))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
  app.use(methodOverride())
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(express.static(join(__dirname, 'public')))

  // Use helmet to secure Express headers
  app.use(helmet())
  app.disable('x-powered-by')

  app.use(myRoutes)

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

  // Return Express server instance
  return app
}

export default App
