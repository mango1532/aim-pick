/**
 * MINI 문항 일러스트 — Vite 번들 URL
 */
import q01 from '../assets/mini/q01.svg?url'
import q02 from '../assets/mini/q02.svg?url'
import q03 from '../assets/mini/q03.svg?url'
import q04 from '../assets/mini/q04.svg?url'
import q05 from '../assets/mini/q05.svg?url'
import q06 from '../assets/mini/q06.svg?url'
import q07 from '../assets/mini/q07.svg?url'
import q08 from '../assets/mini/q08.svg?url'
import q09 from '../assets/mini/q09.svg?url'
import q10 from '../assets/mini/q10.svg?url'
import q11 from '../assets/mini/q11.svg?url'
import q12 from '../assets/mini/q12.svg?url'

export const MINI_IMAGE_URLS = {
  1: q01, 2: q02, 3: q03, 4: q04, 5: q05, 6: q06,
  7: q07, 8: q08, 9: q09, 10: q10, 11: q11, 12: q12,
}

export function getMiniImageUrl(questionId) {
  return MINI_IMAGE_URLS[questionId] || null
}
