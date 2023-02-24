// Middleware to check if the request contains an authorization

const jwt = require('jsonwebtoken')

const User = require('../Models/userModel')

const requireUser = async (req, res, next) => {

  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = await User.findOne({ _id }).select('_id')
    next()

  }
  catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request not authorized' })
  }
}

module.exports = requireUser
