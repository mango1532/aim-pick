import subject1Raw from '../../study/bigdata-analyst-written/subject-1-planning.md?raw'
import subject2Raw from '../../study/bigdata-analyst-written/subject-2-exploration.md?raw'
import subject3Raw from '../../study/bigdata-analyst-written/subject-3-modeling.md?raw'
import subject4Raw from '../../study/bigdata-analyst-written/subject-4-interpretation.md?raw'

const SUBJECTS = [
  { id: 1, name: '빅데이터 분석기획', raw: subject1Raw },
  { id: 2, name: '빅데이터 탐색', raw: subject2Raw },
  { id: 3, name: '빅데이터 모델링', raw: subject3Raw },
  { id: 4, name: '빅데이터 결과 해석', raw: subject4Raw },
]

const OPTION_SYMBOLS = ['①', '②', '③', '④']

function cleanText(value) {
  return value
    .replace(/ {2,}\n/g, '\n')
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\\[(.*?)\\\]/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseAnswers(answerSection) {
  const answers = new Map()
  const answerPattern = /^(\d+)\.\s+\*\*([①②③④])\*\*\s*(?:—|-)?\s*(.+)$/gm
  let match

  while ((match = answerPattern.exec(answerSection)) !== null) {
    answers.set(Number(match[1]), {
      answer: OPTION_SYMBOLS.indexOf(match[2]),
      explanation: cleanText(match[3]),
    })
  }

  return answers
}

function parseOptions(body) {
  const firstOptionIndex = OPTION_SYMBOLS
    .map((symbol) => body.indexOf(symbol))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0]

  if (firstOptionIndex === undefined) return null

  const text = cleanText(body.slice(0, firstOptionIndex))
  const optionText = body.slice(firstOptionIndex)
  const options = []
  const optionPattern = /([①②③④])\s*([\s\S]*?)(?=(?:[①②③④])\s|$)/g
  let match

  while ((match = optionPattern.exec(optionText)) !== null) {
    options.push(cleanText(match[2]))
  }

  return options.length === 4 ? { text, options } : null
}

function parseSubject({ id: subjectId, name: subjectName, raw }) {
  const [questionSection, answerSection = ''] = raw.split(/^## 정답 및 핵심 해설\s*$/m)
  const answers = parseAnswers(answerSection)
  const questions = []
  const questionPattern = /^### (\d+)\.\s*\[(?:난이도:\s*)?(하|중|상)\]\s*\n([\s\S]*?)(?=^### \d+\.|(?![\s\S]))/gm
  let match

  while ((match = questionPattern.exec(questionSection)) !== null) {
    const number = Number(match[1])
    const parsed = parseOptions(match[3])
    const answerData = answers.get(number)

    if (!parsed || !answerData) continue

    questions.push({
      id: `${subjectId}-${number}`,
      subjectId,
      subjectName,
      number,
      difficulty: match[2],
      text: parsed.text,
      options: parsed.options,
      answer: answerData.answer,
      explanation: answerData.explanation,
    })
  }

  return questions
}

export const BIGDATA_SUBJECTS = SUBJECTS.map(({ id, name }) => ({ id, name }))
export const BIGDATA_QUESTIONS = SUBJECTS.flatMap(parseSubject)

if (BIGDATA_QUESTIONS.length !== 400) {
  console.error(`빅데이터 문제 파싱 오류: 400문항 중 ${BIGDATA_QUESTIONS.length}문항만 불러왔습니다.`)
}
