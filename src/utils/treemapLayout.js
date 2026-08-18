/** 점수 비율 기반 treemap 사각형 레이아웃 (재귀 이등분) */
export function computeTreemapLayout(items, x, y, width, height) {
  if (!items.length) return []
  if (items.length === 1) {
    return [{ ...items[0], x, y, width, height }]
  }

  const total = items.reduce((sum, item) => sum + item.value, 0)
  const mid = Math.ceil(items.length / 2)
  const left = items.slice(0, mid)
  const right = items.slice(mid)
  const leftSum = left.reduce((sum, item) => sum + item.value, 0)
  const ratio = leftSum / total

  if (width >= height) {
    const leftWidth = width * ratio
    return [
      ...computeTreemapLayout(left, x, y, leftWidth, height),
      ...computeTreemapLayout(right, x + leftWidth, y, width - leftWidth, height),
    ]
  }

  const leftHeight = height * ratio
  return [
    ...computeTreemapLayout(left, x, y, width, leftHeight),
    ...computeTreemapLayout(right, x, y + leftHeight, width, height - leftHeight),
  ]
}
