export const ROUTES = {
  home: '/',
  login: '/login',
} as const

// 로그인은 API가 아니라 페이지 이동, 백엔드가 구글을 거쳐 / 로 돌려보냄 (docs/API.md)
export const GOOGLE_LOGIN_PATH = '/oauth2/authorization/google'
