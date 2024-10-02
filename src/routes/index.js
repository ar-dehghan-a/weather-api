const axios = require('axios')
const {Router} = require('express')
const AppError = require('../utils/appError')

const API_KEY = process.env.API_KEY

const route = Router()

route.get('/weather', async (req, res, next) => {
  const {location} = req.query

  if (!location) return next(new AppError('Please provide a location in query.', 400))

  try {
    let weather = await req.redisClient.get(location)

    if (!weather) {
      const data = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${API_KEY}`
      )
      weather = data.data
      await req.redisClient.set(location, JSON.stringify(weather), {
        EX: 3600,
      })
    } else {
      console.log('result is from redis')
      weather = JSON.parse(weather)
    }

    res.status(200).json({
      status: 'success',
      data: {
        latitude: weather.latitude,
        longitude: weather.longitude,
        address: weather.resolvedAddress,
        timezone: weather.timezone,
        tzoffset: weather.tzoffset,
        weather: weather.currentConditions,
      },
    })
  } catch (err) {
    if (err.name === 'AxiosError')
      next(new AppError('Please provide a valid city name or latitude and longitude coordinates.', 400))
    else next(err)
  }
})

route.get('/forecast', async (req, res, next) => {
  const {location} = req.query

  if (!location) return next(new AppError('Please provide a location in query.', 400))

  try {
    let weather = await req.redisClient.get(`${location}-forecast`)

    if (!weather) {
      const data = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&include=days&key=${API_KEY}`
      )
      weather = data.data
      await req.redisClient.set(`${location}-forecast`, JSON.stringify(weather), {
        EX: 3600,
      })
    } else {
      console.log('result is from redis')
      weather = JSON.parse(weather)
    }

    res.status(200).json({
      status: 'success',
      data: {
        latitude: weather.latitude,
        longitude: weather.longitude,
        address: weather.resolvedAddress,
        timezone: weather.timezone,
        tzoffset: weather.tzoffset,
        weather: weather.days,
      },
    })
  } catch (err) {
    next(new AppError('Please provide a valid city name or latitude and longitude coordinates.', 400))
  }
})

module.exports = route
