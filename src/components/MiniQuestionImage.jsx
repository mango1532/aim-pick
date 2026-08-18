import { useState } from 'react'
import { getMiniImageUrl, getMiniImageExpectedFiles } from '../utils/miniImageUrl'

export default function MiniQuestionImage({ questionId, alt = '' }) {
  const [hasError, setHasError] = useState(false)

  const id = Number(questionId)
  const src = getMiniImageUrl(id)
  const expectedFiles = id ? getMiniImageExpectedFiles(id) : []

  const handleError = () => {
    setHasError(true)
    if (import.meta.env.DEV) {
      console.warn('[MINI] 이미지 로딩 실패:', { questionId: id, src })
    }
  }

  if (!src || hasError) {
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
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mini-question-image">
      <img
        key={id}
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
