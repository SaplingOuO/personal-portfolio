<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAppStore } from '@/stores/app.js'
import { storeToRefs } from 'pinia'
// --- 1. 響應式數據定義 (Reactive States) ---

/**
 * 彈窗顯示狀態控制
 * 使用 storeToRefs 取得 Pinia 中的狀態，並重新命名為 visible 以對應模板
 */
const appStore = useAppStore()
const { isSettingsOpen: visible } = storeToRefs(appStore)

/**
 * 主題變數配置陣列
 * 將標籤名稱、對應的 CSS 變數 Key 以及目前的顏色數值 (value) 包裝成物件
 * 方便後續透過 v-for 迴圈渲染介面與批次更新樣式
 */
const themeConfig = reactive([
  { label: '品牌主色', key: '--primary-color', value: '#42b883' },
  { label: '網頁背景', key: '--bg-color', value: '#000000' },
  { label: '卡片底色', key: '--card-bg', value: '#1a1a1a' },
  { label: '主文字顏色', key: '--text-primary', value: '#ffffff' },
  { label: '次要文字', key: '--text-secondary', value: '#909399' },
  { label: '邊框顏色', key: '--border-color', value: '#333333' }
])

// 目前選中的預設主題名稱 (下拉選單綁定值)
const selectedPreset = ref('')

// 預定義的主題色組清單
const presets = [
  {
    name: 'Vue 經典 (預設)',
    colors: {
      '--primary-color': '#42b883',
      '--bg-color': '#000000',
      '--card-bg': '#1a1a1a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#909399',
      '--border-color': '#333333'
    }
  },
  {
    name: '海洋深處',
    colors: {
      '--primary-color': '#00d2ff',
      '--bg-color': '#000428',
      '--card-bg': '#004e92',
      '--text-primary': '#e0f7fa',
      '--text-secondary': '#81d4fa',
      '--border-color': '#0288d1'
    }
  },
  {
    name: '復古森林',
    colors: {
      '--primary-color': '#8b4513',
      '--bg-color': '#2e3424',
      '--card-bg': '#3e4a36',
      '--text-primary': '#f0ead6',
      '--text-secondary': '#a9a9a9',
      '--border-color': '#4b5320'
    }
  },
  {
    name: '賽博霓虹',
    colors: {
      '--primary-color': '#f300ff',
      '--bg-color': '#050505',
      '--card-bg': '#1a1a2e',
      '--text-primary': '#00fff2',
      '--text-secondary': '#707070',
      '--border-color': '#2d2d44'
    }
  },
  {
    name: '極致極簡',
    colors: {
      '--primary-color': '#000000',
      '--bg-color': '#f5f5f7',
      '--card-bg': '#ffffff',
      '--text-primary': '#1d1d1f',
      '--text-secondary': '#86868b',
      '--border-color': '#d2d2d7'
    }
  },
  {
    name: '深海航行',
    colors: {
      '--primary-color': '#38b2ac',
      '--bg-color': '#1a202c',
      '--card-bg': '#2d3748',
      '--text-primary': '#edf2f7',
      '--text-secondary': '#a0aec0',
      '--border-color': '#4a5568'
    }
  },
  {
    name: '咖啡烘焙',
    colors: {
      '--primary-color': '#d97706',
      '--bg-color': '#272320',
      '--card-bg': '#36302c',
      '--text-primary': '#fdf8f1',
      '--text-secondary': '#a8a29e',
      '--border-color': '#4c443f'
    }
  },
  {
    name: '暮光紫羅蘭',
    colors: {
      '--primary-color': '#a78bfa',
      '--bg-color': '#1e1b4b',
      '--card-bg': '#312e81',
      '--text-primary': '#eef2ff',
      '--text-secondary': '#94a3b8',
      '--border-color': '#4338ca'
    }
  },
  {
    name: '紅白機',
    colors: {
      '--primary-color': '#B33839',
      '--bg-color': '#EBEAE5',
      '--card-bg': '#F9EBD0',
      '--text-primary': '#EC2008',
      '--text-secondary': '#3E3E46',
      '--border-color': '#350505',
    }
  },
  {
    name: '復古主機',
    colors: {
      '--primary-color': '#2B2B2D',
      '--bg-color': '#c2c0c1',
      '--card-bg': '#767475',
      '--text-primary': '#2C2C2E',
      '--text-secondary': '#2B2B2D',
      '--border-color': '#393738',
    }
  }
]

// --- 2. 主題控制邏輯 (Theme Controller) ---


/**
 * 執行主題預設組切換
 * 根據名稱找到對應的顏色物件，批次更新 themeConfig 並套用到 DOM
 */
const applyPreset = (presetName) => {
  const target = presets.find(p => p.name === presetName)
  if (!target) return

  themeConfig.forEach(item => {
    if (target.colors[item.key]) {
      item.value = target.colors[item.key]
      // 直接修改 HTML 根節點的 CSS Variables 以即時生效
      document.documentElement.style.setProperty(item.key, item.value)
    }
  })

  saveToLocalStorage()
}

/**
 * 個別色彩變動處理 (當使用者操作顏色選擇器時觸發)
 * 更新指定的 CSS 變數，並觸發持久化儲存
 */
const handleColorChange = (item) => {
  if (!item.value) return

  document.documentElement.style.setProperty(item.key, item.value)
  saveToLocalStorage()
}

/**
 * 資料持久化：將目前的顏色配置轉換為鍵值對物件 (Key-Value)
 * 並以 JSON 字串格式儲存於瀏覽器的 LocalStorage 中
 */
const saveToLocalStorage = () => {
  const configToSave = themeConfig.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})
  localStorage.setItem('user-theme-config', JSON.stringify(configToSave))
}

// --- 3. 初始化流程 (Initialization) ---

/**
 * 組件掛載時，嘗試從 LocalStorage 讀取並恢復使用者的自定義主題
 */
onMounted(() => {
  const savedConfig = localStorage.getItem('user-theme-config')
  if (savedConfig) {
    const parsed = JSON.parse(savedConfig)
    themeConfig.forEach(item => {
      if (parsed[item.key]) {
        item.value = parsed[item.key]
        document.documentElement.style.setProperty(item.key, item.value)
      }
    })
  }
})

</script>

<template>
  <el-dialog v-model="visible" title="網頁設定" style="--el-dialog-width: 90%; max-width: 380px" append-to-body class="custom-settings-dialog">

    <div class="settings-content">
      <p class="section-title">快速主題切換</p>
      <div class="preset-section">
        <el-select v-model="selectedPreset" placeholder="選擇預設主題" @change="applyPreset" style="width: 100%;">
          <el-option v-for="preset in presets" :key="preset.name" :label="preset.name" :value="preset.name"  />
        </el-select>
      </div>
    </div>

    <div class="settings-content">
      <p class="section-title">主題色彩設定</p>
      <div v-for="item in themeConfig" :key="item.key" class="setting-item">
        <span class="label">{{ item.label }}</span>
        <div class="color-picker-wrapper">
          <span class="color-hex">{{ item.value }}</span>
          <el-color-picker v-model="item.value" @change="handleColorChange(item)" show-alpha size="small" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
/* 局部組件樣式區 */
.settings-content {
  padding: 5px 10px;
}

.section-title {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.label {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-hex {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 20px 0;
}
</style>

<style>
/* 全域樣式覆蓋區：主要針對 Element Plus 組件進行深度客製化 */

/* 彈窗主體樣式：使用 CSS Variables 實現主題連動 */
.custom-settings-dialog.el-dialog {
  background-color: var(--card-bg) !important;
  border-radius: 16px !important;
  border: 1px solid var(--border-color) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4) !important;
}

.custom-settings-dialog .el-dialog__title {
  color: var(--primary-color) !important;
  font-weight: 800 !important;
  font-size: 1.25rem;
}

/* 選擇器容器樣式：模擬邊框與主題背景 */
.el-select__wrapper {
  background-color: var(--bg-color) !important;
  box-shadow: 0 0 0 1px var(--border-color) inset !important;
}

/* 選擇器文字與佔位符顏色 */
.el-select__placeholder { color: var(--text-primary) !important; }

/* 下拉彈出選單樣式：與卡片主題色保持一致 */
.el-popper.is-light {
  background-color: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
}

/* 選項文字樣式與滑過狀態 (Hover) */
.el-select-dropdown__item { color: var(--text-primary) !important; }
.el-select-dropdown__item.is-hovering { background-color: var(--border-color) !important; }
</style>