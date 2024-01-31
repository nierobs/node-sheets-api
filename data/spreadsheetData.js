'use strict'

const axios = require('axios')

const apiUrl = process.env.API_URL

const errorMessage = function(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(error.message)
  }
  console.log(error.config)
}

exports.get = async function(url = apiUrl) {
  let data = {}

  await axios.get(url).then(function (response) {
    data = response
  }).catch(function (error) {
    errorMessage(error)
  })

  return data
}

exports.update = async function(data, url = apiUrl) {
  await axios.post(url, data).then(function (response) {
    data = response
  }).catch(function (error) {
    errorMessage(error)
  })

  return data
}
