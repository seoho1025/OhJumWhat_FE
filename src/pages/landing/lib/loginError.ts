import { LOGIN_ERROR_MESSAGES } from '../config/content.ts'

// 백엔드가 로그인 실패 시 /login?error, 차단 계정은 /login?error=blocked 로 보냄 (docs/API.md)
export function loginErrorMessage(error: string | null): string | undefined {
  if (error === null) {
    return undefined
  }
  if (error === 'blocked') {
    return LOGIN_ERROR_MESSAGES.blocked
  }
  return LOGIN_ERROR_MESSAGES.default
}
