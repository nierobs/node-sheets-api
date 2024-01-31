'use strict'

const spreadsheetData = require('../data/spreadsheetData')
const { writeToLog } = require('../handler/logHandler')

exports.get = async function() {
  const response = await spreadsheetData.get()
  writeToLog(response)

  // Check if the http status code is 3xx and follows the header location
  if (/^3/.test(response.status) && response.headers.location) {
    response = await spreadsheetData.get(response.headers.location)
    writeToLog(response)
  }

  // Checks if the http status code is other than 2xx
  if (/^[^2]/.test(response.status)) throw new Error('Something bad happened')

  return response.data
}

exports.update = async function(data) {
  const response = await spreadsheetData.update(data)
  writeToLog(response)

  // Check if the http status code is 3xx and follows the header location
  if (/^3/.test(response.status) && response.headers.location) {
    response = await spreadsheetData.update(data, response.headers.location)
    writeToLog(response)
  }

  // Checks if the http status code is other than 2xx
  if (/^[^2]/.test(response.status)) throw new Error('Something bad happened')

  return response.data
}
