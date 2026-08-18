/**
 * MINI 문항 이미지 — public/images/mini/01.jfif ~ 12.jfif
 * Vite public 폴더 기준 절대 경로 (/images/mini/...)
 */
export function getMiniImagePath(questionId) {
  const num = String(questionId).padStart(2, '0')
  return `/images/mini/${num}.jfif`
}

/** .jfif 실패 시 .jpg 시도 */
export function getMiniImageFallbackPath(questionId) {
  const num = String(questionId).padStart(2, '0')
  return `/images/mini/${num}.jpg`
}

/** 문항 id별 이미지 후보 (.jfif 우선) */
export function getMiniImageCandidates(questionId) {
  return [getMiniImagePath(questionId), getMiniImageFallbackPath(questionId)]
}
