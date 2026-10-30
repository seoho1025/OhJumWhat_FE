export const LOGIN_ERROR_MESSAGES = {
  blocked: '이용이 제한된 계정이에요. 문의가 필요하면 운영팀에 알려 주세요.',
  default: '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.',
} as const

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
