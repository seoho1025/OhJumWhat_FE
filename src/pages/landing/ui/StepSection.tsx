import { line, sectionTitle } from './landing.css.ts'
import * as css from './stepSection.css.ts'

const STEPS = [
  { title: ['팀을 만들고', '동료를 초대하세요'], description: '초대 링크 하나로 같은 팀이 돼요.' },
  { title: ['먹고 싶은 메뉴를', '올리세요'], description: '근처 식당을 찾아 메뉴에 연결할 수 있어요.' },
  { title: ['투표하고', '이야기 나누세요'], description: '투표하면서 채팅으로 의견을 모아요.' },
  { title: ['마감되면', '오늘 점심 결정'], description: '쌓인 기록으로 우리 팀 메뉴 통계를 볼 수 있어요.' },
] as const

export function StepSection() {
  return (
    <section className={css.section} aria-labelledby="step-title">
      <h2 id="step-title" className={sectionTitle}>
        어떻게 쓰나요?
      </h2>
      <ol className={css.list}>
        {STEPS.map((step, index) => (
          <li key={step.description} className={css.card}>
            <div className={css.text}>
              <span className={css.label}>STEP {index + 1}</span>
              <h3 className={css.title}>
                {step.title.map((text) => (
                  <span key={text} className={line}>
                    {text}
                  </span>
                ))}
              </h3>
              <p className={css.description}>{step.description}</p>
            </div>
            <div className={css.screenSlot} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  )
}
