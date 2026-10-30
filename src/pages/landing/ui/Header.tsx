import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import * as css from './header.css.ts'
import { pill } from './landing.css.ts'

// 각 메뉴는 같은 페이지의 섹션으로 이동 (id는 각 섹션 컴포넌트)
const NAV_ITEMS = [
  { href: '#features', label: '주요 기능' },
  { href: '#examples', label: '사용 예시' },
  { href: '#faq', label: '자주 묻는 질문' },
] as const

export function Header() {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <a href="#top" className={css.logo}>
          오점왓
        </a>
        <nav className={css.nav} aria-label="랜딩 메뉴">
          <ul className={css.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={css.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={css.actions}>
          <a href={GOOGLE_LOGIN_PATH} className={`${buttonStyle({ size: 'small' })} ${pill} ${css.loginButton}`}>
            로그인
          </a>
          <a href={GOOGLE_LOGIN_PATH} className={`${buttonStyle({ size: 'small' })} ${pill}`}>
            체험해보기
          </a>
        </div>
      </div>
    </header>
  )
}
