'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose
const { genSalt, hash, compare } = bcrypt
const SALT_WORK_FACTOR = 10
const emailRegex = /.+\@.+\..+/

/**
 * A Validation function for local strategy properties
 */
const validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length)
}

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function (password) {
  return (this.provider !== 'local' || (password && password.length > 7))
}

/**
 * User Schema
 */
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    unique: 'Username already in the database'
  },
  email: {
    type: String,
    trim: true,
    index: true,
    required: 'Please fill in an email address',
    unique: 'Email already in the database',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [emailRegex, 'Please fill a valid email address']
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  active: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Hook a pre save method to hash the password and update date fields
 */
UserSchema.pre('save', function (next) {
  const user = this

  // get the current date
  const currentDate = new Date()

  // change the updated field to current date
  this.updatedAt = currentDate

  // if created doesn't exist, add to that field
  if (!this.createdAt) { this.createdAt = currentDate }

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.authenticate = function (password, callback) {
  compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

const User = model(
  'User',
  UserSchema
)

export default User
