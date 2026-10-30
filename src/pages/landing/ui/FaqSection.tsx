import { useId, useState } from 'react'
import guide from './characters/guide.webp'
import { useInView } from '../lib/useInView.ts'
import * as css from './faqSection.css.ts'
import { character, inView, reveal, section, sectionTitle } from './landing.css.ts'

const FAQS = [
  { question: '어떻게 시작하나요?', answer: '구글 계정으로 로그인한 뒤 팀을 만들면 바로 첫 투표를 열 수 있어요.' },
  { question: '동료는 어떻게 초대하나요?', answer: '팀을 만들면 초대 링크가 생겨요. 링크를 받은 동료가 로그인하면 같은 팀이 돼요.' },
  { question: '매일 투표를 따로 열어야 하나요?', answer: '정기 투표에 요일과 시간을 정해 두면 그 시간에 투표가 자동으로 열려요.' },
  { question: '근처 식당도 찾을 수 있나요?', answer: '팀 위치를 등록하면 근처 식당을 검색해서 메뉴에 연결할 수 있어요.' },
  { question: '투표는 언제 끝나나요?', answer: '정한 마감 시간이 되면 끝나고, 그 전에 직접 마감할 수도 있어요.' },
] as const

type Faq = (typeof FAQS)[number]

// TDS BoardRow처럼 제목 버튼을 누르면 열리고 닫힘, aria-expanded로 상태를 알림
function FaqItem({ faq }: { faq: Faq }) {
  const [opened, setOpened] = useState(false)
  const panelId = useId()
  const triggerId = useId()

  return (
    <li className={css.item}>
      <h3 className={css.heading}>
        <button
          id={triggerId}
          type="button"
          className={css.trigger}
          aria-expanded={opened}
          aria-controls={panelId}
          onClick={() => setOpened((prev) => !prev)}
        >
          <span className={css.prefix} aria-hidden="true">
            Q
          </span>
          <span className={css.question}>{faq.question}</span>
          <svg className={`${css.arrow} ${opened ? css.arrowOpen : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`${css.panel} ${opened ? css.panelOpen : ''}`}
        inert={!opened}
      >
        <div className={css.panelInner}>
          <p className={css.answer}>{faq.answer}</p>
        </div>
      </div>
    </li>
  )
}

export function FaqSection() {
  const { ref: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>()

  return (
    <section id="faq" className={`${section} ${css.section}`} aria-labelledby="faq-title">
      <img src={guide} alt="" width={440} height={434} loading="lazy" className={`${character} ${css.guide} ${reveal} ${titleInView ? inView : ''}`} />
      <h2 id="faq-title" ref={titleRef} className={`${sectionTitle} ${reveal} ${titleInView ? inView : ''}`}>
        자주 묻는 질문
      </h2>
      <ul className={css.list}>
        {FAQS.map((faq) => (
          <FaqItem key={faq.question} faq={faq} />
        ))}
      </ul>
    </section>
  )
}
