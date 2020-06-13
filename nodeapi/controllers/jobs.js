const axios = require('axios');

exports.getJobs = (req, res) => {
    axios.get('https://jobs.github.com/positions.json?description=python&location=new+york')
    .then(response => {
        res.json(response.data)
    })
    .catch((err) => console.log(err))
}
