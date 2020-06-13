// Using Express
const Express = require('express')
const app = Express()

// CORS
const cors = require('cors')

// fs
const fs = require('fs')

// Express Validator
const expressValidator = require('express-validator')

// Use Body-parser to parse body requests from express
const bodyParser = require('body-parser')

// Use cookie parser
var cookieParser = require('cookie-parser')

// Using mongoose
const mongoose = require('mongoose')

// Load env variables
const dotenv = require('dotenv')
dotenv.config()

// middleware
const morgan = require("morgan")
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// Bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const jobsRoutes = require('./routes/jobs')

// Database
mongoose.connect(process.env.MONGO_URI, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

// API Docs
app.get('/', (req, res) => {
  fs.readFile('./docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

app.use('/', postRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', jobsRoutes)
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized"});
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`A node JS API is listening to port: ${port}`)})
