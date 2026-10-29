import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '../shared/api'

const MAX_RETRY = 1

/** 4xx는 다시 보내도 결과가 같아서 5xx, 네트워크 오류만 다시 시도 */
export function shouldRetry(failureCount: number, error: unknown): boolean {
  if (error instanceof ApiError && error.status < 500) {
    return false
  }
  return failureCount < MAX_RETRY
}

function isUnauthorized(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401
}

/** 401은 어느 요청에서 나든 로그인이 끝난 것이라 한곳에서 처리 */
export function createQueryClient(onUnauthorized: () => void): QueryClient {
  const handleError = (error: unknown) => {
    if (isUnauthorized(error)) {
      onUnauthorized()
    }
  }

  return new QueryClient({
    queryCache: new QueryCache({ onError: handleError }),
    mutationCache: new MutationCache({ onError: handleError }),
    defaultOptions: {
      queries: { retry: shouldRetry },
    },
  })
}
