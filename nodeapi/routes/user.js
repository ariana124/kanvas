const express = require('express')
const router = express.Router()
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower
} = require('../controllers/user')
const {requireSignin} = require('../controllers/auth')

// Route for following and follower list, it has to be in this specific order.
router.put('/user/follow', requireSignin, addFollowing, addFollower)
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower)

router.get('/users', allUsers)
router.get('/user/:userId', requireSignin, getUser)
router.put('/user/:userId', requireSignin, updateUser)
router.delete('/user/:userId', requireSignin, deleteUser)

// Route to show user profile picture.
router.get('/user/photo/:userId', userPhoto)

// Any routes containing :userId, our app will first execute userById()
// adds profile object in req with user info
router.param('userId', userById)

module.exports = router;
