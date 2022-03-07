// Requirements
const path = require('path')
const express = require('express')
const { Liquid } = require('liquidjs') // View engine
const helmet = require('helmet') // Security and HTTP header middleware
const cors = require('cors') // Handling CORS for accessible APIs
const morgan = require('morgan') // Request logging
const compression = require('compression') // GZIP middleware for compressing responses

// App
const app = express()

// Server Setup
const engine = new Liquid({
  layouts: './views/layouts/',
  partials: './views/partials/'
})

app.engine('liquid', engine.express())
app.set('views', './views/')
app.set('view engine', 'liquid')

// Middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true })) // Handling form data
app.use(express.json()) // Handling JSON data
app.use(compression())

// Routes
require('./routes/index.js')(app)

// Export App for server/testing
module.exports = app
