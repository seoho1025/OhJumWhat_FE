import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../theme.css.ts'

// TDS Badge는 축 이름만 공개(variant·size·color), 값은 현업 공통 기준 (D-038)
// fill: 진한 배경 + 흰 글자 / weak: 연한 배경(50) + 진한 글자(700)
// primary는 TDS에 없는 프로젝트 브랜드 색, elephant는 TDS 이름으로 회색 계열에 대응
const COLORS = {
  primary: { fill: vars.brand.primary, weakBg: vars.brand.weak, weakText: vars.palette.orange900 },
  blue: { fill: vars.palette.blue500, weakBg: vars.palette.blue50, weakText: vars.palette.blue700 },
  teal: { fill: vars.palette.teal500, weakBg: vars.palette.teal50, weakText: vars.palette.teal700 },
  green: { fill: vars.palette.green500, weakBg: vars.palette.green50, weakText: vars.palette.green700 },
  red: { fill: vars.palette.red500, weakBg: vars.palette.red50, weakText: vars.palette.red700 },
  yellow: { fill: vars.palette.yellow500, weakBg: vars.palette.yellow50, weakText: vars.palette.yellow700 },
  elephant: { fill: vars.palette.grey600, weakBg: vars.palette.grey100, weakText: vars.palette.grey700 },
} as const

type BadgeColor = keyof typeof COLORS

const colorNames = Object.keys(COLORS) as BadgeColor[]

export const badgeStyle = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    // 모든 크기에서 완전히 둥근 알약 모양 (D-038)
    borderRadius: '999px',
    fontWeight: vars.weight.semibold,
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      fill: { color: '#ffffff' },
      weak: {},
    },
    // 높이 18 / 20 / 24 / 28, 글자 11 / 12 / 13 / 14
    size: {
      xsmall: { height: '1.125rem', padding: '0 0.375rem', fontSize: vars.font.st13.size, lineHeight: vars.font.st13.lineHeight },
      small: { height: '1.25rem', padding: '0 0.5rem', fontSize: vars.font.st12.size, lineHeight: vars.font.st12.lineHeight },
      medium: { height: '1.5rem', padding: '0 0.5rem', fontSize: vars.font.t7.size, lineHeight: vars.font.t7.lineHeight },
      large: { height: '1.75rem', padding: '0 0.625rem', fontSize: vars.font.st11.size, lineHeight: vars.font.st11.lineHeight },
    },
    color: Object.fromEntries(colorNames.map((name) => [name, {}])) as Record<BadgeColor, object>,
  },
  compoundVariants: colorNames.flatMap((name) => [
    { variants: { color: name, variant: 'fill' as const }, style: { backgroundColor: COLORS[name].fill } },
    { variants: { color: name, variant: 'weak' as const }, style: { backgroundColor: COLORS[name].weakBg, color: COLORS[name].weakText } },
  ]),
})

export type BadgeVariants = NonNullable<RecipeVariants<typeof badgeStyle>>
