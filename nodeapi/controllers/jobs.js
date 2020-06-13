const axios = require('axios');

exports.getJobs = (req, res) => {
    const {searchterm, place} = req.body
    axios.get(`https://jobs.github.com/positions.json?description=${searchterm}&location=${place}`)
    .then(response => {
        res.json(response.data)
    })
    .catch((err) => console.log(err))
}
