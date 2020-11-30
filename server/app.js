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