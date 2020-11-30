const path = require('path')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

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
      cb(null, 'uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Routes


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