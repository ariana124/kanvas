const express = require('express')
const router = express.Router()
const {getJobs} = require('../controllers/jobs')

router.get('/jobs', getJobs)

module.exports = router
