import { useState, useEffect } from 'react'
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

  const currentQuestion = questions[currentIndex]

  // 현재 문항 ID 기준으로 answers에서만 선택값 계산 (local state 없음)
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id,
  )
  const selectedScore = currentAnswer ? currentAnswer.score : null

  // 문항 변경 시 focus 잔상 제거
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [currentQuestion.id])

  const buildUpdatedAnswers = (score) => {
    const newAnswer = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      score,
    }
    const filtered = answers.filter((a) => a.questionId !== currentQuestion.id)
    return [...filtered, newAnswer]
  }

  const handleSelect = (score, event) => {
    event?.currentTarget?.blur()

    const newAnswer = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      score,
    }
    onAnswer(newAnswer)

    const updatedAnswers = buildUpdatedAnswers(score)

    setTimeout(() => {
      if (currentIndex < TOTAL - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        onFinish(updatedAnswers)
      }
    }, 180)
  }

  const handleNext = () => {
    if (selectedScore === null) return
    if (currentIndex < TOTAL - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      onFinish(buildUpdatedAnswers(selectedScore))
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    } else {
      onBack()
    }
  }

  return (
    <div className="screen question-screen">
      <ProgressBar current={currentIndex + 1} total={TOTAL} />

      <div className="question-card" key={`question-${currentQuestion.id}`}>
        <span className="question-number">질문 {currentQuestion.id}</span>
        <p className="question-text">{currentQuestion.text}</p>
      </div>

      <div
        className="score-options"
        key={`options-${currentQuestion.id}`}
        role="group"
        aria-label="응답 선택"
      >
        {SCORE_OPTIONS.map((opt) => {
          const isSelected = selectedScore === opt.score
          return (
            <button
              key={`${currentQuestion.id}-${opt.score}`}
              type="button"
              className={`score-btn ${isSelected ? 'score-btn--selected' : ''}`}
              onClick={(e) => handleSelect(opt.score, e)}
              aria-pressed={isSelected}
              aria-label={`${opt.score}점: ${opt.label}`}
            >
              <span className="score-btn__number">{opt.score}</span>
              <span className="score-btn__emoji">{opt.emoji}</span>
              <span className="score-btn__label">{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="question-nav">
        <CuteButton onClick={handlePrev} variant="secondary" size="medium">
          ← 이전
        </CuteButton>
        {selectedScore !== null && currentIndex < TOTAL - 1 && (
          <CuteButton onClick={handleNext} variant="primary" size="medium">
            다음 →
          </CuteButton>
        )}
        {selectedScore !== null && currentIndex === TOTAL - 1 && (
          <CuteButton
            onClick={() => onFinish(buildUpdatedAnswers(selectedScore))}
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
