const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/userModel')

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
    res.status(500).json(error)
  }
})

module.exports = router