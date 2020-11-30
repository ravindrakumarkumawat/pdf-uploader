const path = require('path')
const express = require('express')
const multer = require('multer')
console.log()
const app = express()
const port = process.env.PORT || 5000

const publicDirectoryPath = path.join(__dirname, '../client/public')
app.use(express.static(publicDirectoryPath))





app.listen(port, () => {
  console.log(`listening on port ${port}`)
})