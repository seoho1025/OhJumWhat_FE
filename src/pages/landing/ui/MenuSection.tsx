import { MENU_SECTION } from '../config/content.ts'
import * as css from './landing.css.ts'

export function MenuSection() {
  const [first, accent] = MENU_SECTION.title

  return (
    <section className={css.menuSection} aria-labelledby="menu-title">
      <h2 id="menu-title" className={css.sectionTitle}>
        <span className={css.line}>{first}</span>
        <span className={css.accentLine}>{accent}</span>
      </h2>
      <ul className={css.menuCards}>
        {MENU_SECTION.cards.map((card) => (
          <li key={card.name} className={css.menuCard}>
            <span className={css.menuLabel} lang="en">
              {card.label}
            </span>
            <span className={css.menuName}>{card.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
