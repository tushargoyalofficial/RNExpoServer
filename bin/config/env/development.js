'use strict'

import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const appLocale = {
  title: 'RNExpoServer - Development Environment'
}
export const dbURL = process.env.DB_URL
export const JWT = {
  expirySeconds: 10000,
  tokenExpiryDays: 7,
  pkiExpiryDays: 30
}
