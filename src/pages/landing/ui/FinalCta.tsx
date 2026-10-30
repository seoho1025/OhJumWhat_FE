import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import * as css from './finalCta.css.ts'
import { line } from './landing.css.ts'

export function FinalCta() {
  return (
    <section className={css.section} aria-labelledby="final-title">
      <h2 id="final-title" className={css.title}>
        <span className={line}>내일 점심부터</span>
        <span className={line}>같이 정해요</span>
      </h2>
      <a href={GOOGLE_LOGIN_PATH} className={buttonStyle()}>
        구글로 시작하기
      </a>
    </section>
  )
}
