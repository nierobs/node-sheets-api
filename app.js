'use strict'

const spreadsheetService = require('./service/spreadsheetService')

const failureDueToAbsence = function(totalAbsences) {
  const totalClasses = 60
  const maximumAbsencesAllowed = Math.ceil(totalClasses * 0.25)

  return (totalAbsences > maximumAbsencesAllowed) ? true : false
}

const averageGrade = function(a, b, c) {
  return Math.ceil((a + b + c) / 3)
}

const studentStatus = function(totalAbsences, averageGrade) {
  if (failureDueToAbsence(totalAbsences)) return 'Reprovado por Falta'
  if (averageGrade >= 70) return 'Aprovado'
  if (averageGrade < 50) return 'Reprovado por Nota'
  return 'Exame Final'
}

const gradeForFinalApproval = function(averageGrade, studentStatus) {
  if (studentStatus !== 'Exame Final') return 0
  return Math.ceil(100 - averageGrade)
}

;(async function() {
  const data = await spreadsheetService.get()

  const values = []

  for (let i = 0; i < data.length; i++) {
    const f = data[i]['Faltas']
    const p1 = data[i]['P1']
    const p2 = data[i]['P2']
    const p3 = data[i]['P3']

    const m = averageGrade(p1, p2, p3)
    const s = studentStatus(f, m)
    const naf = gradeForFinalApproval(m, s)

    values.push([s, naf])
  }

  await spreadsheetService.update({ values })
  process.exit(0)
})()
