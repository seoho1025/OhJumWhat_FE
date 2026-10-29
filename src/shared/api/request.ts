// 백엔드 규칙(세션 쿠키, CSRF, 오류 형식)은 docs/API.md "공통"

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: Method
  /** 객체는 JSON으로, FormData(파일 업로드)는 그대로 보낸다 */
  body?: unknown
}

const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

// 401은 본문이 없고, Spring 기본 오류는 message가 없어서 상태 코드로 문구를 정한다
const UNAUTHORIZED_MESSAGE = '로그인이 필요해요.'
const FALLBACK_MESSAGE = '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.'

export async function request<T>(path: string, { method = 'GET', body }: RequestOptions = {}): Promise<T> {
  const isForm = body instanceof FormData
  const headers: Record<string, string> = { Accept: 'application/json' }

  // FormData는 브라우저가 boundary가 든 Content-Type을 직접 붙인다
  if (body !== undefined && !isForm) {
    headers['Content-Type'] = 'application/json'
  }

  if (method !== 'GET') {
    const token = readCookie(CSRF_COOKIE)
    if (token) {
      headers[CSRF_HEADER] = token
    }
  }

  const res = await fetch(path, {
    method,
    headers,
    credentials: 'include',
    body: toRequestBody(body, isForm),
  })

  if (!res.ok) {
    throw new ApiError(res.status, await readErrorMessage(res))
  }

  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as T
}

function toRequestBody(body: unknown, isForm: boolean): BodyInit | undefined {
  if (body === undefined) {
    return undefined
  }
  if (isForm) {
    return body as FormData
  }
  return JSON.stringify(body)
}

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`
  const found = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix))
  return found ? decodeURIComponent(found.slice(prefix.length)) : undefined
}

async function readErrorMessage(res: Response): Promise<string> {
  if (res.status === 401) {
    return UNAUTHORIZED_MESSAGE
  }
  try {
    const data: unknown = await res.json()
    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
      return data.message
    }
  } catch {
    // 본문이 JSON이 아니면 기본 문구
  }
  return FALLBACK_MESSAGE
}
