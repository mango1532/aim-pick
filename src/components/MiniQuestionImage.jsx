import { useState, useEffect, useMemo } from 'react'
import { getMiniImageCandidates, getMiniImageExpectedFiles } from '../utils/miniImageUrl'

export default function MiniQuestionImage({ questionId, alt = '' }) {
  const candidates = useMemo(
    () => (questionId ? getMiniImageCandidates(questionId) : []),
    [questionId],
  )

  const [candidateIndex, setCandidateIndex] = useState(0)
  const [hasError, setHasError] = useState(false)

  const currentSrc = candidates[candidateIndex] ?? null
  const expectedFiles = questionId ? getMiniImageExpectedFiles(questionId) : []

  useEffect(() => {
    setCandidateIndex(0)
    setHasError(false)
  }, [questionId, candidates])

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1)
      return
    }
    setHasError(true)
    if (import.meta.env.DEV) {
      console.warn('[MINI] 이미지 로딩 실패:', { questionId, tried: candidates })
    }
  }

  if (!currentSrc || hasError) {
    return (
      <div
        className="mini-question-image mini-question-image--placeholder"
        role="img"
        aria-label={alt || '그림을 준비하고 있어요'}
      >
        <span className="mini-question-image__placeholder-emoji">🎨</span>
        <p className="mini-question-image__placeholder-text">그림을 준비하고 있어요!</p>
        {expectedFiles.length > 0 && (
          <p className="mini-question-image__placeholder-hint">
            src/assets/mini/{expectedFiles[0]}
            <br />
            또는 {expectedFiles[1]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mini-question-image">
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className="mini-question-image__img object-cover rounded-2xl"
        loading="eager"
        decoding="async"
        onError={handleError}
      />
    </div>
  )
}
