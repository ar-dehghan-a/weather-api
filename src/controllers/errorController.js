const AppError = require('../utils/appError')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.error('ERROR 💥', err)

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

module.exports = (err, _req, res, _next) => {
  let error = err

  error.statusCode = err.statusCode || 500
  error.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res)
  }
}
