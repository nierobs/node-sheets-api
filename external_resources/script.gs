'use strict'

const spreadsheetId = '1YPe4FgWX88SOKu4lDCKe0G3NyhsNzmzMkMf1wP5ZRVs'

function doGet(_) {
  const range = 'C3:F'

  try {
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, range).values
    const headers = values.shift()

    const data = []
    for (let i = 0; i < values.length; i++) {
      data.push({
        [headers[0]]: Number(values[i][0]),
        [headers[1]]: Number(values[i][1]),
        [headers[2]]: Number(values[i][2]),
        [headers[3]]: Number(values[i][3])
      })
    }

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    throw new Error(err.message)
  }
}

function doPost(e) {
  const range = 'G4:H'
  const valueInputOption = 'RAW'

  const lock = LockService.getScriptLock()
  lock.tryLock(10000) // timeout in milliseconds
  if (!lock.hasLock()) Logger.log('Could not obtain lock after 10 seconds.')

  try {
    const data = Sheets.Spreadsheets.Values.update(e.postData.contents, spreadsheetId, range, { valueInputOption })

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    throw new Error(err.message)
  } finally {
    lock.releaseLock()
  }
}
