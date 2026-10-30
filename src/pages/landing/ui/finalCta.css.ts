import { style } from '@vanilla-extract/css'
import { GUTTER, SECTION_SPACE, sectionTitle, SLIDE_HEIGHT, SPACE } from './landing.css.ts'
import { FOOTER_HEIGHT } from './footer.css.ts'

// 마지막 화면 = 이 섹션 + 푸터가 정확히 한 화면, 멈춤 지점이 하나라 덜그럭거리지 않음 (D-040)
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: `calc(${SLIDE_HEIGHT} - ${FOOTER_HEIGHT})`,
  padding: `${SECTION_SPACE} ${GUTTER}`,
  textAlign: 'center',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: SPACE[32],
})

export const cheer = style({
  width: 'min(14rem, 50vw)',
})

export const title = style([sectionTitle])
