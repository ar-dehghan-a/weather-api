const express = require('express')
const redisMiddleware = require('./middlewares/redisMiddleware')

const app = express()

app.use(redisMiddleware)

app.get('/', async (req, res) => {
  try {
    const value = await req.redisClient.get('message')
    if (value) {
      res.send(value)
    } else {
      const message = 'Hello, Redis Middleware!'
      await req.redisClient.set('message', message)
      res.send(message)
    }
  } catch (err) {
    res.status(500).send('Redis error')
  }
})

module.exports = app
