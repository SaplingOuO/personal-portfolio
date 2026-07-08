# 🚀 My Portfolio 2026

這是一個基於 **Vue 3 (Composition API)** 開發的個人作品集網站。本專案不僅展示了我的前端開發技術，也實踐了動態視覺與模組化開發的思維。

## 🛠️ 技術棧 (Tech Stack)

* **核心框架**: [Vue 3](https://vuejs.org/) - 採用最新 Composition API，建構高性能、響應式的現代化組件。
* **構建工具**: [Vite](https://cn.vite.dev/guide/) - 提供極速的 HMR 熱更新與優化的生產環境打包體驗。
* **狀態管理**: [Pinia](https://pinia.vuejs.org/) - 負責全域狀態與資料存取。
* **路由管理**: [Vue Router](https://router.vuejs.org/) - 實現單頁應用 (SPA) 流暢導航。
* **動態特效**: [GSAP](https://greensock.com/gsap/) - 處理高品質的進場動畫與交錯視覺效果。
* **UI 組件庫**: [Element Plus](https://element-plus.org/) - 提供標準化且美觀的基礎組件。

---

## 🛠️ 技術實作與開發亮點

### 🎨 全域動態主題系統
- **解耦合狀態管理**：透過 Pinia 管理全域色彩狀態，並即時注入 CSS 變數，實現無需重新整理頁面的主題切換。
- **數據持久化**：結合 LocalStorage 自動存取使用者偏好，確保使用者再次造訪時維持一致的視覺體驗。
- **深度 UI 客製化**：針對 Element Plus 進行 Scoped CSS 樣式覆蓋，打造獨具質感的風格一致性。

### 🎬 高階動態視覺 
- **精準序列動畫**：捨棄傳統 CSS Transition，改用 GSAP Timeline 管理複雜的進場順序，提升頁面跳轉時的流暢度與層次感。
- **效能驅動動畫**：實作 `stagger` 交錯效果與 `clearProps` 屬性清除，確保動畫結束後不留冗餘樣式，維持響應式佈局的穩定性。

### 🏗️ 模組化架構與效能優化
- **高效能數據處理**：利用 `Computed` 屬性實作即時篩選邏輯，將「資料處理」與「視圖渲染」徹底分離，確保在多專案展示下依然反應靈敏。
- **加載速度優化**：實作 **路由懶加載 (Lazy Loading)** 與 **Scroll Behavior**，優化首屏加載效能並提供平滑的導航體驗。
- **自動化部署流程**：腳本串接 Git 命令，將開發到部署的流程自動化，模擬真實開發中的 CI/CD 環境。

---

## 📂 專案目錄結構 (Project Structure)

```
src/ 
├── api/        # 🛠️ 外部對接：專案 fetch 或 axios 的請求邏輯封裝
├── assets/     # 🎨 靜態資源：存放圖片、SVG 以及全域 CSS 樣式表 (variables.css)
├── components/ # 🧩 零件庫：存放「可重複使用」的小組件
│   ├── common/ # 通用組件 (如：AppNavbar, AppFooter) 
│   └── ui/     # 基礎 UI 組件 (如：自定義 Card, Button)
├── views/      # 🖼️ 頁面主體：存放路由對應的大頁面 (HomeView, ProjectsView, AboutView)
├── router/     # 🛣️ 導航地圖：存放 index.js 路由設定
├── stores/     # 🗃️ 資料倉庫：存放 Pinia 的狀態管理模組
├── utils/      # 🧰 工具箱：存放純 JavaScript 工具函式 (如：日期處理)
├── App.vue     # 🏠 根組件：所有頁面的入口
└── main.js     # 🚀 啟動點：初始化 Vue、引入外掛與樣式
```