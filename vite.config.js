import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       // 快捷鍵功能，用@符號直接指向src資料夾
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   // 部署路徑
//   base: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '/',
// })

/* 
  在 Vite 的世界裡，預設是「不支援」 process.env 的（那是舊版 Webpack / Vue CLI 在用的）。
  當你在 GitHub Actions 執行打包（build）時，Vite 抓不到 process.env.NODE_ENV，它會變成 undefined。
  這會導致三元運算子判定失敗，打包出來的 base 直接套用後面的 '/'，而不是你的 /personal-portfolio/。
*/

export default defineConfig(({ command }) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        // 快捷鍵功能，用@符號直接指向src資料夾
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 部署路徑：如果是 build (代表上傳生產環境)，就用倉庫名稱，否則用本地端根目錄
    base: command === 'build' ? '/personal-portfolio/' : '/',
  }
})