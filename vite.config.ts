import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { API_PROXY_TARGET } = loadEnv(mode, process.cwd(), '')
  // 백엔드는 같은 출처만 받는다. Host 헤더를 유지해 구글 로그인 리디렉션이 프론트 주소 기준으로 만들어지게 한다.
  const backend = { target: API_PROXY_TARGET, changeOrigin: false }

  return {
    plugins: [react(), vanillaExtractPlugin()],
    server: {
      proxy: API_PROXY_TARGET
        ? {
            // 투표 채팅(WebSocket /api/polls/{id}/ws)도 같은 경로로 넘긴다.
            '/api': { ...backend, ws: true },
            '/oauth2': backend,
            '/login/oauth2': backend,
            '/logout': backend,
          }
        : undefined,
    },
  }
})
