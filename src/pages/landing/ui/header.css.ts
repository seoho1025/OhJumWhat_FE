import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { GUTTER, HAIRLINE, HEADER_HEIGHT, SPACE } from './landing.css.ts'

// 스크롤해도 위에 붙어 있고, 뒤 내용이 아주 살짝 비치는 흰 배경
// 블러(backdrop-filter)는 스크롤할 때마다 뒤 화면을 다시 그려 버벅임의 원인이라 쓰지 않음 (D-039)
const HEADER_BG = `color-mix(in srgb, ${vars.bg.base} 92%, transparent)`
// 구분선 대신 아주 옅은 그림자로 본문과 나눔
const HEADER_SHADOW = `0 1px ${SPACE[12]} ${vars.palette.greyOpacity100}`
// 로고와 로그인을 화면 양끝 가까이: 폭 제한 없이 데스크톱 좌우 여백 24
const HEADER_GUTTER_DESKTOP = SPACE[24]

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  height: HEADER_HEIGHT,
  backgroundColor: HEADER_BG,
  boxShadow: HEADER_SHADOW,
})

// 데스크톱: 왼쪽·오른쪽 칸을 같은 폭(1fr)으로 두어 가운데 메뉴가 화면 정중앙에 옴
// 모바일: 메뉴가 없어 버튼 칸(auto)이 내용 폭만큼 차지하게
export const inner = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  '@media': {
    [breakpoint.desktop]: { gridTemplateColumns: '1fr auto 1fr', padding: `0 ${HEADER_GUTTER_DESKTOP}` },
  },
  alignItems: 'center',
  gap: SPACE[16],
  height: '100%',
  padding: `0 ${GUTTER}`,
  boxSizing: 'border-box',
})

export const logo = style({
  display: 'flex',
  alignItems: 'center',
  gap: SPACE[8],
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.brand.primary,
  textDecoration: 'none',
  justifySelf: 'start',
})

// 메뉴는 데스크톱에서만, 모바일은 로고와 버튼만
export const nav = style({
  display: 'none',
  '@media': {
    [breakpoint.desktop]: { display: 'block' },
  },
})

export const navList = style({
  display: 'flex',
  gap: SPACE[32],
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const navLink = style({
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  fontWeight: vars.weight.medium,
  color: vars.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s',
  selectors: {
    '&:hover': { color: vars.brand.primary },
    '&:focus-visible': { color: vars.brand.primary, outline: `2px solid ${vars.brand.primary}`, outlineOffset: SPACE[4] },
  },
})

export const actions = style({
  gridColumn: '3',
  justifySelf: 'end',
  display: 'flex',
  gap: SPACE[8],
})

// 로그인: 배경 없이 메인 색 테두리와 글자
export const loginButton = style({
  backgroundColor: 'transparent',
  color: vars.brand.primary,
  boxShadow: `inset 0 0 0 ${HAIRLINE} ${vars.brand.primary}`,
})

// 로고 옆 캐릭터, 글자 높이보다 조금 크게
export const logoIcon = style({
  width: SPACE[32],
  height: SPACE[32],
})
