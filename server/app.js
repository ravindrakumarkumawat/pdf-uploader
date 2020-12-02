const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { connectDB } = require('./db/connectDb')

const uploadRouter = require('./routes/uploadRouter')
const userRouter = require('./routes/userRouter')

const app = express()
const port = process.env.PORT || 5000

// Database connecting
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/users/:id', uploadRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

