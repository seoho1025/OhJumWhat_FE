import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import * as css from './hero.css.ts'
import { accentLine, line, sectionTitle } from './landing.css.ts'

type HeroProps = {
  errorMessage?: string
}

export function Hero({ errorMessage }: HeroProps) {
  return (
    <section className={css.hero} aria-labelledby="hero-title">
      <div className={css.content}>
        <h1 id="hero-title" className={sectionTitle}>
          <span className={line}>오늘 점심,</span>
          <span className={accentLine}>투표로 정해요</span>
        </h1>
        <p className={css.description}>메뉴 고민은 팀이 함께, 결정은 3분 안에</p>
        {errorMessage && (
          <p role="alert" className={css.loginError}>
            {errorMessage}
          </p>
        )}
        <a href={GOOGLE_LOGIN_PATH} className={buttonStyle()}>
          구글로 시작하기
        </a>
      </div>
      <div className={css.phoneSlot} aria-hidden="true" />
    </section>
  )
}
