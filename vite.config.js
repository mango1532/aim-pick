import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** public/images/mini/*.jfif — Vite가 Content-Type을 비워 두는 문제 보정 */
function jfifMimePlugin() {
  const fixJfifContentType = (req, res, next) => {
    if (req.url && /\.jfif(?:\?|$)/i.test(req.url.split('?')[0])) {
      const originalSetHeader = res.setHeader.bind(res)
      res.setHeader = (name, value) => {
        if (String(name).toLowerCase() === 'content-type' && !value) {
          return originalSetHeader('Content-Type', 'image/jpeg')
        }
        return originalSetHeader(name, value)
      }
    }
    next()
  }

  return {
    name: 'jfif-mime',
    configureServer(server) {
      server.middlewares.use(fixJfifContentType)
    },
    configurePreviewServer(server) {
      server.middlewares.use(fixJfifContentType)
    },
  }
}

export default defineConfig({
  plugins: [react(), jfifMimePlugin()],
  base: '/',
  assetsInclude: ['**/*.jfif', '**/*.JFIF'],
  publicDir: 'public',
  server: {
    host: true,
    watch: {
      // Windows에서 mp4 파일 잠금(EBUSY)으로 서버가 종료되는 것 방지
      ignored: ['**/public/videos/**'],
    },
  },
})
