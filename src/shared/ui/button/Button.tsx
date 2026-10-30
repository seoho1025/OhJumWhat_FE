import type { ComponentProps } from 'react'
import { button, type ButtonVariants } from './button.css.ts'

type ButtonProps = Omit<ComponentProps<'button'>, keyof ButtonVariants> &
    ButtonVariants & {
    loading?: boolean
}

//구조를 분해해서 props 객체에서 필요한 것들을 이름으로 꺼냄
export function Button({
                           color,
                           variant,
                           size,
                           display,
                           loading = false,
                           disabled,
                           type = 'button',
                           children,
                           ...rest
                       }: ButtonProps) {

    // 화면에서 그리는 코드
    return (
        <button
            {...rest} // 뒤에 오는 type, className, disabled 가 덮어쓰도록 쓰는 쪽에서 실수로 className을 넘겨도 버튼 스타일이 깨지지 않도록
            type={type}
            className={button({ color, variant, size, display })} //recipe 함수가 옵션에 맞는 클래스 이름 문자열을 돌려줌
            disabled={disabled || loading} // 비활성화거나 로딩 중이면 누를 수 없도록 방지
            aria-busy={loading || undefined}
        >
            {children}
        </button>
    )
}