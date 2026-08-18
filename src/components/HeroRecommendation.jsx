import { useState } from 'react'
import HeroCard from './HeroCard'
import {
  getHeroesForResult,
  getAdditionalHeroCount,
  hasKnownHeroImage,
} from '../data/heroes'

export default function HeroRecommendation({
  resultCode,
  featuredHeroName,
  resultData,
  version = 'teen',
  layout = 'print',
  mode = 'all',
}) {
  const { field, featured, remaining } = getHeroesForResult(resultCode, featuredHeroName)
  const additionalCount = getAdditionalHeroCount(version)
  const displayRemaining = remaining.slice(0, additionalCount)
  const [featuredImageError, setFeaturedImageError] = useState(false)

  const showFeatured = mode === 'all' || mode === 'featured'
  const showOthers = mode === 'all' || mode === 'others'

  const showFeaturedImage =
    featured.image && hasKnownHeroImage(featured.name) && !featuredImageError

  const fieldParts = field.split('·').map((part) => part.trim()).filter(Boolean)
  const encouragement =
    resultData?.message ||
    `${featured.name}처럼 이 분야를 탐색해 볼 수 있어요.`

  const isPrint = layout === 'print'
  const showFieldHeader = version !== 'mini'
  const showEncouragement = version !== 'mini'
  const gridColumns =
    version === 'mini' ? 3 : displayRemaining.length >= 6 ? 3 : 2

  return (
    <div className={`hero-recommendation hero-recommendation--${layout} hero-recommendation--${version}`}>
      {showFieldHeader && showFeatured && (
        <div className="hero-recommendation__intro">
          <p className="hero-recommendation__field-label">
            {fieldParts.length > 0
              ? fieldParts.map((part, i) => (
                  <span key={part}>
                    {i > 0 && ' · '}
                    {part}
                  </span>
                ))
              : field}
          </p>
          <p className="hero-recommendation__field-hint">
            이 분야에서 활약한 위인들을 만나보세요!
          </p>
        </div>
      )}

      {showFeatured && (
      <section className="hero-recommendation__featured">
        <h3 className="hero-recommendation__subtitle">
          {version === 'mini' ? '⭐ 나와 닮은 위인' : '⭐ 나와 가장 닮은 위인'}
        </h3>
        <div className="hero-recommendation__featured-card">
          <div className="hero-recommendation__featured-visual">
            {showFeaturedImage ? (
              <img
                src={featured.image}
                alt={featured.name}
                className="hero-recommendation__featured-image"
                onError={() => setFeaturedImageError(true)}
              />
            ) : (
              <div className="hero-recommendation__featured-placeholder" aria-hidden="true">
                <span>⭐</span>
              </div>
            )}
          </div>
          <div className="hero-recommendation__featured-text">
            <p className="hero-recommendation__featured-name">{featured.name}</p>
            {featured.shortDescription && version !== 'mini' && (
              <p className="hero-recommendation__featured-desc">
                &ldquo;{featured.shortDescription}&rdquo;
              </p>
            )}
            <p className="hero-recommendation__featured-achievement">
              <span className="hero-recommendation__achievement-label">대표 업적:</span>
              {featured.achievement}
            </p>
            {showEncouragement && (
              <p className="hero-recommendation__encouragement">
                &ldquo;{encouragement}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>
      )}

      {showOthers && displayRemaining.length > 0 && (
        <section
          className={`hero-recommendation__others${isPrint && version === 'teen' && mode === 'others' ? ' hero-recommendation__others--continued' : ''}`}
        >
          {mode !== 'others' && (
            <h3 className="hero-recommendation__subtitle">
              {version === 'mini' ? '함께 만나볼 위인' : '함께 알아볼 위인'}
            </h3>
          )}
          <div
            className="hero-recommendation__grid"
            style={{ '--hero-grid-cols': gridColumns }}
          >
            {displayRemaining.map((hero) => (
              <HeroCard
                key={hero.name}
                hero={hero}
                variant={version === 'mini' ? 'mini' : 'compact'}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
