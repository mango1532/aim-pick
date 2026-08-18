/**
 * MINI 문항 이미지 URL
 *
 * 정적 import 대신 런타임 경로 사용 → 파일 교체 후에도 캐시/번들 문제 없음
 * vite.config.js의 sync-mini-images 플러그인이
 * src/assets/mini/*.png → public/images/mini/*.png 자동 동기화
 */

function padNum(questionId) {
  return String(Number(questionId)).padStart(2, '0')
}

/** 문항 id → png URL (public 정적 경로 — dev/prod 공통) */
export function getMiniImageUrl(questionId) {
  const num = padNum(questionId)
  return `/images/mini/${num}.png`
}

/** 1순위: Vite dev 원본 경로 / 2순위: public */
export function getMiniImageCandidates(questionId) {
  const num = padNum(questionId)
  const publicPath = `/images/mini/${num}.png`

  if (import.meta.env.DEV) {
    return [`/src/assets/mini/${num}.png`, publicPath]
  }
  return [publicPath]
}

export function getMiniImageExpectedFiles(questionId) {
  return [`${padNum(questionId)}.png`]
}
