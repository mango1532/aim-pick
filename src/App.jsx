import { useState, useMemo } from 'react'
import StartScreen from './components/StartScreen'
import VersionIntroScreen from './components/VersionIntroScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import { getQuestionsByVersion } from './data/questionSets'
import { VERSIONS } from './data/versions'
import {
  calculateResult,
  validateAnswers,
  getResultData,
  generateRandomAnswers,
  createDemoScoresForCode,
} from './utils/calculateResult'

const SCREENS = {
  START: 'start',
  INTRO: 'intro',
  QUESTION: 'question',
  RESULT: 'result',
  ERROR: 'error',
}

function createEmptySurveyState() {
  return { answers: [], result: null, errorMessage: '' }
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.START)
  const [version, setVersion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const questionList = useMemo(
    () => (version ? getQuestionsByVersion(version) : []),
    [version],
  )

  const resetSurveyState = () => {
    const empty = createEmptySurveyState()
    setAnswers(empty.answers)
    setResult(empty.result)
    setErrorMessage(empty.errorMessage)
  }

  const goToStart = () => {
    setScreen(SCREENS.START)
    setVersion(null)
    resetSurveyState()
  }

  const handleSelectVersion = (versionId) => {
    setVersion(versionId)
    resetSurveyState()
    setScreen(SCREENS.INTRO)
  }

  const goToQuestion = () => {
    resetSurveyState()
    setScreen(SCREENS.QUESTION)
  }

  const showResult = (answerList, activeVersion = version) => {
    const questions = getQuestionsByVersion(activeVersion)
    const validation = validateAnswers(answerList, questions)
    if (!validation.valid) {
      setErrorMessage('아직 대답하지 않은 질문이 있어요!')
      setScreen(SCREENS.ERROR)
      return
    }

    const calculated = calculateResult(answerList, questions)
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

  const handleSurveyComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    showResult(finalAnswers, version)
  }

  const handleDemoRandom = () => {
    const teenQuestions = getQuestionsByVersion(VERSIONS.teen.id)
    const randomAnswers = generateRandomAnswers(teenQuestions)
    setVersion(VERSIONS.teen.id)
    setAnswers(randomAnswers)
    showResult(randomAnswers, VERSIONS.teen.id)
  }

  const handleDemoType = (code) => {
    const demoResult = createDemoScoresForCode(code)
    const data = getResultData(demoResult.resultCode)
    if (data) {
      setVersion(VERSIONS.teen.id)
      setResult(demoResult)
      setScreen(SCREENS.RESULT)
    }
  }

  const resultData = result ? getResultData(result.resultCode) : null

  return (
    <div className="app">
      {screen === SCREENS.START && (
        <StartScreen
          onSelectVersion={handleSelectVersion}
          onDemoRandom={handleDemoRandom}
          onDemoType={handleDemoType}
        />
      )}

      {screen === SCREENS.INTRO && version && (
        <VersionIntroScreen
          versionId={version}
          onStart={goToQuestion}
          onBack={goToStart}
        />
      )}

      {screen === SCREENS.QUESTION && version && (
        <QuestionScreen
          key={`survey-${version}`}
          questions={questionList}
          version={version}
          answers={answers}
          onAnswersChange={setAnswers}
          onComplete={handleSurveyComplete}
          onBack={() => setScreen(SCREENS.INTRO)}
        />
      )}

      {screen === SCREENS.RESULT && (
        <ResultScreen
          result={result}
          resultData={resultData}
          version={version || VERSIONS.teen.id}
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
