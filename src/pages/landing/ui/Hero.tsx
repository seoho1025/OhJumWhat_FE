import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import { HERO } from '../config/content.ts'
import * as css from './landing.css.ts'

type HeroProps = {
  errorMessage?: string
}

export function Hero({ errorMessage }: HeroProps) {
  const [first, accent] = HERO.title

  return (
    <section className={css.hero} aria-labelledby="hero-title">
      <div className={css.heroContent}>
        <h1 id="hero-title" className={css.heroTitle}>
          <span className={css.line}>{first}</span>
          <span className={css.accentLine}>{accent}</span>
        </h1>
        <p className={css.heroDescription}>{HERO.description}</p>
        {errorMessage && (
          <p role="alert" className={css.loginError}>
            {errorMessage}
          </p>
        )}
        <a href={GOOGLE_LOGIN_PATH} className={buttonStyle()}>
          {HERO.cta}
        </a>
      </div>
      <div className={css.phoneSlot} aria-hidden="true" />
    </section>
  )
}
