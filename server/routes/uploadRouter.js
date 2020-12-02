const multer = require('multer')
const express = require('express')
const router = express.Router()
const pdfFilter = require('../helper/pdfFilter')
const auth = require('../middleware/auth')


// Multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'temp/uploads/')
  },

  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
})

const upload = multer({ storage, fileFilter: pdfFilter }).array('file', 5)

router.post('/upload', auth, async (req, res) => {
  await upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json(err)
    } else if (err) {
      // An Unknown error occurred when uploading
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file) // Everything went fine    
  })
})

module.exports = router