const path = require('path')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const imageFilter = require('./helpers/imageFilter')

const app = express()
const port = process.env.PORT || 5000

const publicDirectoryPath = path.join(__dirname, '../client/public')

app.use(cors())
app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicDirectoryPath))

// Multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'temp/uploads/')
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Routes
app.post('/upload-profile-pic', (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

  upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this ${req.file.path}`);
  });
});

// Start server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/public')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'))
  })
}

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})