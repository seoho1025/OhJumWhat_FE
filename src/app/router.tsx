import { createBrowserRouter } from 'react-router'
import { LandingPage } from '../pages/landing'
import { ROUTES } from '../shared/config'

const routeError = <p role="alert">문제가 생겼어요. 새로고침해 주세요.</p>

// shortcut: 로그인한 사용자도 / 에서 랜딩을 봄, entities/user(내 정보)를 만들면 로그인 상태 분기 추가
export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <LandingPage />,
    errorElement: routeError,
  },
  {
    path: ROUTES.login,
    element: <LandingPage />,
    errorElement: routeError,
  },
  {
    path: '*',
    element: <p>페이지를 찾을 수 없어요.</p>,
  },
])
