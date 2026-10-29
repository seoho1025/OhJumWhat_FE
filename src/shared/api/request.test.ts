import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, request } from './request.ts'

function mockFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function headersOf(fetchMock: ReturnType<typeof vi.fn>): Record<string, string> {
  return fetchMock.mock.calls[0][1].headers
}

describe('request', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('GET이 아닌 요청에 XSRF-TOKEN 쿠키 값을 헤더로 붙이고 쿠키를 함께 보낸다', async () => {
    vi.stubGlobal('document', { cookie: 'SESSION=abc; XSRF-TOKEN=token%3D1' })
    const fetchMock = mockFetch(new Response(JSON.stringify({ id: 1 }), { status: 201 }))

    const data = await request<{ id: number }>('/api/orgs', { method: 'POST', body: { name: '점심팟' } })

    expect(data).toEqual({ id: 1 })
    expect(headersOf(fetchMock)['X-XSRF-TOKEN']).toBe('token=1')
    expect(headersOf(fetchMock)['Content-Type']).toBe('application/json')
    expect(fetchMock.mock.calls[0][1].credentials).toBe('include')
  })

  it('GET에는 CSRF 헤더를 붙이지 않는다', async () => {
    vi.stubGlobal('document', { cookie: 'XSRF-TOKEN=t' })
    const fetchMock = mockFetch(new Response('{}'))

    await request('/api/me')

    expect(headersOf(fetchMock)['X-XSRF-TOKEN']).toBeUndefined()
  })

  it('204처럼 본문이 없으면 undefined를 돌려준다', async () => {
    vi.stubGlobal('document', { cookie: '' })
    mockFetch(new Response(null, { status: 204 }))

    await expect(request('/logout', { method: 'POST' })).resolves.toBeUndefined()
  })

  it.each([
    ['서버 문구', new Response(JSON.stringify({ message: '마감된 투표예요.' }), { status: 409 }), 409, '마감된 투표예요.'],
    ['401 본문 없음', new Response(null, { status: 401 }), 401, '로그인이 필요해요.'],
    [
      'Spring 기본 형식',
      new Response(JSON.stringify({ status: 404, error: 'Not Found' }), { status: 404 }),
      404,
      '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.',
    ],
  ])('오류(%s)를 ApiError(status, message)로 바꾼다', async (_, response, status, message) => {
    mockFetch(response)

    const error = await request('/api/x').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status, message })
  })
})
