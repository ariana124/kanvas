const express = require('express')
const router = express.Router()
const {signup, signin, signout} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {userSignupValidator} = require('../validator')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

// Any routes containing :userId, our app will first execute userById()
// adds profile object in req with user info
router.param('userId', userById)

module.exports = router;
