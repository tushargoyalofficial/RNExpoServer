const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const multer = require('multer')

const myRoutes = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(myRoutes)

multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})

const Storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, './uploads/images')
  },
  filename (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  }
})

app.post('/api/upload', (req, res) => {
  const upload = multer({ storage: Storage }).single('picture')
  upload(req, res, function (err) {
    if (!req.file) {
      return res.send('Please select an image to upload')
    } else if (err instanceof multer.MulterError) {
      return res.send(err)
    } else if (err) {
      return res.send(err)
    }
    // Display uploaded image for user validation
    res.send(req.file.path) // send uploaded image
  })
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

module.exports = app
