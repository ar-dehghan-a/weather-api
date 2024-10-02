const {connectRedis} = require('../configs/redisClient')

const redisMiddleware = async (req, res, next) => {
  try {
    req.redisClient = await connectRedis()
    next()
  } catch (err) {
    console.error('Redis connection failed:', err)
    res.status(500).send('Internal server error')
  }
}

module.exports = redisMiddleware
