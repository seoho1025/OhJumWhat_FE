import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CONTENT_MAX, GUTTER, HAIRLINE, REVEAL_EASE, SECTION_SPACE, SPACE } from './landing.css.ts'

// TDS BoardRow 기준: Prefix와 제목 간격 8, 본문 아래 여백 24, Prefix st8 regular, 본문 t6, 화살표 24·grey400
// 문서에 없는 값: 행 위아래 20, 좌우 24(ListRow horizontalPadding medium), 구분선 좌우 24 여백(Border padding24) (D-033)
const ROW_PADDING = `${SPACE[20]} ${SPACE[24]}`
const ARROW_SIZE = SPACE[24]
const TOGGLE_DURATION = '0.3s'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  padding: `${SECTION_SPACE} ${GUTTER}`,
})

export const list = style({
  width: '100%',
  maxWidth: CONTENT_MAX,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.bg.grey,
  overflow: 'hidden',
})

export const item = style({
  position: 'relative',
  selectors: {
    // Border padding24: 좌우 24 여백을 둔 구분선, 마지막 항목은 없음
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: SPACE[24],
      right: SPACE[24],
      height: HAIRLINE,
      backgroundColor: vars.border.subtle,
    },
  },
})

export const heading = style({ margin: 0 })

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: SPACE[8],
  width: '100%',
  padding: ROW_PADDING,
  border: 'none',
  background: 'none',
  font: 'inherit',
  color: vars.text.primary,
  textAlign: 'left',
  cursor: 'default',
  selectors: {
    '&:hover': { color: vars.brand.primary },
    '&:focus-visible': { outline: `2px solid ${vars.brand.primary}`, outlineOffset: `-${SPACE[4]}` },
  },
})

export const prefix = style({
  fontSize: vars.font.st8.size,
  lineHeight: vars.font.st8.lineHeight,
  fontWeight: vars.weight.regular,
  color: vars.brand.primary,
})

export const question = style({
  flex: 1,
  fontSize: vars.font.t5.size,
  lineHeight: vars.font.t5.lineHeight,
  fontWeight: vars.weight.semibold,
})

// 오른쪽 화살표가 열리면 아래를 향함
export const arrow = style({
  flexShrink: 0,
  width: ARROW_SIZE,
  height: ARROW_SIZE,
  color: vars.palette.grey400,
  transition: `transform ${TOGGLE_DURATION} ${REVEAL_EASE}`,
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
})

export const arrowOpen = style({ transform: 'rotate(90deg)' })

// 높이를 0fr ↔ 1fr로 바꿔 내용 높이만큼 부드럽게 열고 닫음
export const panel = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: `grid-template-rows ${TOGGLE_DURATION} ${REVEAL_EASE}`,
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
})

export const panelOpen = style({ gridTemplateRows: '1fr' })

export const panelInner = style({ overflow: 'hidden' })

export const answer = style({
  margin: 0,
  padding: `0 ${SPACE[24]} ${SPACE[24]}`,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  color: vars.text.secondary,
})
