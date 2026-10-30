import { useSearchParams } from 'react-router'
import { loginErrorMessage } from '../lib/loginError.ts'
import { FinalCta } from './FinalCta.tsx'
import { Footer } from './Footer.tsx'
import { Hero } from './Hero.tsx'
import { page } from './landing.css.ts'
import { MenuSection } from './MenuSection.tsx'
import { StepSection } from './StepSection.tsx'

export function LandingPage() {
  const [searchParams] = useSearchParams()

  return (
    <div className={page}>
      <main>
        <Hero errorMessage={loginErrorMessage(searchParams.get('error'))} />
        <MenuSection />
        <StepSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
