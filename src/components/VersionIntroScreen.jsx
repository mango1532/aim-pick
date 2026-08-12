import CuteButton from './CuteButton'
import { VERSIONS } from '../data/versions'

export default function VersionIntroScreen({ versionId, onStart, onBack }) {
  const version = VERSIONS[versionId]
  if (!version) return null

  return (
    <div className="screen intro-screen">
      <div className="intro-card">
        <span className="intro-emoji">{version.emoji}</span>
        <p className="intro-label">{version.label}</p>
        <h2 className="intro-title">{version.title}</h2>
        <p className="intro-subtitle">{version.subtitle}</p>
        <div className="intro-meta">
          <span>{version.count}문항</span>
          <span className="intro-meta__dot">·</span>
          <span>{version.duration}</span>
        </div>
        <p className="intro-audience">추천: {version.audience}</p>
        <div className="intro-actions">
          <CuteButton onClick={onStart} variant="primary" ariaLabel="설문 시작">
            ✨ 시작하기
          </CuteButton>
          <CuteButton onClick={onBack} variant="secondary" ariaLabel="버전 다시 선택">
            ← 다시 선택
          </CuteButton>
        </div>
      </div>
    </div>
  )
}
