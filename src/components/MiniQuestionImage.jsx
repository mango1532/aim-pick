import { useState, useEffect } from 'react'

export default function MiniQuestionImage({ src, alt = '' }) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  if (!src || hasError) {
    return (
      <div className="mini-question-image mini-question-image--placeholder" aria-hidden="true">
        <span className="mini-question-image__placeholder-emoji">🎨</span>
        <p className="mini-question-image__placeholder-text">그림을 준비하고 있어요!</p>
      </div>
    )
  }

  return (
    <div className="mini-question-image">
      {!isLoaded && (
        <div className="mini-question-image__loading">그림 불러오는 중...</div>
      )}
      <img
        key={src}
        src={src}
        alt={alt}
        className={`mini-question-image__img ${isLoaded ? 'mini-question-image__img--loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
