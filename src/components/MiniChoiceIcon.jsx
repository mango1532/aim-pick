import slideIcon from '../assets/mini/icons/slide.svg'

const ICONS = {
  slide: slideIcon,
}

export default function MiniChoiceIcon({ emoji, icon }) {
  if (icon && ICONS[icon]) {
    return (
      <img
        src={ICONS[icon]}
        alt=""
        className="mini-choice-card__icon"
        aria-hidden="true"
      />
    )
  }

  return <span className="mini-choice-card__emoji">{emoji}</span>
}
