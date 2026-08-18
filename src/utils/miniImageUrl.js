/**
 * MINI 문항 이미지 URL
 *
 * src/assets/mini/01.png ~ 12.png (확장자 .png만 사용)
 * Vite import.meta.glob으로 폴더 내 png를 자동 연결합니다.
 */

const bundledPngs = import.meta.glob('../assets/mini/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
})

function getBundledPngUrl(questionId) {
  const num = String(questionId).padStart(2, '0')
  for (const [path, url] of Object.entries(bundledPngs)) {
    if (path.endsWith(`/${num}.png`)) return url
  }
  return null
}

/** 문항 id별 png URL 후보 (번들 → public 순) */
export function getMiniImageCandidates(questionId) {
  const num = String(questionId).padStart(2, '0')
  const bundled = getBundledPngUrl(questionId)
  const publicPath = `/images/mini/${num}.png`

  if (bundled) {
    return bundled === publicPath ? [bundled] : [bundled, publicPath]
  }
  return [publicPath]
}

export function getMiniImageExpectedFiles(questionId) {
  const num = String(questionId).padStart(2, '0')
  return [`${num}.png`]
}
