const express = require('express')
const router = express.Router()
const {
    getPosts,
    createPost,
    postbyUser,
    postById,
    isPoster,
    deletePost,
    updatePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
} = require('../controllers/post')
const {requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createPostValidator} = require('../validator')

router.get('/posts', getPosts)

// Like and unlike
router.put('/post/like', requireSignin, like)
router.put('/post/unlike', requireSignin, unlike)

// Comments
router.put('/post/comment', requireSignin, comment)
router.put('/post/uncomment', requireSignin, uncomment)

router.post('/post/new/:userId', requireSignin, createPost, createPostValidator)
router.get('/post/:postId', singlePost)
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
