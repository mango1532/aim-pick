import CareerTreemap from './CareerTreemap'
import HeroRecommendation from './HeroRecommendation'
import HeroCard from './HeroCard'
import { MINI_JOB_LABELS, KIDS_JOB_COUNT, MINI_JOB_COUNT } from '../data/resultDisplay'
import { TYPE_SHORT_LABELS } from '../data/typeColors'
import { VERSIONS } from '../data/versions'
import { getHeroesForResult, getAdditionalHeroCount } from '../data/heroes'

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
        title: '🌈 내가 좋아하는 활동',
        hint: '영역이 클수록 내가 더 좋아하는 활동과 가까워요.',
        showScores: false,
      }
    case 'kids':
      return {
        title: '🌈 내 안의 6가지 진로 성향',
        hint: '영역이 클수록 나의 진로 성향 점수가 높아요.',
        showScores: true,
      }
    default:
      return {
        title: '🌈 내 안의 6가지 진로 성향',
        hint: '영역이 클수록 나의 진로 성향 점수가 높아요.',
        showScores: true,
      }
  }
}

function PrintFooter() {
  return (
    <footer className="print-footer">
      <p className="print-footer__brand">AI&apos;M PICK · 데이터로 고르는 나의 미래</p>
      <p>호남지방데이터청 꿈길TEAM _ 김경보 &amp; 장하림</p>
    </footer>
  )
}

function PrintChipList({ items, className = '' }) {
  if (!items?.length) return null
  return (
    <div className={`print-chip-list ${className}`.trim()}>
      {items.map((item) => (
        <span key={item} className="print-chip">{item}</span>
      ))}
    </div>
  )
}

function PrintPage2Exploration({ resultData, version }) {
  const { keywords = [], activities = [], tip, message } = resultData
  const showFull = version === 'teen' || version === 'kids'

  if (!showFull) return null

  return (
    <>
      {keywords.length > 0 && (
        <section className="print-card print-keywords-card">
          <h2 className="print-card__title">🌈 나의 진로 성향 키워드</h2>
          <PrintChipList items={keywords} className="print-chip-list--keywords" />
        </section>
      )}

      {activities.length > 0 && (
        <section className="print-card print-activities-card">
          <h2 className="print-card__title">🎨 이런 활동을 해보세요!</h2>
          <PrintChipList items={activities} className="print-chip-list--activities" />
        </section>
      )}

      {tip && (
        <section className="print-card print-tip-card">
          <h2 className="print-card__title">🔎 나의 진로 탐험 TIP</h2>
          <p className="print-tip-card__text">{tip}</p>
        </section>
      )}

      {message && (
        <section className="print-card print-message-card">
          <h2 className="print-card__title">💌 너에게 보내는 응원</h2>
          <p className="print-message-card__text">&ldquo;{message}&rdquo;</p>
        </section>
      )}
    </>
  )
}

export default function PrintableResult({ result, resultData, version = 'teen' }) {
  if (!result || !resultData) return null

  const { scores, resultCode, topTypes = [] } = result
  const {
    name,
    shortName,
    description,
    jobs,
    hero,
    message,
    keywords = [],
    activities = [],
    tip,
  } = resultData
  const versionInfo = VERSIONS[version] || VERSIONS.teen
  const displayJobs = getDisplayJobs(version, resultCode, jobs)
  const treemapConfig = getTreemapConfig(version)
  const isTwoPage = version === 'teen'

  const [firstRank, secondRank] = topTypes
  const { remaining } = getHeroesForResult(resultCode, hero)
  const additionalCount = getAdditionalHeroCount(version)
  const additionalHeroes = remaining.slice(0, additionalCount)

  const jobsSectionTitle =
    version === 'mini' ? '💼 나와 잘 어울리는 활동' : '💼 나와 잘 어울리는 직업'

  return (
    <div className={`print-result print-only print-result--${version}`}>
      {/* PAGE 1 — 나의 진로탐험 결과 */}
      <section className="print-page print-page-1">
        <header className="print-header">
          <h1 className="print-header__logo">아이엠픽 AI&apos;M PICK</h1>
          <p className="print-header__tagline">데이터로 고르는 나의 미래</p>
          <p className="print-header__report-title">🌟 나의 진로탐험 리포트</p>
          <p className="print-header__meta">{versionInfo.label} · {versionInfo.count}문항</p>
        </header>

        <div className="print-page-1__body">
          <section className="print-card print-type-card">
            <h2 className="print-card__title">🌟 나의 진로유형</h2>
            <div className="print-type-card__badge">{resultCode}</div>
            <p className="print-type-card__name">{name}</p>
            <p className="print-type-card__short">{shortName}</p>
            <p className="print-type-card__desc">{description}이에요.</p>
          </section>

          <section className="print-card print-treemap-card">
            <CareerTreemap
              scores={scores}
              topTypes={topTypes}
              version={version}
              variant="print"
              title={treemapConfig.title}
              hint={treemapConfig.hint}
              showScores={treemapConfig.showScores}
            />
            {version !== 'mini' && (firstRank || secondRank) && (
              <div className="print-rank-badges">
                {firstRank && (
                  <span className="print-rank-badge print-rank-badge--first">
                    ★ 1순위 {TYPE_SHORT_LABELS[firstRank]}
                  </span>
                )}
                {secondRank && (
                  <span className="print-rank-badge print-rank-badge--second">
                    ☆ 2순위 {TYPE_SHORT_LABELS[secondRank]}
                  </span>
                )}
              </div>
            )}
          </section>

          {version !== 'mini' && (
            <section className="print-card print-strength-card">
              <h2 className="print-card__title">💪 나의 강점</h2>
              <p className="print-strength-card__text">
                {name}({shortName}) 유형은 {description}이에요.
              </p>
            </section>
          )}

          <section className="print-card print-jobs-card">
            <h2 className="print-card__title">{jobsSectionTitle}</h2>
            <div className="print-jobs-card__grid">
              {displayJobs.map((job) => (
                <div key={job} className="print-jobs-card__item">
                  <span className="print-jobs-card__item-icon">🌟</span>
                  {job}
                </div>
              ))}
            </div>
          </section>

          <section className="print-card print-hero-main-card">
            <h2 className="print-card__title">⭐ 나와 닮은 대표 위인</h2>
            <HeroRecommendation
              resultCode={resultCode}
              featuredHeroName={hero}
              resultData={resultData}
              version={version}
              layout="print"
              mode={isTwoPage ? 'featured' : 'all'}
            />
          </section>

          {!isTwoPage && (
            <>
              {version !== 'mini' && (
                <PrintPage2Exploration
                  resultData={{ keywords, activities, tip, message }}
                  version={version}
                />
              )}
              {version === 'mini' && (
                <section className="print-card print-message-card">
                  <h2 className="print-card__title">💌 너에게 보내는 응원</h2>
                  <p className="print-message-card__text">&ldquo;{message}&rdquo;</p>
                </section>
              )}
              <PrintFooter />
            </>
          )}
        </div>
      </section>

      {/* PAGE 2 — 나의 진로 위인 탐험 (TEEN) */}
      {isTwoPage && (
        <section className="print-page print-page-2">
          <div className="print-page-2__body">
            <section className="print-card print-hero-grid-card">
              <h2 className="print-card__title">✨ 함께 만나볼 위인</h2>
              <p className="print-hero-grid-card__hint">
                이 유형과 관련된 다양한 위인들을 만나보세요!
              </p>
              <div className="print-hero-grid">
                {additionalHeroes.map((heroItem) => (
                  <HeroCard
                    key={heroItem.name}
                    hero={heroItem}
                    variant="print"
                    showAchievementLabel
                  />
                ))}
              </div>
            </section>

            <PrintPage2Exploration resultData={resultData} version={version} />
          </div>

          <PrintFooter />
        </section>
      )}
    </div>
  )
}
