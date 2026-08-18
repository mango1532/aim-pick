/**
 * MINI 문항 이미지 — public/images/mini/01.jpg ~ 12.jpg
 * Vite public 폴더 기준 절대 경로 (/images/mini/...)
 */
export function getMiniImagePath(questionId) {
  const num = String(questionId).padStart(2, '0')
  return `/images/mini/${num}.jpg`
}

/** .jpg 실패 시 시도할 대체 확장자 */
export function getMiniImageFallbackPath(questionId) {
  const num = String(questionId).padStart(2, '0')
  return `/images/mini/${num}.jfif`
}

export function getMiniImageCandidates(questionId) {
  return [getMiniImagePath(questionId), getMiniImageFallbackPath(questionId)]
}
