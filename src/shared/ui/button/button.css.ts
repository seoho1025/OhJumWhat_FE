import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../theme.css.ts'

const DISABLED_OPACITY = 0.4
const FOCUS_RING_WIDTH = '2px'
// 버튼 위에 어두운 층을 겹쳐 상태 표시, 투명도는 Material 3 state layer 기준 (D-031)
const DIM_LAYER = vars.palette.grey900
const HOVER_DIM_OPACITY = 0.08
const PRESSED_DIM_OPACITY = 0.1
const DIM_TRANSITION = 'opacity 0.1s'

// 높이가 44px보다 작은 버튼은 위아래로 보이지 않는 터치 영역을 넓힘 (design.md 터치 영역 최소 44px)
const MIN_TOUCH = 44
const touchArea = (heightPx: number) => ({
  '::before': {
    content: '""',
    position: 'absolute',
    inset: `${(heightPx - MIN_TOUCH) / 2}px 0`,
  },
}) as const

export const buttonStyle = recipe({
  base: {
    position: 'relative',
    // 크기 표의 높이·폭은 padding 포함 값, <a>는 기본이 content-box라 지정
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    // 손 모양 대신 기본 화살표 (design.md Button)
    cursor: 'default',
    // 브라우저가 버튼에 따로 주는 글꼴 대신 body 글꼴을 물려받음
    fontFamily: 'inherit',
    fontWeight: vars.weight.semibold,
    // <a>에 buttonStyle을 쓸 때 밑줄 제거 (D-028)
    textDecoration: 'none',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: DIM_LAYER,
      opacity: 0,
      transition: DIM_TRANSITION,
      pointerEvents: 'none',
    },
    selectors: {
      '&:hover:not(:disabled)::after': {
        opacity: HOVER_DIM_OPACITY,
      },
      '&:active:not(:disabled)::after': {
        opacity: PRESSED_DIM_OPACITY,
      },
      '&:disabled': {
        opacity: DISABLED_OPACITY,
        cursor: 'not-allowed',
      },
      // 키보드로 이동할 때만 보이는 테두리, 제거 금지 (design.md 접근성)
      '&:focus-visible': {
        outline: `${FOCUS_RING_WIDTH} solid ${vars.brand.primary}`,
        outlineOffset: FOCUS_RING_WIDTH,
      },
    },
  },
  variants: {
    color: {
      primary: {
        backgroundColor: vars.brand.primary,
        color: vars.brand.onPrimary,
      },
    },
    variant: {
      fill: {},
    },
    // 8px 단계 높이(32/40/48/56), xlarge만 TDS 값 (design.md Button 표, D-031)
    // 글자가 길면 늘어나도록 최솟값만, 세로 가운데는 inline-flex 정렬로
    size: {
      small: {
        minHeight: '2rem',
        minWidth: '3rem',
        padding: '0 0.75rem',
        borderRadius: '0.5rem',
        fontSize: vars.font.st11.size,
        lineHeight: vars.font.st11.lineHeight,
        ...touchArea(32),
      },
      medium: {
        minHeight: '2.5rem',
        minWidth: '4rem',
        padding: '0 1rem',
        borderRadius: '0.625rem',
        fontSize: vars.font.t6.size,
        lineHeight: vars.font.t6.lineHeight,
        ...touchArea(40),
      },
      large: {
        minHeight: '3rem',
        minWidth: '5rem',
        padding: '0 1.25rem',
        borderRadius: '0.75rem',
        fontSize: vars.font.st10.size,
        lineHeight: vars.font.st10.lineHeight,
      },
      xlarge: {
        minHeight: '3.5rem',
        minWidth: '6rem',
        padding: '0.9375rem 1.75rem',
        borderRadius: '1rem',
        fontSize: vars.font.t5.size,
        lineHeight: vars.font.t5.lineHeight,
      },
    },
    display: {
      inline: {},
      full: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    variant: 'fill',
    size: 'xlarge',
    display: 'inline',
  },
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonStyle>>
