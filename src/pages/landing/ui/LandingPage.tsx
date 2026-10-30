import { useSearchParams } from 'react-router'
import { loginErrorMessage } from '../lib/loginError.ts'
import { FaqSection } from './FaqSection.tsx'
import { FinalCta } from './FinalCta.tsx'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import { Hero } from './Hero.tsx'
import { page } from './landing.css.ts'
import { MenuSection } from './MenuSection.tsx'
import { StepSection } from './StepSection.tsx'

export function LandingPage() {
  const [searchParams] = useSearchParams()

  return (
    <div className={page}>
      <Header />
      <main>
        <Hero errorMessage={loginErrorMessage(searchParams.get('error'))} />
        <MenuSection />
        <StepSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
