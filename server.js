require('dotenv').config()
const app = require('./src/app')
const {connectRedis, disconnectRedis} = require('./src/configs/redisClient')

const port = process.env.PORT || 3000

connectRedis()
  .then(() => {
    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))
  })
  .catch(err => {
    console.error('Failed to connect to Redis', err)
    process.exit(1)
  })

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  await disconnectRedis()
  process.exit(0)
})
