'use strict'

import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const appLocale = {
  title: 'RNExpoServer',
  description: 'Node JS based server for RN Expo Demo App.',
  keywords: 'MongoDB, Express, Node.js'
}
export const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
export const JWT = {
  expirySeconds: 900,
  tokenExpiryDays: 7,
  pkiExpiryDays: 30
}
export const version = process.env.npm_package_version
export const port = process.env.PORT || 3001
export const host = process.env.HOST || '127.0.0.1'
