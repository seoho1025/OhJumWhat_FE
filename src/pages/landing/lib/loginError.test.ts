import { describe, expect, it } from 'vitest'
import { LOGIN_ERROR_MESSAGES } from '../config/content.ts'
import { loginErrorMessage } from './loginError.ts'

describe('loginErrorMessage', () => {
  it('error 쿼리가 없으면 문구를 보여 주지 않는다', () => {
    expect(loginErrorMessage(null)).toBeUndefined()
  })

  it('blocked는 차단 문구, 그 밖의 값(빈 값 포함)은 기본 문구', () => {
    expect(loginErrorMessage('blocked')).toBe(LOGIN_ERROR_MESSAGES.blocked)
    expect(loginErrorMessage('')).toBe(LOGIN_ERROR_MESSAGES.default)
  })
})
