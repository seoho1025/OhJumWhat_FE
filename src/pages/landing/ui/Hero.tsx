import { GOOGLE_LOGIN_PATH } from '../../../shared/config'
import { buttonStyle } from '../../../shared/ui'
import welcome from './characters/welcome.webp'
import * as css from './hero.css.ts'
import { accentLine, character, displayTitle, floatingShadow, pill, secondaryButton } from './landing.css.ts'

type HeroProps = {
  errorMessage?: string
}

export function Hero({ errorMessage }: HeroProps) {
  return (
    <section id="top" className={css.hero} aria-labelledby="hero-title">
      <div className={css.content}>
        <h1 id="hero-title" className={displayTitle}>
          <span className={accentLine}>오늘 점심,</span>
          <span className={accentLine}>투표로 정해요</span>
        </h1>
        <p className={css.description}>메뉴 고민은 팀이 함께, 결정은 3분 안에</p>
        {errorMessage && (
          <p role="alert" className={css.loginError}>
            {errorMessage}
          </p>
        )}
      </div>
      <div className={css.buttons}>
        <a href="#features" className={`${buttonStyle({ size: 'large' })} ${pill} ${secondaryButton}`}>
          더 알아보기
        </a>
        <a href={GOOGLE_LOGIN_PATH} className={`${buttonStyle({ size: 'large' })} ${pill} ${floatingShadow}`}>
          시작하기
        </a>
      </div>
      {/* 첫 화면 이미지라 바로 불러옴, 문구가 내용을 전하므로 장식(alt 비움) */}
      <img src={welcome} alt="" width={1000} height={926} fetchPriority="high" className={`${character} ${css.heroCharacter}`} />
    </section>
  )
}
