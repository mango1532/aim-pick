import { useState, useEffect, useRef } from 'react'
import CuteButton from './CuteButton'
import PrintableResult from './PrintableResult'
import HeroRecommendation from './HeroRecommendation'
import { BASE_TYPES, getVideoSrc } from '../data/resultTypes'
import { MINI_JOB_LABELS, KIDS_JOB_COUNT, MINI_JOB_COUNT } from '../data/resultDisplay'
import { VERSIONS } from '../data/versions'

/** 결과 화면 영상 카드 - 자동재생(muted) + 소리 켜기 버튼 */
function ResultVideoCard({ videoSrc, resultCode, heroName }) {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlayingWithSound, setIsPlayingWithSound] = useState(false)

  useEffect(() => {
    setHasError(false)
    setIsLoading(true)
    setIsMuted(true)
    setIsPlayingWithSound(false)
  }, [videoSrc])

  const handleUnmute = async () => {
    if (!videoRef.current) return
    videoRef.current.muted = false
    videoRef.current.volume = 1
    setIsMuted(false)
    setIsPlayingWithSound(true)
    try {
      await videoRef.current.play()
    } catch (error) {
      console.error('영상 재생 실패:', error)
    }
  }

  if (hasError) {
    return (
      <div className="result-video-card">
        <h4 className="result-video-title">추천 위인 영상 🎬</h4>
        <div className="video-error-message">
          <span className="video-error-message__icon">🎬</span>
          <p className="video-error-message__title">아직 준비 중인 영상이에요.</p>
          <p className="video-error-message__desc">
            선생님이 곧 멋진 영상을 넣어줄 거예요!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="result-video-card">
      <h4 className="result-video-title">추천 위인 영상 🎬</h4>

      <div className="result-video-wrapper">
        {isLoading && (
          <div className="video-loading">영상 불러오는 중...</div>
        )}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          controls
          className="result-video"
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
            console.error('영상 로딩 실패:', videoSrc)
          }}
          aria-label={`${heroName} 위인 소개 영상 (${resultCode})`}
        />
      </div>

      <button
        type="button"
        className={`sound-button ${isPlayingWithSound ? 'sound-button--active' : ''}`}
        onClick={handleUnmute}
        disabled={isPlayingWithSound}
        aria-label={isPlayingWithSound ? '소리 재생 중' : '소리 켜고 영상 보기'}
      >
        {isPlayingWithSound ? '소리 재생 중이에요 🎵' : '소리 켜고 영상 보기 🔊'}
      </button>
    </div>
  )
}

/** 6개 유형 점수 막대그래프 (화면용) */
function ScoreChart({ scores, maxScore = 40 }) {
  return (
    <div className="score-chart">
      {Object.entries(BASE_TYPES).map(([key, info]) => {
        const value = scores[key] || 0
        const percent = maxScore > 0 ? (value / maxScore) * 100 : 0
        return (
          <div key={key} className="score-chart__row">
            <span className="score-chart__label">{info.emoji} {key}</span>
            <div className="score-chart__bar-track">
              <div className="score-chart__bar-fill" style={{ width: `${percent}%`, backgroundColor: info.color }} />
            </div>
            <span className="score-chart__value">{value}점</span>
          </div>
        )
      })}
    </div>
  )
}

export default function ResultScreen({ result, resultData, version = 'teen', onRestart }) {
  if (!result || !resultData) {
    return (
      <div className="screen result-screen result-screen--error">
        <div className="error-card">
          <span className="error-card__emoji">😅</span>
          <h2>결과를 찾을 수 없어요</h2>
          <p>다시 한번 설문을 해볼까요?</p>
          <CuteButton onClick={onRestart} variant="primary">
            처음으로 돌아가기
          </CuteButton>
        </div>
      </div>
    )
  }

  const { scores, resultCode, topTypes = [] } = result
  const { name, shortName, description, jobs, hero } = resultData

  const versionInfo = VERSIONS[version] || VERSIONS.teen
  const maxScorePerType = version === 'mini' ? 10 : version === 'kids' ? 20 : 40
  const displayJobs =
    version === 'mini'
      ? (MINI_JOB_LABELS[resultCode] || jobs.slice(0, MINI_JOB_COUNT))
      : version === 'kids'
        ? jobs.slice(0, KIDS_JOB_COUNT)
        : jobs
  const celebrationTitle = version === 'mini' ? '나는 이런 활동을 좋아해요!' : '결과가 나왔어요!'
  const typeTitle =
    version === 'mini' ? shortName
      : version === 'kids' ? `나의 진로 유형은 ${shortName}!`
        : name
  const jobsSectionTitle =
    version === 'mini' ? '🌟 나에게 어울리는 활동'
      : version === 'kids' ? '💼 나와 잘 어울리는 직업'
        : '💼 나에게 어울리는 직업'

  const videoSrc = getVideoSrc(resultData)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={`screen result-screen result-screen--${version}`}>
      {/* 화면용 결과 (인쇄 시 숨김) */}
      <div className="no-print screen-only result-screen__content">
        <div className="result-celebration">
          <span className="confetti">🎉</span>
          <h2 className="result-celebration__title">{celebrationTitle}</h2>
          <span className="confetti">✨</span>
        </div>

        <div className="result-hero-card">
          <div className="result-type-badge">{resultCode}</div>
          <h3 className="result-type-name">{typeTitle}</h3>
          {version !== 'mini' && <p className="result-short-name">{shortName}</p>}
          <p className="result-description">{description}이에요.</p>
          <p className="result-version-tag">{versionInfo.label} · {versionInfo.count}문항</p>
        </div>

        {version !== 'mini' && (
          <div className="result-section">
            <h4 className="result-section__title">📊 나의 성향 점수</h4>
            <ScoreChart scores={scores} maxScore={maxScorePerType} />
          </div>
        )}

        <div className="result-section">
          <h4 className="result-section__title">{jobsSectionTitle}</h4>
          <div className="job-cards">
            {displayJobs.map((job) => (
              <div key={job} className="job-card">
                <span className="job-card__icon">🌟</span>
                <span className="job-card__name">{job}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="result-section hero-section">
          <h4 className="result-section__title">🏆 추천 위인 탐험</h4>
          <HeroRecommendation
            resultCode={resultCode}
            featuredHeroName={hero}
            resultData={resultData}
            version={version}
            layout="screen"
          />
        </div>

        <div className="result-section result-video-section">
          <ResultVideoCard
            videoSrc={videoSrc}
            resultCode={resultCode}
            heroName={hero}
          />
        </div>

        <div className="result-actions">
          <CuteButton onClick={onRestart} variant="secondary">
            🔄 처음으로 돌아가기
          </CuteButton>
          <CuteButton onClick={handlePrint} variant="primary">
            🖨️ 결과지 인쇄하기
          </CuteButton>
        </div>
      </div>

      {/* A4 인쇄용 결과지 */}
      <PrintableResult
        result={{ scores, resultCode, topTypes }}
        resultData={resultData}
        version={version}
      />
    </div>
  )
}
