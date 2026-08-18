/**
 * MINI 문항 이미지 — 질문 id(1~12) ↔ 01.png~12.png 1:1 매핑
 * Vite 정적 import로 번들 URL을 확정합니다.
 */
import img01 from '../assets/mini/01.png?url'
import img02 from '../assets/mini/02.png?url'
import img03 from '../assets/mini/03.png?url'
import img04 from '../assets/mini/04.png?url'
import img05 from '../assets/mini/05.png?url'
import img06 from '../assets/mini/06.png?url'
import img07 from '../assets/mini/07.png?url'
import img08 from '../assets/mini/08.png?url'
import img09 from '../assets/mini/09.png?url'
import img10 from '../assets/mini/10.png?url'
import img11 from '../assets/mini/11.png?url'
import img12 from '../assets/mini/12.png?url'

/** @type {Record<number, string>} */
export const MINI_IMAGES = {
  1: img01,
  2: img02,
  3: img03,
  4: img04,
  5: img05,
  6: img06,
  7: img07,
  8: img08,
  9: img09,
  10: img10,
  11: img11,
  12: img12,
}

/** 문항 id → png URL (없으면 null) */
export function getMiniImageUrl(questionId) {
  const id = Number(questionId)
  return MINI_IMAGES[id] ?? null
}

export function getMiniImageExpectedFiles(questionId) {
  const num = String(questionId).padStart(2, '0')
  return [`${num}.png`]
}

if (import.meta.env.DEV) {
  Object.entries(MINI_IMAGES).forEach(([id, url]) => {
    console.debug(`[MINI] Q${id} → ${url}`)
  })
}
