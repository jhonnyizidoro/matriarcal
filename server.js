const { join } = require('path')
const { globalVariables, clearAlert } = require('./app/Middleware')
const assets = require('express-asset-versions')
const session = require('express-session')
const compression = require('compression')
const routes = require('./routes')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const app = express()
const port = process.env.PORT || 80
const dev = process.env.NODE_ENV !== 'production'

//App config
app.set('view engine', 'pug')
app.enable('trust proxy')
app.set('views', join(__dirname, 'resources', 'views'))

//Static files
app.use(express.static(join(__dirname, 'public')))
app.use(assets('/', join(__dirname, 'public')))
app.use('/storage', express.static(join(__dirname, 'storage')))

//Middlewares
if (dev) {
	app.use(logger('dev'))
} else {
	app.use(compression())
	app.use(helmet({ contentSecurityPolicy: false }))
}

app.use(session({ secret: '8790891726', resave: false, saveUninitialized: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '20mb' }))
app.use(globalVariables)
app.use(routes)

//Run server
app.listen(port, () => console.log(`Running on port ${port}`))