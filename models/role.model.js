'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
const { Schema, model } = mongoose

/**
 * Role Schema
 */
const RoleSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Role = model(
  'Role',
  RoleSchema
)

export default Role
