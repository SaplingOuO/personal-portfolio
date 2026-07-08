<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'

// 作品資料陣列 (整合你的履歷)
const projects = ref([
  {
    id: 1,
    title: '作品集網站-v1.23',
    category: 'Web',
    tech: ['Vue 2', 'Vue CLI', 'BootStrap 5', 'Dreamweaver'],
    desc: '自學Vue使用Vue CLI建立的網站，並使用Dreamweaver編輯器做為學習工具。',
    link: 'https://saplingouo.github.io/portfolio-2023/',
    img: './image/portfolio-v1.23.gif'
  },
  {
    id: 2,
    title: '作品集網站-v1.24',
    category: 'Web',
    tech: ['Vue 3', 'Vue CLI', 'BootStrap 5', 'Visual Studio Code'],
    desc: '將編輯器改為使用VS Code，並且學習Three.js、Python、GitHub...等技術。',
    link: 'https://saplingouo.github.io/portfolio-2024/',
    img: './image/portfolio-v1.24.gif'
  },
  {
    id: 3,
    title: '作品集網站-v1.25',
    category: 'Web',
    tech: ['Vue 3', 'Vite', 'BootStrap 5', 'GSAP', 'Three.js', 'Firebase'],
    desc: '建構工具更該為Vite，學習使用Firebase製作使用者登入並導入anilist API讓使用者查詢後加入最愛功能。',
    link: 'https://saplingouo.github.io/portfolio-2025/',
    img: './image/portfolio-v1.25.gif'
  },
  {
    id: 4,
    title: 'ACG 動態資料抓取工具',
    category: 'Tools',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'Regex', 'JSON'],
    desc: '開發自動化爬蟲腳本，從ACG平台抓取最新動畫資訊。自動合併舊資料、按上映日期排序及圖片格式統一處理等功能。',
    link: 'https://github.com/SaplingOuO/acg-scraper-tool',
    img: './image/acg-scraper-tool.gif'
  },
  {
    id: 5,
    title: '動漫紀錄庫-bootstrap5', 
    category: 'Web',
    tech: ['Vue 3', 'Webpack', 'Bootstrap 5'], 
    desc: '採用 Webpack 搭配 Bootstrap 5 打造，建立應用初始架構，實作個人動漫紀錄與基礎響應式佈局。',
    link: 'https://saplingouo.github.io/animerecord-bootstrap5/',
    img: './image/animerecord-bootstrap5.gif'
  },
  {
    id: 6,
    title: '動漫紀錄庫-vite', 
    category: 'Web',
    tech: ['Vue 3', 'Vite 6', 'Pinia 3', 'Bootstrap 5', 'Axios'],
    desc: '全面重構為 Vite 與 Pinia，串接線上即時 Jikan API，並實作空陣列容錯機制以防網頁崩潰。',
    link: 'https://saplingouo.github.io/animerecord-vite/#/Home',
    img: './image/animerecord-vite.gif'
  },
  {
    id: 7,
    title: '動漫紀錄庫-gsap', 
    category: 'Web',
    tech: ['Vue 3', 'Vite', 'GSAP 3', 'Three.js', 'YouTube API', 'Axios'],
    desc: '實驗 GSAP 物理吸附與拉動特效，整合 YouTube API 並設計台灣區域鎖定之影音自動降級防禦機制。',
    link: 'https://saplingouo.github.io/animerecord-gsap/',
    img: './image/animerecord-gsap.png'
  }
])

// 篩選功能
const currentTab = ref('All')
const categories = ['All', 'Web', 'Tools']

// computed 特性:響應式、快取、唯讀性
const filteredProjects = computed(() => {
  // 如果是'All'回傳所有的作品
  if (currentTab.value === 'All') return projects.value
  // 如果是特定分類則使用 filter 篩選
  // 回傳選中的 currentTab.value 內容的給 p.category 回傳
  return projects.value.filter(p => p.category === currentTab.value)
})

// 網址導向
const goToProject = (url) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  } else {
    // 可以加入提示，告訴使用者這個專案暫時沒有連結
    console.warn("此專案暫未提供外部連結")
  }
}

// 進場動畫
onMounted(() => {
  gsap.from('.project-header', { y: -30, opacity: 0, duration: 1 })
  gsap.from('.project-card', {
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: "all"
  })
})
</script>

<template>
  <div class="projects-container">
    <div class="project-header">
      <h2 class="section-title">我的作品 <span class="text-vue">Showcase</span></h2>
      <p class="section-desc">從 Android 原生開發到現代 Web 互動設計，記錄我的開發成長歷程。</p>

      <div class="filter-group">
        <el-radio-group v-model="currentTab" size="large">
          <el-radio-button v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <el-row :gutter="30" class="project-grid">
      <el-col :xs="24" :sm="12" :md="8" v-for="project in filteredProjects" :key="project.id">
        <el-card class="project-card" :body-style="{ padding: '0px' }" shadow="hover">
          <div class="card-image-wrapper">
            <img :src="project.img" class="project-image" />
            <div class="image-overlay">
              <el-button type="primary" round @click="goToProject(project.link)">
                查看專案
              </el-button>
            </div>
          </div>

          <div class="card-content">
            <div class="card-meta">
              <el-tag size="small" effect="plain">{{ project.category }}</el-tag>
              <div class="tech-tags">
                <span v-for="t in project.tech" :key="t" class="tech-dot">#{{ t }}</span>
              </div>
            </div>
            <h4 class="card-title">{{ project.title }}</h4>
            <p class="card-desc">{{ project.desc }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.projects-container {
  padding: 60px 20px;
}

.project-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--text-primary);
}

.text-vue {
  color: var(--primary-color);
}

.section-desc {
  color: var(--text-secondary);
  margin-top: 10px;
}

.filter-group {
  margin-top: 30px;
}

/* 覆蓋 Element Plus Radio Button 樣式 */
:deep(.el-radio-button__inner) {
  background-color: var(--card-bg);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.project-grid {
  max-width: 1200px;
  margin: 0 auto !important;
}

.project-card {
  background-color: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.card-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-image-wrapper:hover .image-overlay {
  opacity: 1;
}

.card-content {
  padding: 20px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tech-tags {
  font-size: 0.75rem;
  color: var(--primary-color);
}

.tech-dot {
  margin-left: 8px;
}

.card-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>