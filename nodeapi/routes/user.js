const express = require('express')
const router = express.Router()
const {userById, allUsers, getUser, updateUser, deleteUser} = require('../controllers/user')
const {requireSignin} = require('../controllers/auth')

router.get('/users', allUsers)
router.get('/user/:userId', requireSignin, getUser)
router.put('/user/:userId', requireSignin, updateUser)
router.delete('/user/:userId', requireSignin, deleteUser)

// Any routes containing :userId, our app will first execute userById()
// adds profile object in req with user info
router.param('userId', userById)

module.exports = router;
