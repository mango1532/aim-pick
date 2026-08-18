import { useState } from 'react'
import { hasKnownHeroImage } from '../data/heroes'

export default function HeroCard({
  hero,
  variant = 'compact',
  showField = false,
  showAchievementLabel = false,
}) {
  const [imageError, setImageError] = useState(false)
  const showImage = hero.image && hasKnownHeroImage(hero.name) && !imageError

  return (
    <article className={`hero-card-item hero-card-item--${variant}`}>
      <div className="hero-card-item__visual">
        {showImage ? (
          <img
            src={hero.image}
            alt={hero.name}
            className="hero-card-item__image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="hero-card-item__placeholder" aria-hidden="true">
            <span>⭐</span>
          </div>
        )}
      </div>
      <div className="hero-card-item__body">
        <h4 className="hero-card-item__name">{hero.name}</h4>
        {showField && hero.field && (
          <p className="hero-card-item__field">{hero.field}</p>
        )}
        <p className="hero-card-item__achievement">
          {showAchievementLabel && (
            <span className="hero-card-item__achievement-label">대표 업적</span>
          )}
          {hero.achievement}
        </p>
      </div>
    </article>
  )
}
