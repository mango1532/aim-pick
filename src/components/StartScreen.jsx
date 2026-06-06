import CuteButton from './CuteButton'
import { RESULT_CODES } from '../data/resultTypes'

/** 발표 시연용 데모 모드 (true로 설정 시 하단 테스트 버튼 표시) */
export const DEMO_MODE = true

/** 첫 화면 로고 주변 배치용 위인 이미지 (public/images, .png) */
const heroImages = [
  '/images/장영실.png',
  '/images/허준.png',
  '/images/주시경.png',
  '/images/김부식.png',
  '/images/이순신.png',
  '/images/심사임당.png',
]

export default function StartScreen({ onStart, onDemoRandom, onDemoType }) {
  return (
    <div className="screen start-screen">
      <div className="start-screen__content">
        <div className="hero-logo-area">
          {heroImages.map((src, index) => (
            <img
              key={src}
              className={`floating-hero hero-${index + 1}`}
              src={src}
              alt="귀여운 위인 캐릭터"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ))}

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
