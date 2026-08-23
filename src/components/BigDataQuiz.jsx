import { useEffect, useMemo, useState } from 'react'
import {
  BIGDATA_QUESTIONS,
  BIGDATA_SUBJECTS,
} from '../data/bigdataQuestions'
import '../styles/bigdataQuiz.css'

const STORAGE_KEY = 'bigdata-written-quiz-v1'
const OPTION_LABELS = ['①', '②', '③', '④']
const QUESTION_SETS = [
  { value: '1-20', label: 'A세트 · 1~20번' },
  { value: '21-40', label: 'B세트 · 21~40번' },
  { value: '41-60', label: 'C세트 · 41~60번' },
  { value: '61-80', label: 'D세트 · 61~80번' },
  { value: '81-100', label: '보충 · 81~100번' },
  { value: '1-100', label: '전체 · 1~100번' },
]

function loadWrongIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return Array.isArray(stored.wrongIds) ? stored.wrongIds : []
  } catch {
    return []
  }
}

function saveWrongIds(wrongIds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ wrongIds }))
}

function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function BigDataQuiz({ onExit }) {
  const [screen, setScreen] = useState('home')
  const [subjectId, setSubjectId] = useState(0)
  const [questionSet, setQuestionSet] = useState('1-20')
  const [randomOrder, setRandomOrder] = useState(false)
  const [wrongIds, setWrongIds] = useState(loadWrongIds)
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [sessionCorrect, setSessionCorrect] = useState(0)

  const questionById = useMemo(
    () => new Map(BIGDATA_QUESTIONS.map((question) => [question.id, question])),
    [],
  )
  const currentQuestion = questionById.get(queue[currentIndex])
  const isAnswered = selectedOption !== null
  const isCorrect = isAnswered && selectedOption === currentQuestion?.answer

  useEffect(() => {
    const previousTitle = document.title
    document.title = '빅데이터분석기사 최신 경향 400제'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const updateWrongIds = (nextWrongIds) => {
    setWrongIds(nextWrongIds)
    saveWrongIds(nextWrongIds)
  }

  const beginQuiz = (mode = 'all') => {
    let questions

    if (mode === 'wrong') {
      questions = wrongIds
        .map((id) => questionById.get(id))
        .filter(Boolean)
    } else {
      const [start, end] = questionSet.split('-').map(Number)
      questions = BIGDATA_QUESTIONS.filter(
        (question) =>
          (subjectId === 0 || question.subjectId === subjectId) &&
          question.number >= start &&
          question.number <= end,
      )
    }

    if (randomOrder) questions = shuffle(questions)

    setQueue(questions.map((question) => question.id))
    setCurrentIndex(0)
    setSelectedOption(null)
    setSessionCorrect(0)
    setScreen(questions.length ? 'quiz' : 'empty')
  }

  const chooseOption = (optionIndex) => {
    if (!currentQuestion || isAnswered) return

    setSelectedOption(optionIndex)
    const wasCorrect = optionIndex === currentQuestion.answer
    const nextWrong = new Set(wrongIds)

    if (wasCorrect) {
      nextWrong.delete(currentQuestion.id)
      setSessionCorrect((count) => count + 1)
    } else {
      nextWrong.add(currentQuestion.id)
    }
    updateWrongIds([...nextWrong])
  }

  const goNext = () => {
    if (currentIndex >= queue.length - 1) {
      setScreen('complete')
      return
    }
    setCurrentIndex((index) => index + 1)
    setSelectedOption(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearWrongAnswers = () => {
    if (!window.confirm('저장된 오답을 모두 삭제할까요?')) return
    updateWrongIds([])
  }

  const goHome = () => {
    setScreen('home')
    setQueue([])
    setSelectedOption(null)
  }

  if (screen === 'home') {
    return (
      <main className="bigdata-quiz">
        <section className="quiz-home-card">
          <div className="quiz-kicker">빅데이터분석기사 필기</div>
          <h1>최신 경향 400제</h1>
          <p className="quiz-home-card__description">
            답을 고르면 바로 정답과 해설을 확인할 수 있어요.
            틀린 문제는 자동 저장되며 나중에 오답만 다시 풀 수 있습니다.
          </p>

          <div className="quiz-data-status">
            <span>전체 문제</span>
            <strong>{BIGDATA_QUESTIONS.length}문항</strong>
            <span>저장된 오답</span>
            <strong className="quiz-data-status__wrong">{wrongIds.length}문항</strong>
          </div>

          <div className="quiz-settings">
            <fieldset className="quiz-subject-picker">
              <legend>과목 선택</legend>
              <div>
                <button
                  type="button"
                  className={subjectId === 0 ? 'is-selected' : ''}
                  onClick={() => setSubjectId(0)}
                >
                  전 과목
                  <small>400문항</small>
                </button>
                {BIGDATA_SUBJECTS.map((subject) => (
                  <button
                    type="button"
                    className={subjectId === subject.id ? 'is-selected' : ''}
                    key={subject.id}
                    onClick={() => setSubjectId(subject.id)}
                  >
                    {subject.id}과목
                    <small>{subject.name} · 100문항</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <label>
              문제 범위
              <select value={questionSet} onChange={(event) => setQuestionSet(event.target.value)}>
                {QUESTION_SETS.map((set) => (
                  <option key={set.value} value={set.value}>{set.label}</option>
                ))}
              </select>
            </label>
            <label className="quiz-check-label">
              <input
                type="checkbox"
                checked={randomOrder}
                onChange={(event) => setRandomOrder(event.target.checked)}
              />
              문제 순서 섞기
            </label>
          </div>

          <button type="button" className="quiz-primary-btn" onClick={() => beginQuiz('all')}>
            선택한 문제 풀기
          </button>
          <button
            type="button"
            className="quiz-wrong-btn"
            onClick={() => beginQuiz('wrong')}
            disabled={!wrongIds.length}
          >
            오답만 다시 풀기 <span>{wrongIds.length}</span>
          </button>
          {wrongIds.length > 0 && (
            <button type="button" className="quiz-text-btn" onClick={clearWrongAnswers}>
              오답 기록 초기화
            </button>
          )}
          {onExit && (
            <button type="button" className="quiz-back-link" onClick={onExit}>
              ← 기존 첫 화면으로 돌아가기
            </button>
          )}
        </section>
      </main>
    )
  }

  if (screen === 'empty') {
    return (
      <main className="bigdata-quiz">
        <section className="quiz-message-card">
          <div className="quiz-message-card__icon">✓</div>
          <h1>저장된 오답이 없습니다</h1>
          <p>새 문제를 풀면 틀린 문항이 이곳에 자동으로 모입니다.</p>
          <button type="button" className="quiz-primary-btn" onClick={goHome}>문제 선택으로</button>
        </section>
      </main>
    )
  }

  if (screen === 'complete') {
    return (
      <main className="bigdata-quiz">
        <section className="quiz-message-card">
          <div className="quiz-message-card__icon">🎯</div>
          <h1>이번 풀이 완료</h1>
          <p>
            {queue.length}문제 중 <strong>{sessionCorrect}문제</strong>를 맞혔습니다.
          </p>
          <p>현재 저장된 오답은 {wrongIds.length}문제입니다.</p>
          <button type="button" className="quiz-primary-btn" onClick={goHome}>다른 세트 풀기</button>
          <button
            type="button"
            className="quiz-wrong-btn"
            onClick={() => beginQuiz('wrong')}
            disabled={!wrongIds.length}
          >
            오답만 다시 풀기
          </button>
        </section>
      </main>
    )
  }

  if (!currentQuestion) return null

  const progress = ((currentIndex + 1) / queue.length) * 100

  return (
    <main className="bigdata-quiz">
      <section className="quiz-shell">
        <header className="quiz-header">
          <button type="button" className="quiz-exit-btn" onClick={goHome}>← 나가기</button>
          <div className="quiz-header__stats">
            <span>{currentIndex + 1} / {queue.length}</span>
            <span>정답 {sessionCorrect}</span>
            <span className="quiz-header__wrong">오답 {wrongIds.length}</span>
          </div>
        </header>
        <div className="quiz-progress" aria-label={`진행률 ${Math.round(progress)}%`}>
          <div style={{ width: `${progress}%` }} />
        </div>

        <article className="quiz-question-card">
          <div className="quiz-question-meta">
            <span>{currentQuestion.subjectId}과목 · {currentQuestion.subjectName}</span>
            <span>{currentQuestion.number}번</span>
            <span className={`difficulty difficulty--${currentQuestion.difficulty}`}>
              난이도 {currentQuestion.difficulty}
            </span>
          </div>
          <h1>{currentQuestion.text}</h1>

          <div className="quiz-options" role="group" aria-label="정답 선택">
            {currentQuestion.options.map((option, optionIndex) => {
              const correctOption = isAnswered && optionIndex === currentQuestion.answer
              const wrongSelection = isAnswered && optionIndex === selectedOption && !correctOption
              let className = 'quiz-option'
              if (correctOption) className += ' quiz-option--correct'
              if (wrongSelection) className += ' quiz-option--wrong'

              return (
                <button
                  type="button"
                  className={className}
                  key={`${currentQuestion.id}-${optionIndex}`}
                  onClick={() => chooseOption(optionIndex)}
                  disabled={isAnswered}
                >
                  <span>{OPTION_LABELS[optionIndex]}</span>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <section className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
              <strong>{isCorrect ? '정답입니다!' : `오답입니다. 정답은 ${OPTION_LABELS[currentQuestion.answer]}입니다.`}</strong>
              <p>{currentQuestion.explanation}</p>
            </section>
          )}

          {isAnswered && (
            <button type="button" className="quiz-next-btn" onClick={goNext}>
              {currentIndex === queue.length - 1 ? '결과 보기' : '다음 문제 →'}
            </button>
          )}
        </article>
      </section>
    </main>
  )
}
