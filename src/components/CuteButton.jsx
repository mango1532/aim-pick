/**
 * 초등 저학년용 큰 버튼 컴포넌트
 */
export default function CuteButton({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) {
  return (
    <button
      type={type}
      className={`cute-btn cute-btn--${variant} cute-btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
