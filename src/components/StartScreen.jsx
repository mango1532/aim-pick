import CuteButton from './CuteButton'
import { RESULT_CODES } from '../data/resultTypes'

/** 발표 시연용 데모 모드 (true로 설정 시 하단 테스트 버튼 표시) */
export const DEMO_MODE = true

/** 첫 화면 위인 이미지 15명 (public/images, .png) */
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

export default function StartScreen({ onStart, onDemoRandom, onDemoType }) {
  return (
    <div className="screen start-screen">
      <div className="start-screen__content">
        <div className="hero-stage">
          <div className="hero-orbit" aria-hidden="true">
            {heroImages.map((hero, index) => (
              <img
                key={hero.name}
                className={`hero-avatar hero-avatar-${index + 1}`}
                src={hero.src}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ))}
          </div>

          <div className="main-logo-card">
            <h1>아이엠픽</h1>
            <p className="english-logo">AI&apos;M PICK</p>
            <p className="logo-subtitle">데이터로 고르는 나의 미래</p>
            <div className="creator-badge">
              {'호남지방데이터청 꿈길TEAM _ 김경보 & 장하림'}
            </div>
          </div>
        </div>

        <p className="start-desc">
          48개의 쉬운 질문에 답하면
          <br />
          AI 친구가 나에게 어울리는
          <br />
          미래 직업과 위인을 찾아줘요!
        </p>

        <CuteButton onClick={onStart} variant="primary" ariaLabel="설문 시작하기">
          ✨ 시작하기
        </CuteButton>

        <p className="start-footer">초등학생 진로탐험 프로그램</p>
      </div>

      {DEMO_MODE && (
        <div className="demo-panel">
          <p className="demo-panel__title">🎬 발표 시연용</p>
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
