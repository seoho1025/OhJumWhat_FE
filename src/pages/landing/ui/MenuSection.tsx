import { useInView } from '../lib/useInView.ts'
import { accentLine, inView, line, reveal, section, sectionTitle } from './landing.css.ts'
import * as css from './menuSection.css.ts'

// 카드 기울기는 nth-child 순서라 다섯 개에 맞춰져 있음 (menuSection.css.ts)
const MENUS = [
  { label: 'Korean', name: '한식' },
  { label: 'Chinese', name: '중식' },
  { label: 'Japanese', name: '일식' },
  { label: 'Snack', name: '분식' },
  { label: 'Salad', name: '샐러드' },
] as const

export function MenuSection() {
  const { ref: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>()
  const { ref: cardsRef, inView: cardsInView } = useInView<HTMLUListElement>()

  return (
    <section id="features" className={`${section} ${css.section}`} aria-labelledby="menu-title">
      <h2 id="menu-title" ref={titleRef} className={`${sectionTitle} ${reveal} ${titleInView ? inView : ''}`}>
        <span className={line}>어떤 메뉴든</span>
        <span className={accentLine}>한 번에 투표로</span>
      </h2>
      <ul ref={cardsRef} className={`${css.cards} ${cardsInView ? css.cardsInView : ''}`}>
        {MENUS.map((menu) => (
          <li key={menu.name} className={css.card}>
            <span className={css.label} lang="en">
              {menu.label}
            </span>
            <span className={css.name}>{menu.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
