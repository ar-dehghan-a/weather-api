const {createClient} = require('redis')

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    reconnectStrategy: retries => {
      if (retries > 10) return new Error('Redis reconnection failed after 10 attempts')
      return Math.min(retries * 100, 3000)
    },
  },
})

client.on('error', async err => console.error('Redis Client Error:', err))
client.on('connect', () => console.log('Connected to Redis...'))

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

const disconnectRedis = async () => {
  if (client.isOpen) {
    await client.quit()
  }
}

module.exports = {connectRedis, disconnectRedis, client}
