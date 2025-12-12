<div align="center">

<img src=".github/assets/banner-dark.svg" height="100" alt="logo" />

<br />
<br />

<b>EasyEditor 官方物料库</b>

[![GitHub License](https://img.shields.io/github/license/Easy-Editor/EasyMaterials)](./LICENSE)

[English](./README.md) | 简体中文

</div>

EasyMaterials 是 EasyEditor 的官方物料库，提供丰富的开箱即用物料，用于构建低代码应用。包含大屏可视化组件、表单组件等，所有物料都经过精心设计，与 EasyEditor 和 EasyDashboard 无缝集成。

## 🎯 特性

- **🎨 丰富组件**：覆盖大屏和表单的常见场景
- **📦 按需加载**：支持从 CDN 动态加载，减小包体积
- **🔧 高度可配**：所有组件提供丰富的配置选项
- **🎭 主题支持**：内置多套主题，支持自定义主题
- **📱 响应式设计**：自适应不同屏幕尺寸
- **🌐 国际化**：支持多语言
- **♿ 无障碍**：遵循 WCAG 2.1 AA 标准
- **📊 数据绑定**：与 EasyEditor 的数据源管理无缝集成

## 🏗️ 开发

### 环境要求

- node >= 18.0.0
- pnpm >= 9.12.2

### 安装依赖

```bash
git clone git@github.com:Easy-Editor/EasyMaterials.git
cd EasyMaterials
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 预览特定物料
pnpm dev:dashboard-bar-chart
```

### 创建新物料

```bash
# 生成物料模板
pnpm create:material

# 按照提示输入：
# - 物料类型（dashboard/form）
# - 物料名称
# - 描述信息
```

## 📦 生态系统

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - 插件化低代码引擎
- [EasyDashboard](https://github.com/Easy-Editor/EasyDashboard) - 大屏构建器
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - 官方物料库（本仓库）

## 📄 许可证

[MIT](./LICENSE) License &copy; 2025-PRESENT [Easy-Editor Team](https://github.com/Easy-Editor)
