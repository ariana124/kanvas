const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  // Check for Email in DB if it exists
  if (userExists) return res.status(403).json({ // Status 403 means Forbidden
    error: 'Email is taken'
  })

  // Save to DB as new User
  const user =  await new User(req.body)
  await user.save()
  res.status(200).json({ message: "Signup success! Please login." })
}

exports.signin = (req, res) => {
  // find the user based on email
  const {email, password} = req.body
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user) {
      return res.status(401).json({  // Status 401 means Unauthorized
        error: 'User with that email does not exist. Please signin.' 
      })
    }
    //  if user is found make sure the email and password match
    // create authentication method in model and use here
    if (!user.authenticate(password)) { // Accessing Mongoose of 'user' context
      return res.status(401).json({  // Status 401 means Unauthorized
        error: 'Email and password do not match' 
      })
    }

    // generate a token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, {expires: new Date(Date.now() + 8 * 3600000)}) // cookie will be removed after 8 hours
    // return response with user and token to frontend client
    const {_id, name, email} = user
    return res.json({ token, user: {_id, email, name}})
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  return res.json({ message: "Signout success!"})
}

exports.requireSignin = expressJwt({
  // If the token is valid, express-jwt appends the verified users' id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  // userProperty: "auth"
  requestProperty: 'auth'
})
