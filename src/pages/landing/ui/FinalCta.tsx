import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import { FINAL_CTA } from '../config/content.ts'
import * as css from './landing.css.ts'

export function FinalCta() {
  return (
    <section className={css.finalCta} aria-labelledby="final-title">
      <h2 id="final-title" className={css.finalTitle}>
        {FINAL_CTA.title.map((text) => (
          <span key={text} className={css.line}>
            {text}
          </span>
        ))}
      </h2>
      <a href={GOOGLE_LOGIN_PATH} className={buttonStyle()}>
        {FINAL_CTA.cta}
      </a>
    </section>
  )
}
