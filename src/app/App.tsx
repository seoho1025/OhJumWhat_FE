import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import { ROUTES } from '../shared/config'
import { createQueryClient } from './queryClient.ts'
import { router } from './router.tsx'

const queryClient = createQueryClient(() => {
  if (router.state.location.pathname !== ROUTES.login) {
    void router.navigate(ROUTES.login, { replace: true })
  }
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
