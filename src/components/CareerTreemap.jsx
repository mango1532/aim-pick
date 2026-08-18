import { useMemo } from 'react'
import { TYPE_COLORS, TYPE_SHORT_LABELS, TYPE_ORDER } from '../data/typeColors'
import { computeTreemapLayout } from '../utils/treemapLayout'

const SVG_WIDTH = 520
const SVG_HEIGHT_PRINT = 240
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

function getFontSize(width, height, lines) {
  const minSide = Math.min(width, height)
  if (minSide < 48) return 9
  if (minSide < 72) return 10
  if (lines > 2) return 11
  return minSide < 110 ? 12 : 14
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
          const fontSize = getFontSize(w, h, compact ? 2 : 3)

          return (
            <g key={cell.key} transform={`translate(${cell.x}, ${cell.y})`}>
              <rect
                x={0}
                y={0}
                width={w}
                height={h}
                rx={10}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isFirst ? 3 : isSecond ? 2.5 : 1.5}
                strokeDasharray={isSecond ? '6 3' : undefined}
              />
              {!tiny && (
                <>
                  <text
                    x={w / 2}
                    y={h / 2 - (compact ? 6 : 12)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.text}
                    fontSize={fontSize + 2}
                    fontWeight="700"
                  >
                    {cell.key}
                  </text>
                  {!compact && (
                    <text
                      x={w / 2}
                      y={h / 2 + (isPrint ? 8 : 4)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.text}
                      fontSize={fontSize}
                      fontWeight="600"
                    >
                      {label}
                    </text>
                  )}
                  {showScores && version !== 'mini' && h >= (isPrint ? 52 : 58) && (
                    <text
                      x={w / 2}
                      y={h / 2 + (compact ? 10 : isPrint ? 24 : 22)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.text}
                      fontSize={fontSize - 1}
                      opacity={0.9}
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
                  fontSize={11}
                  fontWeight="700"
                >
                  {cell.key}
                </text>
              )}
              {isFirst && w > 64 && h > 44 && (
                <text
                  x={w - 8}
                  y={14}
                  textAnchor="end"
                  fill={colors.text}
                  fontSize={10}
                  fontWeight="700"
                >
                  ★ 1순위
                </text>
              )}
              {isSecond && !isFirst && w > 64 && h > 44 && (
                <text
                  x={w - 8}
                  y={14}
                  textAnchor="end"
                  fill={colors.text}
                  fontSize={10}
                  fontWeight="700"
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
