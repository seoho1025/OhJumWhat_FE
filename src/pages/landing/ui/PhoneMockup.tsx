import { Badge, buttonStyle } from '../../../shared/ui'
import * as css from './phoneMockup.css.ts'

// 실제 투표 화면을 줄여 보여 주는 그림, 누를 수 없어 버튼도 div
const OPTIONS = [
  { name: '김치찌개', votes: 5, bar: 'first' },
  { name: '돈가스', votes: 2, bar: 'second' },
  { name: '쌀국수', votes: 1, bar: 'third' },
] as const

export function PhoneMockup() {
  return (
    <div className={css.window} role="img" aria-label="오점왓 투표 화면 예시: 오늘 점심 투표에서 김치찌개가 5표로 1등">
      <div className={css.phone}>
        <div className={css.screen}>
          <div className={css.topRow}>
            <span className={css.team}>점심팟</span>
            <Badge variant="weak" size="small" color="primary">
              진행 중
            </Badge>
          </div>
          <div className={css.card}>
            <span className={css.title}>오늘 점심 뭐 먹지?</span>
            <span className={css.meta}>11:30 마감 · 8명 참여</span>
            {OPTIONS.map((option) => (
              <div key={option.name} className={css.option}>
                <div className={css.optionRow}>
                  <span>{option.name}</span>
                  <span className={css.count}>{option.votes}표</span>
                </div>
                <div className={css.track}>
                  <div className={css.bar[option.bar]} />
                </div>
              </div>
            ))}
          </div>
          <div className={buttonStyle({ size: 'large', display: 'full' })}>투표하기</div>
        </div>
      </div>
    </div>
  )
}
