import { createBrowserRouter } from 'react-router'
import { ROUTES } from '../shared/config'

// shortcut: 페이지 슬라이스가 없어 임시 화면, pages를 만들면 교체
export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <div>OhJumWhat</div>,
    errorElement: <p role="alert">문제가 생겼어요. 새로고침해 주세요.</p>,
  },
  {
    path: '*',
    element: <p>페이지를 찾을 수 없어요.</p>,
  },
])
