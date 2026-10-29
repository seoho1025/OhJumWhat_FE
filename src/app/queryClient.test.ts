import { describe, expect, it } from 'vitest'
import { ApiError } from '../shared/api'
import { shouldRetry } from './queryClient.ts'

describe('shouldRetry', () => {
  it.each([400, 401, 403, 404, 409, 423])('%i은 다시 시도하지 않는다', (status) => {
    expect(shouldRetry(0, new ApiError(status, ''))).toBe(false)
  })

  it('5xx와 네트워크 오류는 한 번만 다시 시도한다', () => {
    expect(shouldRetry(0, new ApiError(503, ''))).toBe(true)
    expect(shouldRetry(0, new TypeError('Failed to fetch'))).toBe(true)
    expect(shouldRetry(1, new ApiError(503, ''))).toBe(false)
  })
})
