'use strict'

/**
 * Module dependencies.
 */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '../models/index.js'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const User = db.user
const Role = db.role

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

const isSuperAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'SUPERADMIN') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require SuperAdmin Role!' })
      }
    )
  })
}

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'ADMIN') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Admin Role!' })
      }
    )
  })
}

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'MODERATOR') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Moderator Role!' })
      }
    )
  })
}

const isStaff = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'STAFF') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Staff Role!' })
      }
    )
  })
}

const authJwt = {
  verifyToken,
  isSuperAdmin,
  isAdmin,
  isModerator,
  isStaff
}

export default authJwt
