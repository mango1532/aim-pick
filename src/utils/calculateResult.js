import { questions } from '../data/questions'
import { resultTypes } from '../data/resultTypes'

const TYPE_PRIORITY = ['M', 'Q', 'A', 'H', 'L', 'P']

export function validateAnswers(answers, questionList = questions) {
  if (!answers || answers.length === 0) {
    return { valid: false, missingCount: questionList.length }
  }
  const answeredIds = new Set(answers.map((a) => a.questionId))
  const missingCount = questionList.filter((q) => !answeredIds.has(q.id)).length
  if (missingCount > 0) {
    return { valid: false, missingCount }
  }
  return { valid: true, missingCount: 0 }
}

export function calculateResult(answers, questionList = questions) {
  const validation = validateAnswers(answers, questionList)
  if (!validation.valid) return null

  const scores = { M: 0, Q: 0, A: 0, H: 0, L: 0, P: 0 }
  answers.forEach((answer) => {
    if (scores[answer.type] !== undefined) {
      scores[answer.type] += answer.score
    }
  })

  const sortedTypes = [...TYPE_PRIORITY].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a]
    return TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b)
  })

  const first = sortedTypes[0]
  const second = sortedTypes[1]
  const resultCode = buildResultCode(first, second)

  return { scores, topTypes: [first, second], resultCode }
}

export function buildResultCode(type1, type2) {
  return [type1, type2]
    .sort((a, b) => TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b))
    .join('')
}

export function getResultData(resultCode) {
  return resultTypes[resultCode] || null
}

export function createDemoScoresForCode(code) {
  const [t1, t2] = code.split('')
  const scores = { M: 20, Q: 20, A: 20, H: 20, L: 20, P: 20 }
  scores[t1] = 38
  scores[t2] = 36
  return {
    scores,
    topTypes: scores[t1] >= scores[t2] ? [t1, t2] : [t2, t1],
    resultCode: buildResultCode(t1, t2),
  }
}

export function generateRandomAnswers(questionList = questions) {
  return questionList.map((q) => ({
    questionId: q.id,
    type: q.type,
    score: q.choices
      ? q.choices[Math.floor(Math.random() * q.choices.length)].score
      : Math.floor(Math.random() * 5) + 1,
  }))
}
