'use strict'

import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const dbURL = process.env.DB_URL || ''
