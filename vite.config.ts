import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

/**
 * Godot 4 exporta builds Web que usam SharedArrayBuffer (threads).
 * Para o navegador liberar SharedArrayBuffer a página precisa estar em
 * "cross-origin isolation", o que exige estes dois cabeçalhos.
 *
 * Este plugin aplica os cabeçalhos no servidor de desenvolvimento.
 * Em produção eles vêm de `vercel.json` / `netlify.toml` / `public/_headers`.
 *
 * Se a sua exportação do Godot for SEM threads, você pode remover isto
 * (e os arquivos de deploy) — veja o README.
 */
function crossOriginIsolation(): Plugin {
  return {
    name: 'cross-origin-isolation',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), crossOriginIsolation()],
  server: {
    host: true,
    port: 5173,
  },
})
