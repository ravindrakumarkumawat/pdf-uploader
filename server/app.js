const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { connectDB } = require('./db/connectDb')
const pdfFilter = require('./helper/pdfFilter')

const app = express()
const port = process.env.PORT || 5000

// Database connecting
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

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

// Routes
app.get('/', (req, res) => {
  res.send('Hello Server')
})

app.post('/upload', (req, res) => {
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

app.get('/login', (req, res) => {
  // Authenticate user
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

