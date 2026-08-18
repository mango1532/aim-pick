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
  const isPrint = layout === 'print'

  const showFeaturedImage =
    featured.image && hasKnownHeroImage(featured.name) && !featuredImageError

  const fieldParts = field.split('·').map((part) => part.trim()).filter(Boolean)
  const gridColumns = isPrint
    ? 3
    : version === 'mini'
      ? 3
      : displayRemaining.length >= 6
        ? 3
        : 2

  const cardVariant = isPrint ? 'print' : version === 'mini' ? 'mini' : 'compact'

  const featuredTagline = featured.shortDescription
    ? featured.shortDescription.replace(/예요\.?$/, '').trim()
    : null

  return (
    <div className={`hero-recommendation hero-recommendation--${layout} hero-recommendation--${version}`}>
      {showOthers && isPrint && mode === 'others' && fieldParts.length > 0 && (
        <div className="hero-recommendation__intro">
          <p className="hero-recommendation__field-label">
            {fieldParts.join(' · ')}
          </p>
        </div>
      )}

      {showFeatured && (
        <section className="hero-recommendation__featured">
          {!isPrint && (
            <h3 className="hero-recommendation__subtitle">
              {version === 'mini' ? '⭐ 나와 닮은 위인' : '⭐ 나와 가장 닮은 위인'}
            </h3>
          )}
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
              {isPrint && featuredTagline && version !== 'mini' && (
                <p className="hero-recommendation__featured-tagline">{featuredTagline}</p>
              )}
              {!isPrint && featured.shortDescription && version !== 'mini' && (
                <p className="hero-recommendation__featured-desc">
                  {featured.shortDescription}
                </p>
              )}
              {isPrint && !featuredTagline && featured.shortDescription && version !== 'mini' && (
                <p className="hero-recommendation__featured-desc">
                  {featured.shortDescription}
                </p>
              )}
              <p className="hero-recommendation__featured-achievement">
                <span className="hero-recommendation__achievement-label">대표 업적</span>
                {featured.achievement}
              </p>
              {!isPrint && version !== 'mini' && resultData?.message && (
                <p className="hero-recommendation__encouragement">
                  &ldquo;{resultData.message}&rdquo;
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {showOthers && displayRemaining.length > 0 && (
        <section className="hero-recommendation__others">
          {!isPrint && mode !== 'others' && (
            <h3 className="hero-recommendation__subtitle">
              {version === 'mini' ? '함께 만나볼 위인' : '함께 알아볼 위인'}
            </h3>
          )}
          <div
            className="hero-recommendation__grid"
            style={{ '--hero-grid-cols': gridColumns }}
          >
            {displayRemaining.map((heroItem) => (
              <HeroCard
                key={heroItem.name}
                hero={heroItem}
                variant={cardVariant}
                showAchievementLabel={isPrint}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
