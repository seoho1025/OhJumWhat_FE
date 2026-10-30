import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css.ts"

export const button = recipe({
    base: { // 모든 버튼에 공통으로 들어가는 스타일
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none', // 브라우저 기본 버튼의 회색 테두리를 없앰
        cursor: 'default', //cursor: default 일 경우 마우스 기본 포인터로 사용할 수 있음
        fontFamily: 'inherit', //직접 지정한 텍스트 폰트로 작성될 수 있도록 폰트 지정
        fontWeight: vars.weight.semibold,
        selectors: { // 상태에 따른 스타일
            '&:disabled': { // 비활성화 한 상태이면 흐리게 하고 금지 커서 "&"표시는 자기 자신을 가르킴
                opacity: 0.4,
                cursor: 'not-allowed',
            },
            '&:focus-visible': { // 키보드(Tab)으로 이동했을 때만 테두리를 보여줌, 마우스로 클릭할 경우에는 나타나지 않음
                outline: `2px solid ${vars.brand.primary}`,
                outlineOffset: '2px', // 테두리를 버튼에서 2px 띄워서 보기 가독성 좋게 함
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
        variant: {
            fill: {},
        },
        size: {
            xlarge: { // 폰트 크기
                minHeight: '3.5rem', // 글자가 길면 버튼이 늘어날 수 있도록 최솟값만 정함
                minWidth: '6rem', //rem 을 사용하는 이유는 사용자가 브라우저 글자 크기를 키우면 버튼도 함께 화면에 맞춰서 커짐
                padding: '0.9375rem 1.75rem', // 위아래 15px, 좌우 28px
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
        variant: 'fill',
        size: 'xlarge',
        display: 'inline',
    },
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>