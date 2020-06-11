const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.postById = (req, res, next, id) => {
  Post.findById(id)
  .populate('postedBy', '_id name')
  .exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: err
      })
    }
    req.post = post
    next()
  })
}

exports.getPosts = (req, res) => {
  const posts = Post.find()
  .populate('postedBy', '_id name')
  .select('_id title body created likes')
  .sort({ created: -1 })
  .then((posts) => {
    res.json(posts)
  })
  .catch(err => console.log(err))
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    let post = new Post(fields)

    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    post.postedBy = req.profile

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
  })
}

exports.postbyUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
      .populate('postedBy', '_id name')
      .select('_id title body created likes')
      .sort('_created')
      .exec((err, posts) => {
        if (err) {
          return res.status(400).json({
            error: err
          })
        }
        res.json({posts: posts})
      })
}


exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
  // console.log('isPoster:', isPoster)
  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized'
    })
  }
  next()
}

// exports.updatePost = (req, res, next) => {
//   let post = req.post
//   post = _.extend(post, req.body)
//   post.updated = Date.now()
//   post.save((err, result) => {
//     if (err) {
//         return res.status(400).json({
//             error: err
//         });
//     }
//     res.json(post);
//   });
// }

exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded."
      })
    }
    // Saves post
    let post = req.post
    post = _.extend(post, fields)
    post.updated = Date.now()

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }

    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(post);
    })
  })
}


exports.deletePost = (req, res) => {
  const post = req.post
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json(() => {
        error: err
      })
    }
    return res.json({
      message: 'Post deleted successfully'
    })
  })
}

exports.photo = (req, res, next) => {
  res.set('Content-Type', req.post.photo.contentType)
  return res.send(req.post.photo.data)
}

exports.singlePost = (req, res) => {
  return res.json(req.post)
}

// Like and unlike
exports.like = (req, res) => {
  // Finds the post and updates it with a like.
  Post.findByIdAndUpdate(
    req.body.postId,
    {$push: { likes: req.body.userId }},
    {new: true}
  ).exec((err, result) => {
    if(err) {
      return res.status(400).json({ error: err })
    } else {
      res.json(result)
    }
  })
}

exports.unlike = (req, res) => {
  // Finds the post and removes the like with pull.
  Post.findByIdAndUpdate(
    req.body.postId,
    {$pull: { likes: req.body.userId }},
    {new: true}
  ).exec((err, result) => {
    if(err) {
      return res.status(400).json({ error: err})
    } else {
      res.json(result)
    }
  })
}
