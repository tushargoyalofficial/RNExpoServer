'use strict'

/**
 * Module dependencies.
 */
import db from '../models/index.js'
import configInit from '../bin/config/init.js'
import config from '../bin/config/config.js'

configInit()

// Get the default connection
const { mongoose } = db
const conn = mongoose.connection
const Role = db.role

conn.on('connecting', function () {
  console.log('Connecting to MongoDB...')
})
conn.on('connected', function () {
  console.log('Connected to MongoDB.')
})

// Set up default mongoose connection to MongoDB Atlas
mongoose.connect(config.dbURL, config.dbOptions)

Role.deleteMany({}, (err) => {
  if (err) {
    console.log('Unable to delete roles!')
    return
  }
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'SUPERADMIN'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'SUPERADMIN' to roles collection")
      })

      new Role({
        name: 'ADMIN'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'ADMIN' to roles collection")
      })

      new Role({
        name: 'USER'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'USER' to roles collection")
      })

      new Role({
        name: 'MODERATOR'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'MODERATOR' to roles collection")
      })

      new Role({
        name: 'STAFF'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'STAFF' to roles collection")
      })
    }
  })
})
