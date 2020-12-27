const path = require('path')
const util = require('util')
const multer = require('multer')
const maxSize = 25 * 1024 * 1024

const Storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, path.join(__dirname, '../uploads/images'))
  },
  filename (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  }
})

const uploadFile = multer({
  storage: Storage,
  limits: { fileSize: maxSize }
}).single('photo')

const uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
