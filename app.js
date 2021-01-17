'use strict'

/**
 * Module dependencies.
 */
import app from './bin/express.js'
import db from './models/index.js'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// Get the default connection
const { mongoose } = db
const conn = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
conn.on('connecting', function () {
  console.log('Connecting to MongoAtlas...')
})
conn.on('error', function (error) {
  console.error.bind(console, 'Error in MongoAtlas connection: ' + error)
  mongoose.disconnect()
})
conn.on('connected', function () {
  console.log('Connected to MongoAtlas.')
})
conn.once('open', function () {
  console.log('Connection to MongoAtlas open.')
})
conn.on('reconnected', function () {
  console.log('Reconnected to MongoAtlas.')
})
conn.on('disconnected', function () {
  console.log('Disconnected from MongoAtlas.')
  console.log('DB URI is: ' + process.env.DB_URL)
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
})

// Set up default mongoose connection to MongoDB Atlas
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

export default app(db)
