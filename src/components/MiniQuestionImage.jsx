import { useState, useEffect, useMemo } from 'react'
import { getMiniImageCandidates } from '../data/miniImages'

/**
 * MINI 문항 일러스트 — public/images/mini/01.jpg ~ 12.jpg
 * .jpg 실패 시 .jfif 자동 시도
 */
export default function MiniQuestionImage({ questionId, src, alt = '' }) {
  const candidates = useMemo(() => {
    if (questionId) return getMiniImageCandidates(questionId)
    return src ? [src] : []
  }, [questionId, src])

  const [candidateIndex, setCandidateIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const currentSrc = candidates[candidateIndex] || src
  const expectedFile = questionId
    ? `${String(questionId).padStart(2, '0')}.jfif`
    : null

  useEffect(() => {
    setCandidateIndex(0)
    setIsLoaded(false)
    setHasError(false)
  }, [questionId, src])

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1)
      setIsLoaded(false)
      return
    }
    setHasError(true)
  }

  if (!currentSrc || hasError) {
    return (
      <div className="mini-question-image mini-question-image--placeholder" aria-hidden="true">
        <span className="mini-question-image__placeholder-emoji">🎨</span>
        <p className="mini-question-image__placeholder-text">그림을 준비하고 있어요!</p>
        {expectedFile && (
          <p className="mini-question-image__placeholder-hint">
            public/images/mini/{expectedFile}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mini-question-image">
      {!isLoaded && (
        <div className="mini-question-image__loading">그림 불러오는 중...</div>
      )}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className={`mini-question-image__img ${isLoaded ? 'mini-question-image__img--loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  )
}
