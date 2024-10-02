const express = require('express')
const redis = require('redis')

const redisClient = redis.createClient()

redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.on('connect', () => console.log('Connected to Redis...'))

redisClient.connect().catch(err => {
  console.error('Redis connection error:', err)
})

const app = express()

app.get('/', async (req, res) => {
  try {
    const value = await redisClient.get('message')
    if (value) {
      res.send(value)
    } else {
      const message = 'Hello, Redis!'
      await redisClient.set('message', message)
      res.send(message)
    }
  } catch (err) {
    res.status(500).send('Redis error')
  }
})

module.exports = app
