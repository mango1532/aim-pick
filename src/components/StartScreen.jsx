import CuteButton from './CuteButton'
import { RESULT_CODES } from '../data/resultTypes'

/** 발표 시연용 데모 모드 (true로 설정 시 하단 테스트 버튼 표시) */
export const DEMO_MODE = true

export default function StartScreen({ onStart, onDemoRandom, onDemoType }) {
  return (
    <div className="screen start-screen">
      <div className="start-screen__content">
        <div className="mascot-area">
          <img
            src="/images/mascot.png"
            alt="AI 친구 캐릭터"
            className="mascot-img"
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = '1'
                e.target.src = '/images/mascot.svg'
              } else {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }
            }}
          />
          <div className="mascot-fallback" style={{ display: 'none' }} aria-hidden="true">
            <span className="mascot-emoji">🤖</span>
          </div>
        </div>

        <h1 className="start-title">
          <span className="start-title__ko">아이엠픽</span>
          <span className="start-title__en">AI&apos;M PICK</span>
        </h1>

        <p className="start-subtitle">데이터로 고르는 나의 미래</p>

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
