'use strict'

export const appLocale = {
  title: 'RNExpoServer - Development Environment'
}
export const db = process.env.DB_URL
export const jwt = {
  expirySeconds: 10000,
  tokenExpiryDays: 7,
  pkiExpiryDays: 30
}
