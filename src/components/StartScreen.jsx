import { VERSION_LIST } from '../data/versions'
import { RESULT_CODES } from '../data/resultTypes'

export const DEMO_MODE = true

const heroImages = [
  { name: '김구', src: '/images/김구.png' },
  { name: '김부식', src: '/images/김부식.png' },
  { name: '김정호', src: '/images/김정호.png' },
  { name: '김정희', src: '/images/김정희.png' },
  { name: '나운규', src: '/images/나운규.png' },
  { name: '백남준', src: '/images/백남준.png' },
  { name: '심사임당', src: '/images/심사임당.png' },
  { name: '왕건', src: '/images/왕건.png' },
  { name: '윤동주', src: '/images/윤동주.png' },
  { name: '이순신', src: '/images/이순신.png' },
  { name: '장영실', src: '/images/장영실.png' },
  { name: '정도전', src: '/images/정도전.png' },
  { name: '주시경', src: '/images/주시경.png' },
  { name: '허준', src: '/images/허준.png' },
  { name: '황희', src: '/images/황희.png' },
]

export default function StartScreen({ onSelectVersion, onDemoRandom, onDemoType }) {
  return (
    <div className="screen start-screen start-screen--compact">
      <div className="start-screen__content">
        <div className="hero-stage hero-stage--compact">
          <div className="hero-orbit" aria-hidden="true">
            {heroImages.map((hero, index) => (
              <img
                key={hero.name}
                className={`hero-avatar hero-avatar-${index + 1}`}
                src={hero.src}
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ))}
          </div>
          <div className="main-logo-card main-logo-card--compact">
            <h1>아이엠픽</h1>
            <p className="english-logo">AI&apos;M PICK</p>
            <p className="logo-subtitle">데이터로 고르는 나의 미래</p>
          </div>
        </div>

        <p className="start-tagline">✨ 나에게 맞는 진로탐색을 골라보세요! ✨</p>

        <div className="version-cards">
          {VERSION_LIST.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`version-card version-card--${v.id}`}
              onClick={() => onSelectVersion(v.id)}
            >
              <span className="version-card__emoji">{v.emoji}</span>
              <span className="version-card__label">{v.label}</span>
              <span className="version-card__title">{v.title}</span>
              <span className="version-card__desc">{v.subtitle}</span>
              <span className="version-card__meta">{v.count}문항 · {v.duration}</span>
            </button>
          ))}
        </div>

        <p className="creator-badge creator-badge--footer">
          {'호남지방데이터청 꿈길TEAM _ 김경보 & 장하림'}
        </p>
      </div>

      {DEMO_MODE && (
        <div className="demo-panel">
          <p className="demo-panel__title">🎬 발표 시연용 (TEEN 48문항)</p>
          <div className="demo-panel__buttons">
            <button type="button" className="demo-btn" onClick={onDemoRandom}>
              랜덤 응답 → 결과
            </button>
            <div className="demo-type-grid">
              {RESULT_CODES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className="demo-type-btn"
                  onClick={() => onDemoType(code)}
                  title={`${code} 유형 결과 보기`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
