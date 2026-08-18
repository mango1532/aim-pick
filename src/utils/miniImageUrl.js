/**
 * MINI 문항 이미지 URL (Vite new URL 정적 자산)
 *
 * src/assets/mini/ 실제 파일 (2026-08 기준):
 *   01.png ~ 12.png
 *   01.jfif ~ 12.jfif
 *   (.jpg 없음)
 */

const MINI_IMAGE_CANDIDATES = {
  1: [
    new URL('../assets/mini/01.jfif', import.meta.url).href,
    new URL('../assets/mini/01.png', import.meta.url).href,
  ],
  2: [
    new URL('../assets/mini/02.jfif', import.meta.url).href,
    new URL('../assets/mini/02.png', import.meta.url).href,
  ],
  3: [
    new URL('../assets/mini/03.jfif', import.meta.url).href,
    new URL('../assets/mini/03.png', import.meta.url).href,
  ],
  4: [
    new URL('../assets/mini/04.jfif', import.meta.url).href,
    new URL('../assets/mini/04.png', import.meta.url).href,
  ],
  5: [
    new URL('../assets/mini/05.jfif', import.meta.url).href,
    new URL('../assets/mini/05.png', import.meta.url).href,
  ],
  6: [
    new URL('../assets/mini/06.jfif', import.meta.url).href,
    new URL('../assets/mini/06.png', import.meta.url).href,
  ],
  7: [
    new URL('../assets/mini/07.jfif', import.meta.url).href,
    new URL('../assets/mini/07.png', import.meta.url).href,
  ],
  8: [
    new URL('../assets/mini/08.jfif', import.meta.url).href,
    new URL('../assets/mini/08.png', import.meta.url).href,
  ],
  9: [
    new URL('../assets/mini/09.jfif', import.meta.url).href,
    new URL('../assets/mini/09.png', import.meta.url).href,
  ],
  10: [
    new URL('../assets/mini/10.jfif', import.meta.url).href,
    new URL('../assets/mini/10.png', import.meta.url).href,
  ],
  11: [
    new URL('../assets/mini/11.jfif', import.meta.url).href,
    new URL('../assets/mini/11.png', import.meta.url).href,
  ],
  12: [
    new URL('../assets/mini/12.jfif', import.meta.url).href,
    new URL('../assets/mini/12.png', import.meta.url).href,
  ],
}

export function getMiniImageCandidates(questionId) {
  return MINI_IMAGE_CANDIDATES[questionId] ?? []
}

export function getMiniImageExpectedFiles(questionId) {
  const num = String(questionId).padStart(2, '0')
  return [`${num}.png`, `${num}.jfif`]
}
