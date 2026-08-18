import { useMemo } from 'react'
import { TYPE_COLORS, TYPE_SHORT_LABELS, TYPE_ORDER } from '../data/typeColors'
import { computeTreemapLayout } from '../utils/treemapLayout'

const SVG_WIDTH = 520
const SVG_HEIGHT_PRINT = 260
const SVG_HEIGHT_SCREEN = 220
const GAP = 3

function getTreemapItems(scores) {
  return TYPE_ORDER
    .map((key) => ({
      key,
      value: Math.max(scores?.[key] ?? 0, 1),
      score: scores?.[key] ?? 0,
    }))
    .sort((a, b) => b.value - a.value)
}

/** 셀 크기별 글자 크기 — 인쇄용은 전체적으로 크게, 알파벳은 더 크게 */
function getFontSizes(w, h, isPrint) {
  const minSide = Math.min(w, h)

  if (isPrint) {
    const letter =
      minSide < 55 ? 18
        : minSide < 80 ? 22
          : minSide < 110 ? 26
            : 30
    const label =
      minSide < 55 ? 11
        : minSide < 80 ? 13
          : 15
    const score =
      minSide < 55 ? 10
        : minSide < 80 ? 12
          : 14
    const rank = minSide < 70 ? 10 : 12
    return { letter, label, score, rank }
  }

  const base =
    minSide < 48 ? 9
      : minSide < 72 ? 10
        : minSide < 110 ? 12
          : 14
  return {
    letter: base + 4,
    label: base,
    score: base - 1,
    rank: 10,
  }
}

export default function CareerTreemap({
  scores,
  topTypes = [],
  version = 'teen',
  variant = 'screen',
  title,
  hint,
  showScores = true,
}) {
  const isPrint = variant === 'print'
  const svgHeight = isPrint ? SVG_HEIGHT_PRINT : SVG_HEIGHT_SCREEN

  const layout = useMemo(() => {
    const items = getTreemapItems(scores)
    return computeTreemapLayout(items, GAP, GAP, SVG_WIDTH - GAP * 2, svgHeight - GAP * 2)
  }, [scores, svgHeight])

  const [first, second] = topTypes

  return (
    <div className={`career-treemap${variant === 'print' ? ' career-treemap--print' : ''}`}>
      {title && <h4 className="career-treemap__title">{title}</h4>}
      <svg
        className="career-treemap__svg"
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        role="img"
        aria-label="6가지 진로 성향 트리맵"
      >
        {layout.map((cell) => {
          const colors = TYPE_COLORS[cell.key]
          const label = TYPE_SHORT_LABELS[cell.key]
          const isFirst = cell.key === first
          const isSecond = cell.key === second
          const w = cell.width - GAP
          const h = cell.height - GAP
          const compact = !isPrint && (w < 80 || h < 70)
          const tiny = !isPrint && (w < 56 || h < 52)
          const { letter: letterSize, label: labelSize, score: scoreSize, rank: rankSize } =
            getFontSizes(w, h, isPrint)

          const letterY = isPrint
            ? h / 2 - (h >= 70 ? 16 : 10)
            : h / 2 - (compact ? 6 : 12)
          const labelY = isPrint
            ? h / 2 + 2
            : h / 2 + (compact ? 0 : 4)
          const scoreY = isPrint
            ? h / 2 + (h >= 70 ? 20 : 14)
            : h / 2 + (compact ? 10 : 22)

          return (
            <g key={cell.key} transform={`translate(${cell.x}, ${cell.y})`}>
              <rect
                x={0}
                y={0}
                width={w}
                height={h}
                rx={isPrint ? 12 : 10}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isFirst ? 3 : isSecond ? 2.5 : 1.5}
                strokeDasharray={isSecond ? '6 3' : undefined}
              />
              {!tiny && (
                <>
                  {/* 유형 알파벳 — 가장 크고 굵게 */}
                  <text
                    x={w / 2}
                    y={letterY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.text}
                    fontSize={letterSize}
                    fontWeight="800"
                    fontFamily="Jua, 'Noto Sans KR', sans-serif"
                    style={isPrint ? { letterSpacing: '0.05em' } : undefined}
                  >
                    {cell.key}
                  </text>
                  {(!compact || isPrint) && (
                    <text
                      x={w / 2}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.text}
                      fontSize={labelSize}
                      fontWeight="600"
                      fontFamily="'Noto Sans KR', sans-serif"
                      opacity={0.92}
                    >
                      {label}
                    </text>
                  )}
                  {showScores && version !== 'mini' && h >= (isPrint ? 48 : 58) && (
                    <text
                      x={w / 2}
                      y={scoreY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.text}
                      fontSize={scoreSize}
                      fontWeight="700"
                      fontFamily="'Noto Sans KR', sans-serif"
                      opacity={0.88}
                    >
                      {cell.score}점
                    </text>
                  )}
                </>
              )}
              {tiny && (
                <text
                  x={w / 2}
                  y={h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.text}
                  fontSize={14}
                  fontWeight="800"
                  fontFamily="Jua, 'Noto Sans KR', sans-serif"
                >
                  {cell.key}
                </text>
              )}
              {isFirst && w > 64 && h > 44 && (
                <text
                  x={w - 8}
                  y={isPrint ? 16 : 14}
                  textAnchor="end"
                  fill={colors.text}
                  fontSize={rankSize}
                  fontWeight="700"
                  fontFamily="'Noto Sans KR', sans-serif"
                >
                  ★ 1순위
                </text>
              )}
              {isSecond && !isFirst && w > 64 && h > 44 && (
                <text
                  x={w - 8}
                  y={isPrint ? 16 : 14}
                  textAnchor="end"
                  fill={colors.text}
                  fontSize={rankSize}
                  fontWeight="700"
                  fontFamily="'Noto Sans KR', sans-serif"
                >
                  ☆ 2순위
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {hint && <p className="career-treemap__hint">{hint}</p>}
    </div>
  )
}
