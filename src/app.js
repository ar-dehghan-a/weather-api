const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const redisMiddleware = require('./middlewares/redisMiddleware')
const AppError = require('./utils/appError')
const errorController = require('./controllers/errorController')

const mainRouter = require('./routes')

const app = express()

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
})
app.use(limiter)

app.use(express.json({limit: '10kb'}))
app.use(express.urlencoded({extended: false}))
app.use(cors())
if (process.env['NODE_ENV'] === 'development') app.use(morgan('dev'))

app.use(redisMiddleware)

app.use('/api/v1', mainRouter)

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorController)

module.exports = app
