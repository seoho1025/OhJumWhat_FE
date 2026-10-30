import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css.ts"

export const button = recipe({
    base: { // 모든 버튼에 공통으로 들어가는 스타일
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'border',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: vars.weight.semiBold,
        selectors: {
            '&:disabled': {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
            '&:focus-visible': {
                outline: `2px solid ${vars.colors.primary}`,
                outlineOffset: '2px',
            },
        },
    },
    variants: { // 고를 수 있는 옵션 (색, 종류, 크기, 폭)
        color: {
            primary: {
                backgroundColor: vars.brand.primary,
                color: vars.brand.onPrimary,
            },
        },
        variants: {
            fill: {},
        },
        size: {
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
    defaultVariants: { // 아무것도 지정하지 않았을 때 쓰는 값
        color: 'primary',
        variants: 'fill',
        size: 'xlarge',
        display: 'inline',
    },
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>