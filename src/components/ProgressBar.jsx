/**
 * 설문 진행률 표시 바
 */
export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div className="progress-bar__label">
        <span className="progress-bar__count">
          {current} / {total}
        </span>
        <span className="progress-bar__percent">{percent}%</span>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
