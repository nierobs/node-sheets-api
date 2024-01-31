'use strict'

const fs = require('fs')
const dir = (process.env.NODE_ENV === 'production') ? '/usr/src/app/logs' : __dirname + '/../logs'

const datetime = function() {
  const utcDate = new Date().toISOString()

  return utcDate.substring(0, 10) + ' ' + utcDate.substring(11, 19)
}

exports.writeToLog = function(response) {
  const path = dir + '/' + datetime().substring(0, 10) + '.log'
  const data = datetime() + ' ' + JSON.stringify({ status: response.status, headers: response.headers, data: response.data }) + "\n"

  try {
    fs.appendFileSync(path, data, { flag: 'a' })
  } catch (error) {
    console.error(error)
  }
}
