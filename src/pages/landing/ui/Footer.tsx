import * as css from './footer.css.ts'

export function Footer() {
  return (
    <footer className={css.footer}>
      <span className={css.name}>오점왓</span>
      <span>점심 메뉴, 팀이 함께 정하는 서비스</span>
      <small>© 2026 오점왓</small>
    </footer>
  )
}
