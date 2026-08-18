/**
 * MINI 문항 이미지
 *
 * 1순위: src/assets/mini/01.jfif (Vite 번들 — 가장 안정적)
 * 2순위: public/images/mini/01.jfif (public 폴더)
 */

const bundledImages = import.meta.glob(
  '../assets/mini/*.{jfif,jpg,jpeg,png,JFIF,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' },
)

function getBundledImageUrl(questionId) {
  const num = String(questionId).padStart(2, '0')
  for (const [path, url] of Object.entries(bundledImages)) {
    const fileName = path.split('/').pop()?.toLowerCase() ?? ''
    if (fileName.startsWith(`${num}.`)) return url
  }
  return null
}

function getPublicImageCandidates(questionId) {
  const num = String(questionId).padStart(2, '0')
  return [
    `/images/mini/${num}.jfif`,
    `/images/mini/${num}.JFIF`,
    `/images/mini/${num}.jpg`,
    `/images/mini/${num}.JPG`,
    `/images/mini/${num}.jpeg`,
    `/images/mini/${num}.png`,
  ]
}

export function getMiniImagePath(questionId) {
  return getBundledImageUrl(questionId) ?? `/images/mini/${String(questionId).padStart(2, '0')}.jfif`
}

/** 문항 id별 이미지 URL 후보 (순서대로 시도) */
export function getMiniImageCandidates(questionId) {
  const bundled = getBundledImageUrl(questionId)
  const publicPaths = getPublicImageCandidates(questionId)
  if (bundled) {
    return [bundled, ...publicPaths.filter((p) => p !== bundled)]
  }
  return publicPaths
}

export function getMiniImageExpectedFiles(questionId) {
  const num = String(questionId).padStart(2, '0')
  return [`${num}.jfif`, `${num}.jpg`]
}
