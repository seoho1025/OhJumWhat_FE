import type { ComponentProps } from 'react'
import { badgeStyle, type BadgeVariants } from './badge.css.ts'

// TDS처럼 variant·size·color 모두 필수 (design.md Badge)
type BadgeProps = Omit<ComponentProps<'span'>, 'color'> & Required<BadgeVariants>

export function Badge({ variant, size, color, className, ...rest }: BadgeProps) {
  return <span {...rest} className={`${badgeStyle({ variant, size, color })}${className ? ` ${className}` : ''}`} />
}
