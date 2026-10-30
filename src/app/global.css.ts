import { globalFontFace, globalStyle } from '@vanilla-extract/css'
import { vars } from '../shared/ui'

const FONT_FAMILY = 'NanumSquare Neo'

globalFontFace(FONT_FAMILY, {
  src: "url('/fonts/NanumSquareNeo-Variable.woff2') format('woff2')",
  fontWeight: '100 900',
  fontDisplay: 'swap',
})

// 헤더 메뉴(#features 등)로 이동할 때 부드럽게 스크롤, 움직임 줄이기 설정이면 바로 이동
globalStyle('html', {
  '@media': {
    '(prefers-reduced-motion: no-preference)': { scrollBehavior: 'smooth' },
  },
})

globalStyle('body', {
  margin: 0,
  backgroundColor: vars.bg.base,
  fontFamily: `'${FONT_FAMILY}', system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif`,
  fontSize: vars.font.t5.size,
  lineHeight: vars.font.t5.lineHeight,
  fontWeight: vars.weight.regular,
})
