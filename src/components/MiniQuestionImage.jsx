import { useState, useEffect, useMemo } from 'react'
import { getMiniImageCandidates, getMiniImageExpectedFiles } from '../utils/miniImageUrl'

export default function MiniQuestionImage({ questionId, alt = '' }) {
  const id = Number(questionId)
  const candidates = useMemo(
    () => (id ? getMiniImageCandidates(id) : []),
    [id],
  )

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const src = candidates[index] ?? null
  const expectedFiles = id ? getMiniImageExpectedFiles(id) : []

  useEffect(() => {
    setIndex(0)
    setFailed(false)
  }, [id, candidates])

  const handleError = () => {
    if (index < candidates.length - 1) {
      setIndex((prev) => prev + 1)
      return
    }
    setFailed(true)
    console.warn('[MINI] 이미지 로딩 실패:', { questionId: id, tried: candidates })
  }

  if (!src || failed) {
    return (
      <div className="mini-question-image mini-question-image--placeholder" role="img" aria-label={alt || '그림을 준비하고 있어요'}>
        <span className="mini-question-image__placeholder-emoji">🎨</span>
        <p className="mini-question-image__placeholder-text">그림을 준비하고 있어요!</p>
        {expectedFiles[0] && (
          <p className="mini-question-image__placeholder-hint">
            src/assets/mini/{expectedFiles[0]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mini-question-image">
      <img
        key={`${id}-${src}`}
        src={src}
        alt={alt}
        className="mini-question-image__img object-cover rounded-2xl"
        loading="eager"
        decoding="async"
        onError={handleError}
      />
    </div>
  )
}
