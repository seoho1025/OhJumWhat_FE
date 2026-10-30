import { STEP_SECTION } from '../config/content.ts'
import * as css from './landing.css.ts'

export function StepSection() {
  return (
    <section className={css.stepSection} aria-labelledby="step-title">
      <h2 id="step-title" className={css.sectionTitle}>
        {STEP_SECTION.title}
      </h2>
      <ol className={css.stepList}>
        {STEP_SECTION.steps.map((step, index) => (
          <li key={step.description} className={css.stepCard}>
            <div className={css.stepText}>
              <span className={css.stepLabel}>STEP {index + 1}</span>
              <h3 className={css.stepTitle}>
                {step.title.map((text) => (
                  <span key={text} className={css.line}>
                    {text}
                  </span>
                ))}
              </h3>
              <p className={css.stepDescription}>{step.description}</p>
            </div>
            <div className={css.screenSlot} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  )
}
