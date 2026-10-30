import type { ComponentProps } from 'react'
import { buttonStyle, type ButtonVariants } from './button.css.ts'

// HTML button의 color 속성과 recipe의 color가 겹쳐 recipe 쪽을 남김
type ButtonProps = Omit<ComponentProps<'button'>, keyof ButtonVariants> &
  ButtonVariants & {
    loading?: boolean
  }

export function Button({
  color,
  variant,
  size,
  display,
  loading = false,
  disabled,
  // 기본값 submit이면 폼 안에서 의도치 않게 제출됨
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    // rest를 먼저 펼쳐 아래 값이 덮어쓰게 함 (className을 넘겨도 스타일 유지)
    <button
      {...rest}
      type={type}
      className={buttonStyle({ color, variant, size, display })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  )
}
