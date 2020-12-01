const express = require('express')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const pdfFilter = require('./helper/pdfFilter')

const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())

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
app.use("/user", require("./routes/userRouter"))
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


// Setup for mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err
  console.log('MongoDB connection established')
})
