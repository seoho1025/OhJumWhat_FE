import invite from './characters/invite.webp'
import lunch from './characters/lunch.webp'
import search from './characters/search.webp'
import vote from './characters/vote.webp'
import { useInView } from '../lib/useInView.ts'
import { character, inView, line, reveal, section, sectionTitle } from './landing.css.ts'
import * as css from './stepSection.css.ts'

// width·height는 이미지 원본 크기, 불러오기 전에 자리를 잡아 화면이 밀리지 않게
const STEPS = [
  {
    title: ['팀을 만들고', '동료를 초대하세요'],
    description: '초대 링크 하나로 같은 팀이 돼요.',
    image: { src: invite, width: 900, height: 643, alt: '휴대폰으로 초대 링크를 함께 보는 두 캐릭터' },
  },
  {
    title: ['먹고 싶은 메뉴를', '올리세요'],
    description: '근처 식당을 찾아 메뉴에 연결할 수 있어요.',
    image: { src: search, width: 800, height: 809, alt: '돋보기로 메뉴를 찾는 밥그릇 캐릭터' },
  },
  {
    title: ['투표하고', '이야기 나누세요'],
    description: '투표하면서 채팅으로 의견을 모아요.',
    image: { src: vote, width: 900, height: 633, alt: '투표함 옆에서 메뉴판을 든 밥그릇 캐릭터' },
  },
  {
    title: ['마감되면', '오늘 점심 결정'],
    description: '쌓인 기록으로 우리 팀 메뉴 통계를 볼 수 있어요.',
    image: { src: lunch, width: 900, height: 499, alt: '한 식탁에 둘러앉아 점심을 먹는 캐릭터들' },
  },
] as const

type Step = (typeof STEPS)[number]

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, inView: visible } = useInView<HTMLLIElement>()

  return (
    <li ref={ref} className={`${css.card} ${reveal} ${visible ? inView : ''}`}>
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
      <div className={css.screenSlot}>
        <img
          src={step.image.src}
          alt={step.image.alt}
          width={step.image.width}
          height={step.image.height}
          loading="lazy"
          className={`${character} ${css.stepCharacter}`}
        />
      </div>
    </li>
  )
}

export function StepSection() {
  const { ref: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>()

  return (
    <section id="examples" className={`${section} ${css.section}`} aria-labelledby="step-title">
      <h2 id="step-title" ref={titleRef} className={`${sectionTitle} ${reveal} ${titleInView ? inView : ''}`}>
        어떻게 쓰나요?
      </h2>
      <ol className={css.list}>
        {STEPS.map((step, index) => (
          <StepCard key={step.description} step={step} index={index} />
        ))}
      </ol>
    </section>
  )
}
