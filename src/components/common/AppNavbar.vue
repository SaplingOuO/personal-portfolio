<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import SettingsDialog from './SettingsDialog.vue'

const router = useRouter()
const appStore = useAppStore()
const menuRef = ref(null)

// 處理選單點擊跳轉
const handleSelect = (key) => {
  // 特殊指令：若點選設定圖標，則透過 Pinia 開啟設定彈窗並中斷跳轉
  // handleSelect 判斷key為'OPEN_SETTINGS'時使用stores/app/app.js中 toggleSettings 方法
  if (key === 'OPEN_SETTINGS') {
    appStore.toggleSettings(true)
    return; // 這裡用 return 是為了中斷後續的 router.push
  }
  // 常規路由：若 key 為有效路徑，則執行頁面跳轉 (如首頁、作品集等)
  if (key) {
    router.push(key).catch(() => { });
  }
}

// 2. 建立一個對應組件實例的 ref
const settingsControl = ref(null)
// 3. 建立觸發函式
const openSettings = () => {
  if (settingsControl.value) {
    settingsControl.value.open() // 呼叫子組件暴露出來的 open 方法
  }
}

</script>

<template>
  <el-menu 
    :default-active="router.currentRoute.value.path" 
    class="navbar-menu" 
    mode="horizontal" 
    :ellipsis="false"
    background-color="var(--bg-color)" 
    text-color="var(--text-primary)" 
    active-text-color="var(--primary-color)"
    @select="handleSelect"
  >
    <div class="logo-container" @click="router.push('/')">
      <span class="logo-text">Sapling<span class="dot">.</span></span>
    </div>

    <div class="flex-grow"></div>

    <el-menu-item index="/" class="hidden-xs-only">首頁</el-menu-item>
    <el-menu-item index="/projects" class="hidden-xs-only">作品集</el-menu-item>
    <el-menu-item index="/about" class="hidden-xs-only">關於我</el-menu-item>
    <el-menu-item index="OPEN_SETTINGS" class="setting-trigger hidden-xs-only">
      <el-icon style="font-size: 1.2rem; cursor: pointer; margin: 0px; ">
        <Setting />
      </el-icon>
    </el-menu-item>

    <el-sub-menu index="mobile-menu" class="hidden-sm-and-up mobile-submenu-trigger" popper-class="mobile-custom-popper">
      <template #title>
        <span>導覽選單</span>
      </template>
      <el-menu-item index="/">首頁</el-menu-item>
      <el-menu-item index="/projects">作品集</el-menu-item>
      <el-menu-item index="/about">關於我</el-menu-item>
      <el-menu-item index="OPEN_SETTINGS" class="setting-trigger">
        <el-icon style="font-size: 1.2rem; cursor: pointer; margin: 0px; ">
          <Setting />
        </el-icon>
      </el-menu-item>
    </el-sub-menu>

  </el-menu>
  
  <SettingsDialog ref="settingsControl" />
</template>

<style scoped>
.navbar-menu {
  padding: 0 2rem;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  /* 使用變數控制底部邊框顏色 */
  border-bottom: 1px solid var(--border-color);
}

.logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  /* Logo 文字顏色 */
  color: var(--text-primary);
}

.dot {
  color: var(--primary-color);
}

.flex-grow {
  flex-grow: 1;
}

.el-menu-item:focus {
  background-color: none;
}

/* 確保選中狀態的底線顏色正確 */
:deep(.el-menu-item.is-active) {
  border-bottom-color: var(--primary-color) !important;
  background-color: transparent !important;
}

/* 移除滑過時的預設背景色，保持乾淨 */
:deep(.el-menu-item:hover) {
  background-color: var(--card-bg) !important;
}
</style>

<style>
.mobile-custom-popper .el-menu--popup {
  min-width: 100px !important;
  width: 100px !important;
}
</style>