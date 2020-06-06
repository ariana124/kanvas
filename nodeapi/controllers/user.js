const _ = require('lodash')
const User = require('../models/user')
const formidable = require('formidable')
const fs = require('fs')

exports.userById = (req, res, next, id) => {
  User.findById(id)
  // Populate the followers and following users array.
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User not found"
      })
    }
    req.profile = user // adds profile object in req with user info
    next()
  })
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    })
  }
}

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json(users)
  }).select('name email updated')
}

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded."
      })
    }
    // Saves user with updated information.
    let user = req.profile
    user = _.extend(user, fields)
    user.updated = Date.now()

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }

      user.hashed_password = undefined
      user.salt = undefined
      res.json(user);
    })
  })
}

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType))
    return res.send(req.profile.photo.data)
  }
  next()
}

exports.deleteUser = (req, res, next) => {
  let user = req.profile
  console.log(`Req profile: ${user}`)
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({message: 'User deleted successfully'})
  })
}

// Follow and unfollow
exports.addFollowing = (req, res, next) => {
  // This means the logged in user is following the user in the push curly braces.
  User.findByIdAndUpdate(
    req.body.userById,
    // The followId will be created in the frontend.
    {$push: { following: req.body.followId }}, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err});
      }
      next()
    }
  )
}

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {$push: { followers: req.body.userId }},
    {new: true}, // This is so that the data we get back is the updated data not the old one. 
  )
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

exports.removeFollowing = (req, res, next) => {
  // This means the logged in user is following the user in the pull curly braces.
  User.findByIdAndUpdate(
    req.body.userById,
    // The unfollowId will be created in the frontend.
    {$pull: { following: req.body.unfollowId }}, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err});
      }
      next()
    }
  )
}

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {$pull: { followers: req.body.userId }},
    {new: true}, // This is so that the data we get back is the updated data not the old one. 
  )
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}