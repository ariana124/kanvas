const express = require('express')
const router = express.Router()
const {getJobs} = require('../controllers/jobs')

router.get('/posts', getJobs)

module.exports.router
