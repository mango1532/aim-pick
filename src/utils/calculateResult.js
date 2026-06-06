import { questions } from '../data/questions'
import { resultTypes } from '../data/resultTypes'

/** 동점 시 우선순위: M > Q > A > H > L > P */
const TYPE_PRIORITY = ['M', 'Q', 'A', 'H', 'L', 'P']

const TOTAL_QUESTIONS = questions.length

/**
 * 모든 문항에 답변했는지 확인
 * @param {Array} answers
 * @returns {{ valid: boolean, missingCount: number }}
 */
export function validateAnswers(answers) {
  if (!answers || answers.length < TOTAL_QUESTIONS) {
    const answeredIds = new Set((answers || []).map((a) => a.questionId))
    const missingCount = questions.filter((q) => !answeredIds.has(q.id)).length
    return { valid: false, missingCount }
  }
  return { valid: true, missingCount: 0 }
}

/**
 * 6개 기본 유형별 점수 합산 및 복합 유형 산출
 * @param {Array<{ questionId: number, type: string, score: number }>} answers
 * @returns {{ scores: object, topTypes: string[], resultCode: string } | null}
 */
export function calculateResult(answers) {
  const validation = validateAnswers(answers)
  if (!validation.valid) {
    return null
  }

  // 유형별 점수 초기화
  const scores = { M: 0, Q: 0, A: 0, H: 0, L: 0, P: 0 }

  answers.forEach((answer) => {
    if (scores[answer.type] !== undefined) {
      scores[answer.type] += answer.score
    }
  })

  // 점수 내림차순, 동점 시 TYPE_PRIORITY 적용
  const sortedTypes = [...TYPE_PRIORITY].sort((a, b) => {
    if (scores[b] !== scores[a]) {
      return scores[b] - scores[a]
    }
    return TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b)
  })

  const first = sortedTypes[0]
  const second = sortedTypes[1]

  // 우선순위 순으로 정렬하여 복합 코드 생성 (MQ === QM, MA === AM)
  const resultCode = buildResultCode(first, second)

  return {
    scores,
    topTypes: [first, second],
    resultCode,
  }
}

/**
 * 두 유형을 우선순위(M>Q>A>H>L>P) 순으로 조합해 결과 코드 생성
 */
export function buildResultCode(type1, type2) {
  return [type1, type2]
    .sort((a, b) => TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b))
    .join('')
}

/**
 * 결과 코드로 결과 데이터 조회
 * @param {string} resultCode
 * @returns {object | null}
 */
export function getResultData(resultCode) {
  return resultTypes[resultCode] || null
}

/**
 * 시연용: 특정 유형 결과를 위한 가짜 점수 생성
 * @param {string} code - 예: "MH"
 */
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

/**
 * 시연용: 랜덤 답변 생성
 */
export function generateRandomAnswers() {
  return questions.map((q) => ({
    questionId: q.id,
    type: q.type,
    score: Math.floor(Math.random() * 5) + 1,
  }))
}
