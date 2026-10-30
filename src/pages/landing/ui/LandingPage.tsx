import { useSearchParams } from 'react-router'
import { FinalCta } from './FinalCta.tsx'
import { Hero } from './Hero.tsx'
import { MenuSection } from './MenuSection.tsx'
import { StepSection } from './StepSection.tsx'
import * as css from './landing.css.ts'
import { loginErrorMessage } from '../lib/loginError.ts'

export function LandingPage() {
  const [searchParams] = useSearchParams()

  return (
    <div className={css.page}>
      <main>
        <Hero errorMessage={loginErrorMessage(searchParams.get('error'))} />
        <MenuSection />
        <StepSection />
        <FinalCta />
      </main>
      <footer className={css.footer}>
        <span className={css.footerName}>오점왓</span>
        <span>점심 메뉴, 팀이 함께 정하는 서비스</span>
        <small>© 2026 오점왓</small>
      </footer>
    </div>
  )
}
