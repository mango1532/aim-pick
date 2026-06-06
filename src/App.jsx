import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import {
  calculateResult,
  validateAnswers,
  getResultData,
  generateRandomAnswers,
  createDemoScoresForCode,
} from './utils/calculateResult'

/** 화면 상태: start | question | result | error */
const SCREENS = {
  START: 'start',
  QUESTION: 'question',
  RESULT: 'result',
  ERROR: 'error',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.START)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const goToStart = () => {
    setScreen(SCREENS.START)
    setAnswers([])
    setResult(null)
    setErrorMessage('')
  }

  const goToQuestion = () => {
    setAnswers([])
    setResult(null)
    setErrorMessage('')
    setScreen(SCREENS.QUESTION)
  }

  const handleAnswer = (answer) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== answer.questionId)
      return [...filtered, answer]
    })
  }

  const showResult = (answerList) => {
    const validation = validateAnswers(answerList)
    if (!validation.valid) {
      setErrorMessage('아직 대답하지 않은 질문이 있어요!')
      setScreen(SCREENS.ERROR)
      return
    }

    const calculated = calculateResult(answerList)
    if (!calculated) {
      setErrorMessage('결과를 계산할 수 없어요. 다시 시도해 주세요.')
      setScreen(SCREENS.ERROR)
      return
    }

    const data = getResultData(calculated.resultCode)
    if (!data) {
      setErrorMessage('결과 유형을 찾을 수 없어요.')
      setScreen(SCREENS.ERROR)
      return
    }

    setResult(calculated)
    setScreen(SCREENS.RESULT)
  }

  const handleFinish = (finalAnswers) => {
    showResult(finalAnswers || answers)
  }

  /** 시연용: 랜덤 응답 */
  const handleDemoRandom = () => {
    const randomAnswers = generateRandomAnswers()
    setAnswers(randomAnswers)
    showResult(randomAnswers)
  }

  /** 시연용: 특정 유형 결과 */
  const handleDemoType = (code) => {
    const demoResult = createDemoScoresForCode(code)
    const data = getResultData(demoResult.resultCode)
    if (data) {
      setResult(demoResult)
      setScreen(SCREENS.RESULT)
    }
  }

  const resultData = result ? getResultData(result.resultCode) : null

  return (
    <div className="app">
      {screen === SCREENS.START && (
        <StartScreen
          onStart={goToQuestion}
          onDemoRandom={handleDemoRandom}
          onDemoType={handleDemoType}
        />
      )}

      {screen === SCREENS.QUESTION && (
        <QuestionScreen
          answers={answers}
          onAnswer={handleAnswer}
          onFinish={handleFinish}
          onBack={goToStart}
        />
      )}

      {screen === SCREENS.RESULT && (
        <ResultScreen
          result={result}
          resultData={resultData}
          onRestart={goToStart}
        />
      )}

      {screen === SCREENS.ERROR && (
        <div className="screen error-screen">
          <div className="error-card">
            <span className="error-card__emoji">😿</span>
            <h2>{errorMessage}</h2>
            <button type="button" className="cute-btn cute-btn--primary" onClick={goToStart}>
              처음으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
