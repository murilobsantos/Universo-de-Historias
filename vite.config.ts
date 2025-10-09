import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // o caminho base deve ser "/" se estiver usando domínio Netlify direto
})
