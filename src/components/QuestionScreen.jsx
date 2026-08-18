import { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import CuteButton from './CuteButton'
import MiniQuestionImage from './MiniQuestionImage'

const SCORE_OPTIONS = [
  { score: 1, emoji: '😐', label: '전혀 아니야' },
  { score: 2, emoji: '🙂', label: '조금 아니야' },
  { score: 3, emoji: '😺', label: '보통이야' },
  { score: 4, emoji: '😄', label: '조금 그래' },
  { score: 5, emoji: '🤩', label: '아주 그래' },
]

function mergeAnswer(prevAnswers, newAnswer) {
  const exists = prevAnswers.some((a) => a.questionId === newAnswer.questionId)
  if (exists) {
    return prevAnswers.map((a) =>
      a.questionId === newAnswer.questionId ? newAnswer : a,
    )
  }
  return [...prevAnswers, newAnswer]
}

export default function QuestionScreen({
  questions,
  version = 'teen',
  answers,
  onAnswersChange,
  onComplete,
  onBack,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [localAnswers, setLocalAnswers] = useState(answers)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const total = questions.length

  useEffect(() => {
    setLocalAnswers(answers)
  }, [answers])

  const currentQuestion = questions[currentIndex]
  const currentAnswer = currentQuestion
    ? localAnswers.find((a) => a.questionId === currentQuestion.id)
    : null
  const selectedScore = currentAnswer ? currentAnswer.score : null
  const selectedChoiceLabel = currentAnswer?.choiceLabel ?? null

  useEffect(() => {
    if (!currentQuestion) return
    setIsAdvancing(false)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [currentQuestion?.id])

  const handleSelect = (opt, event) => {
    if (!currentQuestion || isAdvancing) return
    event?.currentTarget?.blur()

    const newAnswer = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      score: opt.score,
      choiceLabel: opt.label,
    }
    const updatedAnswers = mergeAnswer(localAnswers, newAnswer)
    setLocalAnswers(updatedAnswers)
    onAnswersChange(updatedAnswers)
    setIsAdvancing(true)

    const isLastQuestion = currentIndex === total - 1
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete(updatedAnswers)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
      setIsAdvancing(false)
    }, version === 'mini' ? 350 : 150)
  }

  const handleNext = () => {
    if (!currentQuestion || selectedScore === null) return
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      onComplete(localAnswers)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    } else {
      onBack()
    }
  }

  if (!currentQuestion) {
    return (
      <div className="screen question-screen">
        <div className="question-card"><p>결과를 준비하고 있어요...</p></div>
      </div>
    )
  }

  const isChoiceMode = Boolean(currentQuestion.choices)
  const isMini = version === 'mini'

  if (isMini && isChoiceMode) {
    return (
      <div className="screen question-screen question-screen--mini">
        <div className="mini-survey-header">
          <span className="mini-survey-header__badge">🌱 MINI 진로놀이</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={total} />
        <div className="mini-question-card" key={`mini-q-${currentQuestion.id}`}>
          <MiniQuestionImage
            key={`mini-img-${currentQuestion.id}`}
            questionId={currentQuestion.id}
            alt={currentQuestion.situation || currentQuestion.text}
          />
          {currentQuestion.situation && (
            <p className="mini-situation">{currentQuestion.situation}</p>
          )}
          {currentQuestion.text && (
            <p className="mini-question-text">{currentQuestion.text}</p>
          )}
        </div>
        <div
          className={`mini-choice-grid ${isAdvancing ? 'mini-choice-grid--locked' : ''}`}
          key={`mini-options-${currentQuestion.id}`}
          role="group"
          aria-label="응답 선택"
        >
          {currentQuestion.choices.map((opt) => {
            const isSelected = selectedChoiceLabel === opt.label
            return (
              <button
                key={`${currentQuestion.id}-${opt.label}`}
                type="button"
                className={`mini-choice-card ${isSelected ? 'mini-choice-card--selected' : ''}`}
                onClick={(e) => handleSelect(opt, e)}
                disabled={isAdvancing}
                aria-pressed={isSelected}
                aria-label={opt.label}
              >
                {isSelected && <span className="mini-choice-card__sparkle">⭐</span>}
                <span className="mini-choice-card__emoji">{opt.emoji}</span>
                <span className="mini-choice-card__label">{opt.label}</span>
              </button>
            )
          })}
        </div>
        <div className="question-nav">
          <CuteButton onClick={handlePrev} variant="secondary" size="medium">← 이전</CuteButton>
        </div>
      </div>
    )
  }

  return (
    <div className={`screen question-screen question-screen--${version}`}>
      <ProgressBar current={currentIndex + 1} total={total} />
      <div className="question-card" key={`question-${currentQuestion.id}`}>
        <span className="question-number">질문 {currentIndex + 1}</span>
        <p className="question-text">{currentQuestion.text}</p>
      </div>
      <div className="score-options" key={`options-${currentQuestion.id}`} role="group" aria-label="응답 선택">
        {SCORE_OPTIONS.map((opt) => {
          const isSelected = selectedScore === opt.score
          return (
            <button
              key={`${currentQuestion.id}-${opt.score}`}
              type="button"
              className={`score-btn ${isSelected ? 'score-btn--selected' : ''}`}
              onClick={(e) => handleSelect({ score: opt.score, label: String(opt.score) }, e)}
              disabled={isAdvancing}
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
        <CuteButton onClick={handlePrev} variant="secondary" size="medium">← 이전</CuteButton>
        {selectedScore !== null && currentIndex < total - 1 && (
          <CuteButton onClick={handleNext} variant="primary" size="medium">다음 →</CuteButton>
        )}
        {selectedScore !== null && currentIndex === total - 1 && (
          <CuteButton onClick={() => onComplete(localAnswers)} variant="primary" size="medium">결과 보기 🎉</CuteButton>
        )}
      </div>
    </div>
  )
}
