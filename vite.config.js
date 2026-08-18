import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const MINI_SRC = resolve('src/assets/mini')
const MINI_PUBLIC = resolve('public/images/mini')

/** src/assets/mini/*.png → public/images/mini/ 자동 복사 */
function syncMiniImagesPlugin() {
  const sync = () => {
    if (!existsSync(MINI_SRC)) return
    mkdirSync(MINI_PUBLIC, { recursive: true })
    for (const file of readdirSync(MINI_SRC)) {
      if (/\.png$/i.test(file)) {
        cpSync(resolve(MINI_SRC, file), resolve(MINI_PUBLIC, file))
      }
    }
  }

  return {
    name: 'sync-mini-images',
    buildStart: sync,
    configureServer(server) {
      sync()
      server.watcher.add(MINI_SRC)
      server.watcher.on('change', (file) => {
        if (file.replace(/\\/g, '/').includes('assets/mini') && /\.png$/i.test(file)) {
          sync()
        }
      })
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (url.includes('/mini/') && /\.png$/i.test(url)) {
          res.setHeader('Cache-Control', 'no-store')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), syncMiniImagesPlugin()],
  base: '/',
  publicDir: 'public',
  server: {
    host: true,
    watch: {
      ignored: ['**/public/videos/**'],
    },
  },
})
