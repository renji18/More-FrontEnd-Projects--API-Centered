const express = require('express')
const router = express.Router()


//middleware that is specific to this router

router.route('/')
  .get((req, res) => {
    res.send('Birds home page')
  })
  .post((req, res) => {
    res.send('Bird post method')
  })

router.route('/about')
  .get((req, res) => {
    res.send('About page')
  })

module.exports = router