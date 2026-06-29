import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 快捷鍵功能，用@符號直接指向src資料夾
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 部署路徑
  base: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '/',
})
