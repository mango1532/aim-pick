import CareerTreemap from './CareerTreemap'
import HeroRecommendation from './HeroRecommendation'
import { MINI_JOB_LABELS, KIDS_JOB_COUNT, MINI_JOB_COUNT } from '../data/resultDisplay'
import { TYPE_SHORT_LABELS, TYPE_ORDER } from '../data/typeColors'
import { VERSIONS } from '../data/versions'

function getDisplayJobs(version, resultCode, jobs) {
  if (version === 'mini') {
    return MINI_JOB_LABELS[resultCode] || jobs.slice(0, MINI_JOB_COUNT)
  }
  if (version === 'kids') {
    return jobs.slice(0, KIDS_JOB_COUNT)
  }
  return jobs
}

function getTreemapConfig(version) {
  switch (version) {
    case 'mini':
      return {
        title: '내가 좋아하는 활동',
        hint: '영역이 클수록 내가 더 좋아하는 활동과 가까워요.',
        showScores: false,
      }
    case 'kids':
      return {
        title: '내 안의 6가지 진로 성향',
        hint: '영역이 클수록 나의 진로 성향 점수가 높아요.',
        showScores: true,
      }
    default:
      return {
        title: '나의 진로 성향 한눈에 보기',
        hint: '영역이 클수록 내가 더 강한 진로 성향이에요.',
        showScores: true,
      }
  }
}

export default function PrintableResult({ result, resultData, version = 'teen' }) {
  if (!result || !resultData) return null

  const { scores, resultCode, topTypes = [] } = result
  const { name, shortName, description, jobs, hero, message } = resultData
  const versionInfo = VERSIONS[version] || VERSIONS.teen
  const displayJobs = getDisplayJobs(version, resultCode, jobs)
  const treemapConfig = getTreemapConfig(version)
  const isTeen = version === 'teen'
  const useTwoPages = isTeen

  const footer = (
    <footer className="printable-result__footer">
      <p>호남지방데이터청 꿈길TEAM</p>
      <p>김경보 &amp; 장하림</p>
    </footer>
  )

  return (
    <div className={`printable-result print-only printable-result--${version}`}>
      <div className="printable-result__page printable-result__page--1">
        <header className="printable-result__header">
          <h1 className="printable-result__logo">아이엠픽 AI&apos;M PICK</h1>
          <p className="printable-result__tagline">데이터로 고르는 나의 미래</p>
          <h2 className="printable-result__title">나의 진로탐색 결과</h2>
          <p className="printable-result__meta">{versionInfo.label} · {versionInfo.count}문항</p>
        </header>

        <section className="printable-result__section printable-result__type">
          <h3 className="printable-result__section-title">나의 진로유형</h3>
          <div className="printable-result__type-badge">{resultCode}</div>
          <p className="printable-result__type-name">{name}</p>
          <p className="printable-result__type-short">&ldquo;{shortName}&rdquo;</p>
          <p className="printable-result__type-desc">{description}이에요.</p>
        </section>

        <section className="printable-result__section printable-result__treemap">
          <CareerTreemap
            scores={scores}
            topTypes={topTypes}
            version={version}
            title={treemapConfig.title}
            hint={treemapConfig.hint}
            showScores={treemapConfig.showScores}
          />
          {version !== 'mini' && (
            <ul className="printable-result__score-list">
              {TYPE_ORDER.map((key) => (
                <li key={key}>
                  <span className="printable-result__score-key">{key}</span>
                  {TYPE_SHORT_LABELS[key]}
                  <span className="printable-result__score-value">{scores[key] ?? 0}점</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {version !== 'mini' && (
          <section className="printable-result__section">
            <h3 className="printable-result__section-title">나의 강점</h3>
            <p className="printable-result__strength">
              {version === 'kids'
                ? `${shortName} 친구는 ${description}이에요.`
                : `${name}(${shortName}) 유형은 ${description}이에요.`}
            </p>
          </section>
        )}

        <section className="printable-result__section">
          <h3 className="printable-result__section-title">
            {version === 'mini' ? '이런 활동이 잘 어울려요' : '이런 직업이 잘 어울려요'}
          </h3>
          <div className="printable-result__jobs">
            {displayJobs.map((job) => (
              <span key={job} className="printable-result__job">{job}</span>
            ))}
          </div>
        </section>

        <section className="printable-result__section printable-result__hero-exploration">
          <h3 className="printable-result__section-title">추천 위인 탐험</h3>
          <HeroRecommendation
            resultCode={resultCode}
            featuredHeroName={hero}
            resultData={resultData}
            version={version}
            layout="print"
            mode={useTwoPages ? 'featured' : 'all'}
          />
        </section>

        {!useTwoPages && (
          <>
            <section className="printable-result__section printable-result__message">
              <h3 className="printable-result__section-title">응원 메시지</h3>
              <p className="printable-result__message-text">{message}</p>
            </section>
            {footer}
          </>
        )}
      </div>

      {useTwoPages && (
        <div className="printable-result__page printable-result__page--2">
          <section className="printable-result__section printable-result__hero-exploration printable-result__hero-exploration--continued">
            <h3 className="printable-result__section-title">함께 알아볼 위인</h3>
            <HeroRecommendation
              resultCode={resultCode}
              featuredHeroName={hero}
              resultData={resultData}
              version={version}
              layout="print"
              mode="others"
            />
          </section>

          <section className="printable-result__section printable-result__message">
            <h3 className="printable-result__section-title">응원 메시지</h3>
            <p className="printable-result__message-text">{message}</p>
          </section>

          {footer}
        </div>
      )}
    </div>
  )
}
