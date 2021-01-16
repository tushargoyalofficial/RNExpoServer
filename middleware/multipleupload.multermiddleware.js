'use strict'

/**
 * Module dependencies.
 */
import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'
import multer, { diskStorage } from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const maxSize = 25 * 1024 * 1024

const Storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, join(__dirname, '../uploads/images'))
  },
  filename: (req, file, callback) => {
    const match = ['image/png', 'image/jpeg']

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`
      return callback(message, null)
    }

    const filename = `${file.fieldname}_${Date.now()}_${file.originalname}`
    callback(null, filename)
  }
})

// FOR MULTIPLE FILES
const uploadFile = multer({
  storage: Storage,
  limits: { fileSize: maxSize }
}).array('photo', 4)

const uploadFileMiddleware = promisify(uploadFile)
export default uploadFileMiddleware
