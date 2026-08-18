import { useState, useEffect, useMemo } from 'react'
import { getMiniImageCandidates, getMiniImageExpectedFiles } from '../data/miniImages'

export default function MiniQuestionImage({ questionId, alt = '' }) {
  const candidates = useMemo(
    () => (questionId ? getMiniImageCandidates(questionId) : []),
    [questionId],
  )

  const [candidateIndex, setCandidateIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const currentSrc = candidates[candidateIndex] ?? null
  const expectedFiles = questionId ? getMiniImageExpectedFiles(questionId) : []

  useEffect(() => {
    setCandidateIndex(0)
    setIsLoaded(false)
    setHasError(false)
  }, [questionId, candidates])

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1)
      setIsLoaded(false)
      return
    }
    setHasError(true)
    if (import.meta.env.DEV) {
      console.warn('[MINI] 이미지 로딩 실패:', { questionId, tried: candidates })
    }
  }

  if (!currentSrc || hasError) {
    return (
      <div className="mini-question-image mini-question-image--placeholder" aria-hidden="true">
        <span className="mini-question-image__placeholder-emoji">🎨</span>
        <p className="mini-question-image__placeholder-text">그림을 준비하고 있어요!</p>
        {expectedFiles.length > 0 && (
          <p className="mini-question-image__placeholder-hint">
            아래 폴더에 파일을 넣어 주세요:
            <br />
            public/images/mini/{expectedFiles[0]}
            <br />
            또는 src/assets/mini/{expectedFiles[0]}
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
