import { useState } from 'react'
import ProgressBar from './ProgressBar'
import CuteButton from './CuteButton'
import { questions } from '../data/questions'

const SCORE_OPTIONS = [
  { score: 1, emoji: '😐', label: '전혀 아니야' },
  { score: 2, emoji: '🙂', label: '조금 아니야' },
  { score: 3, emoji: '😺', label: '보통이야' },
  { score: 4, emoji: '😄', label: '조금 그래' },
  { score: 5, emoji: '🤩', label: '아주 그래' },
]

const TOTAL = questions.length

export default function QuestionScreen({ answers, onAnswer, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedScore, setSelectedScore] = useState(null)

  const currentQuestion = questions[currentIndex]
  const existingAnswer = answers.find((a) => a.questionId === currentQuestion.id)

  const goToQuestion = (index) => {
    setCurrentIndex(index)
    const prev = answers.find((a) => a.questionId === questions[index].id)
    setSelectedScore(prev ? prev.score : null)
  }

  const buildUpdatedAnswers = (score) => {
    const newAnswer = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      score,
    }
    const filtered = answers.filter((a) => a.questionId !== currentQuestion.id)
    return [...filtered, newAnswer]
  }

  const handleSelect = (score) => {
    setSelectedScore(score)
    const updatedAnswers = buildUpdatedAnswers(score)
    onAnswer({
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      score,
    })

    // 선택 후 잠시 뒤 자동으로 다음 문항 이동
    setTimeout(() => {
      if (currentIndex < TOTAL - 1) {
        goToQuestion(currentIndex + 1)
      } else {
        onFinish(updatedAnswers)
      }
    }, 400)
  }

  const handleNext = () => {
    if (displayScore === null) return
    if (currentIndex < TOTAL - 1) {
      goToQuestion(currentIndex + 1)
    } else {
      onFinish(buildUpdatedAnswers(displayScore))
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const displayScore = selectedScore ?? existingAnswer?.score ?? null

  return (
    <div className="screen question-screen">
      <ProgressBar current={currentIndex + 1} total={TOTAL} />

      <div className="question-card">
        <span className="question-number">질문 {currentQuestion.id}</span>
        <p className="question-text">{currentQuestion.text}</p>
      </div>

      <div className="score-options" role="group" aria-label="응답 선택">
        {SCORE_OPTIONS.map((opt) => (
          <button
            key={opt.score}
            type="button"
            className={`score-btn ${displayScore === opt.score ? 'score-btn--selected' : ''}`}
            onClick={() => handleSelect(opt.score)}
            aria-pressed={displayScore === opt.score}
            aria-label={`${opt.score}점: ${opt.label}`}
          >
            <span className="score-btn__number">{opt.score}</span>
            <span className="score-btn__emoji">{opt.emoji}</span>
            <span className="score-btn__label">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="question-nav">
        <CuteButton onClick={handlePrev} variant="secondary" size="medium">
          ← 이전
        </CuteButton>
        {displayScore !== null && currentIndex < TOTAL - 1 && (
          <CuteButton onClick={handleNext} variant="primary" size="medium">
            다음 →
          </CuteButton>
        )}
        {displayScore !== null && currentIndex === TOTAL - 1 && (
          <CuteButton
            onClick={() => onFinish(buildUpdatedAnswers(displayScore))}
            variant="primary"
            size="medium"
          >
            결과 보기 🎉
          </CuteButton>
        )}
      </div>
    </div>
  )
}
