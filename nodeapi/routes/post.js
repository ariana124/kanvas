const express = require('express')
const router = express.Router()
const {getPosts, createPost, postbyUser, postById, isPoster, deletePost, updatePost, photo} = require('../controllers/post')
const {requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createPostValidator} = require('../validator')

router.get('/posts', getPosts)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator)
router.get('/posts/by/:userId', postbyUser)
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

// Route to show photos of a post
router.get('/post/photo/:postId', photo)

// Any route containing :userId, our app will first execute userById()
router.param('userId', userById)
// Any route containing :postId, our app will first execute postById()
router.param('postId', postById)

module.exports = router;
