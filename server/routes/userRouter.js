const router = require('express').Router()

router.get("/test", (req, res) => {
  res.send("Hello, it's working")
})