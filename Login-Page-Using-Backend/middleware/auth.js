const jwt = require('jsonwebtoken')
const LoginInfo = require('../models/schema')

const auth = async(req, res, next) => {
  try {
    if(req.url === '/' && !req.cookies.jwt)return next()

    const token = req.cookies.jwt
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
    const user = await LoginInfo.findOne({_id: verifyUser._id})

    req.token = token
    req.user = user
    next()
  } catch (error) {
    return res.status(404).render('error', {
      ERROR: 'Unauthorized Access'
    })
  }
}

module.exports = auth