const path = require('path')
const util = require('util')
const multer = require('multer')
const maxSize = 25 * 1024 * 1024

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/images'))
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

// FOR SINGLE FILE
const uploadFile = multer({
  storage: Storage,
  limits: { fileSize: maxSize }
}).single('photo')

const uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
