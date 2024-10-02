const {createClient} = require('redis')

const client = createClient()

client.on('error', err => console.error('Redis Client Error', err))
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
