const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require('../models/userModel')
const auth = require("../middleware/auth")

router.post("/register", async (req, res) => {

  try {
    const {firstName, lastName, email, password, passwordCheck } = req.body

    if (!firstName || !lastName || !email || !password || !passwordCheck) {
      return res.status(400).json({
        msg: "Not all fields have been entered."
      })
    }
    if (password.length < 5){
      return res.status(400).json({ 
        msg: "The password needs to be at least 5 characters long." 
      })
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ 
        msg: "Enter the same password twice for verification." 
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exists."
      })
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName, 
      email,
      password: passwordHash
    })

    const savedUser = await newUser.save()
    res.json(savedUser)

  } catch(error) {
    res.status(500).json({error: error.message})
  }
})

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body

    if( !email || !password ) {
      res.status(400).json({ 
        msg: "Enter All fields"
      })
    }

    const user = await User.findOne({ email })
    if(!user) {
      return res.status(400).json({
        msg: "Email has not been registered"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({
        msg: "Incorrect password"
      })
    }

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName
      },
    })

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const user = await User.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    displayName: user.displayName,
    id: user._id,
  })
})
module.exports = router