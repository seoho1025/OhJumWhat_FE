// 랜딩 문구, 1차 초안 (D-024)

export const HERO = {
  title: ['오늘 점심,', '투표로 정해요'],
  description: '메뉴 고민은 팀이 함께, 결정은 3분 안에',
  cta: '구글로 시작하기',
} as const

export const MENU_SECTION = {
  title: ['어떤 메뉴든', '한 번에 투표로'],
  cards: [
    { label: 'Korean', name: '한식' },
    { label: 'Chinese', name: '중식' },
    { label: 'Japanese', name: '일식' },
    { label: 'Snack', name: '분식' },
    { label: 'Salad', name: '샐러드' },
  ],
} as const

export const STEP_SECTION = {
  title: '어떻게 쓰나요?',
  steps: [
    { title: ['팀을 만들고', '동료를 초대하세요'], description: '초대 링크 하나로 같은 팀이 돼요.' },
    { title: ['먹고 싶은 메뉴를', '올리세요'], description: '근처 식당을 찾아 메뉴에 연결할 수 있어요.' },
    { title: ['투표하고', '이야기 나누세요'], description: '투표하면서 채팅으로 의견을 모아요.' },
    { title: ['마감되면', '오늘 점심 결정'], description: '쌓인 기록으로 우리 팀 메뉴 통계를 볼 수 있어요.' },
  ],
} as const

export const FINAL_CTA = {
  title: ['내일 점심부터', '같이 정해요'],
  cta: '구글로 시작하기',
} as const

export const LOGIN_ERROR_MESSAGES = {
  blocked: '이용이 제한된 계정이에요. 문의가 필요하면 운영팀에 알려 주세요.',
  default: '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.',
} as const
