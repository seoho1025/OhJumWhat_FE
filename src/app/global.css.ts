import { globalFontFace, globalStyle } from '@vanilla-extract/css'

const FONT_FAMILY = 'NanumSquare Neo'

globalFontFace(FONT_FAMILY, {
  src: "url('/fonts/NanumSquareNeo-Variable.woff2') format('woff2')",
  fontWeight: '100 900',
  fontDisplay: 'swap',
})

globalStyle('body', {
  fontFamily: `'${FONT_FAMILY}', system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif`,
})
