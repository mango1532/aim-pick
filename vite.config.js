import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true,
    watch: {
      // Windows에서 mp4 파일 잠금(EBUSY)으로 서버가 종료되는 것 방지
      ignored: ['**/public/videos/**'],
    },
  },
})
