# Slidev Workspace

一個用於管理多個 Slidev 演示文稿的工作區工具，提供類似 Contentful API 的內容管理介面。

## 功能特色

✨ **自動發現 Slides**: 自動掃描配置目錄中的所有 Slidev 演示文稿  
🔍 **智慧搜尋**: 支援按標題、描述、作者和主題搜尋  
📊 **Frontmatter 解析**: 完整解析每個 slide 的 YAML frontmatter  
🌐 **類 Contentful API**: 提供結構化的 API 介面來存取 slides  
🎨 **現代介面**: 使用 Vue 3 + Tailwind CSS 的響應式介面  
🔥 **熱重載**: 開發時自動檢測 slides 變更

## 安裝和使用

### 1. 基本使用

```bash
# 開發模式
pnpm run slidev-workspace:dev

# 建置
pnpm run slidev-workspace:build
```

### 2. CLI 工具 (計劃中)

```bash
# 全域安裝後
slidev-workspace dev
slidev-workspace build
```

## 配置

在專案根目錄創建 `slidev-workspace.yml` 來配置 slides 來源：

```yaml
# Slidev Workspace 配置
slidesDir:
  - "../../demo/slides"    # 相對路徑到 slides 目錄
  - "./slides"             # 本地 slides 目錄

outputDir: "./slide-decks/dist"
baseUrl: "/"

exclude:
  - "node_modules"
  - ".git"
  - ".DS_Store"
```

## API 介面

### 基本 API

```typescript
import { slidesApi } from '@/composables/useSlidesApi'

// 獲取所有 slides
const { data: slides } = await slidesApi.getEntries()

// 搜尋 slides
const results = await slidesApi.getEntries({ 
  search: 'Vue.js',
  theme: 'seriph',
  limit: 10 
})

// 獲取特定 slide
const { data: slide } = await slidesApi.getEntry('slides/my-presentation')
```

### 響應式查詢

```vue
<script setup>
import { ref } from 'vue'
import { slidesApi } from '@/composables/useSlidesApi'

const searchOptions = ref({
  search: '',
  theme: 'seriph',
  sort: 'title'
})

// 即時搜尋結果
const slides = slidesApi.createLiveQuery(searchOptions)
</script>
```

## 專案結構

```
packages/slidev-workspace/
├── scripts/                 # 核心腳本
│   ├── config.ts           # 配置管理
│   ├── getSlideFrontmatter.ts # Slides 解析
│   └── vite-plugin-slides.ts # Vite 插件
├── slide-decks/            # Vue 應用
│   ├── src/
│   │   ├── components/     # UI 組件
│   │   ├── composables/    # API 邏輯
│   │   └── utils/         # 工具函數
│   └── package.json
├── src/                    # 庫匯出
│   ├── index.ts           # 主要匯出
│   └── cli.ts             # CLI 工具
└── slidev-workspace.yml    # 配置檔案
```

## 測試

```bash
# 測試核心功能
npx tsx test-slides.js

# 預期輸出
🔍 Testing Slidev Workspace functionality...
📁 Loading slides...
✅ Found 2 slides:

1. Welcome to Slidev
   ID: slides/slidev-starter-1
   Source: /Users/.../demo/slides
   Theme: seriph
```

## 開發

這個工具是基於以下技術棧開發：

- **後端**: Node.js + TypeScript
- **前端**: Vue 3 + Composition API
- **樣式**: Tailwind CSS
- **建置**: Vite + tsdown
- **包管理**: pnpm workspace

## 貢獻

歡迎提交 Issues 和 Pull Requests！

## 許可證

MIT License
