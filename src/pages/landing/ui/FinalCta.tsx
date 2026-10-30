import cheer from './characters/cheer.webp'
import { useInView } from '../lib/useInView.ts'
import * as css from './finalCta.css.ts'
import { character, inView, line, reveal, section } from './landing.css.ts'

export function FinalCta() {
  const { ref, inView: visible } = useInView<HTMLDivElement>()

  return (
    <section className={`${section} ${css.section}`} aria-labelledby="final-title">
      <div ref={ref} className={`${css.content} ${reveal} ${visible ? inView : ''}`}>
        <img src={cheer} alt="" width={700} height={512} loading="lazy" className={`${character} ${css.cheer}`} />
        <h2 id="final-title" className={css.title}>
          <span className={line}>내일 점심부터</span>
          <span className={line}>같이 정해요</span>
        </h2>
      </div>
    </section>
  )
}
