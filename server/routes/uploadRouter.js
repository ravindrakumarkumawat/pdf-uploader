const multer = require('multer')
const express = require('express')
const router = express.Router()
const pdfFilter = require('../helper/pdfFilter')
const auth = require('../middleware/auth')
const User = require('../models/userModel')


// Multer storage
const storage = multer.diskStorage({
  destination: async function(req, file, cb) {            
      cb(null, 'temp/uploads/')  
      let user = await User.findOne({_id: req.baseUrl.split('/')[2]})
      if (!user) {
        return res.status(404).json({ error: 'user doesnt exist' })
      }
      user.pdfs.push({
        fileName: file.originalname,
        fileLocation: 'temp/uploads/'
      })

      await user.save()
  },

  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
})

const upload = multer({ storage, fileFilter: pdfFilter }).array('file', 5)

router.post('/upload', (req, res) => {
  const userId = req.baseUrl.split('/')[2]
  upload(req, res, (err) => {
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