import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../theme.css.ts'

// shortcut: design.md에 없는 상태 값, 디자인 규칙이 정해지면 교체
const DISABLED_OPACITY = 0.4
const FOCUS_RING_WIDTH = '2px'

export const buttonStyle = recipe({
  base: {
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
    selectors: {
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
    size: {
      // design.md Button 표 xlarge (56 / 96 / 15·28 / r16 / t5), 글자가 길면 늘어나도록 최솟값만
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
