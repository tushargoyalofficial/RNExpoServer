const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const uploadSingle = require('../middleware/singleupload.multermiddleware')
const uploadMultiple = require('../middleware/multipleupload.multermiddleware.js')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const baseUrl = process.env.HOST

router.post('/uploadsingle', async (req, res) => {
  try {
    await uploadSingle(req, res)

    // FOR SINGLE FILE
    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }

    res.status(200).send({
      message: 'Uploaded the file successfully: ' + req.file.fieldname
    })
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 2MB!'
      })
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({ message: 'Too many files to upload.' })
    }

    return res.status(500).send({ message: `Could not upload the file: ${req.file.fieldname}. ${err}` })
  }
})

router.post('/uploadmultiple', async (req, res) => {
  try {
    await uploadMultiple(req, res)

    // FOR MULTIPLE FILES
    if (req.files.length <= 0) {
      return res.status(400).send({ message: 'Please select atleast one file to upload!' })
    }

    res.status(200).send({
      message: 'Files uploaded successfully'
    })
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 2MB!'
      })
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({ message: 'Too many files to upload.' })
    }

    return res.status(500).send({ message: `Error when trying upload many files: ${err}` })
  }
})

router.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads/images')

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!'
      })
    }

    const fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file
      })
    })

    res.status(200).send(fileInfos)
  })
})

router.get('/download/:name', (req, res) => {
  const { params } = req
  const { name } = params
  if (!name) {
    return res.status(401).send({
      message: 'Please enter file name to download!'
    })
  }
  const directoryPath = path.join(__dirname, '../uploads/images/')
  const fileName = name
  const fullDirpath = directoryPath + fileName

  res.download(fullDirpath, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err
      })
    }
  })
})

module.exports = router
