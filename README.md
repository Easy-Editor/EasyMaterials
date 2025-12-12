<div align="center">

<img src=".github/assets/banner-dark.svg" height="100" alt="logo" />

<br />
<br />

<b>Official materials library for EasyEditor</b>

[![GitHub License](https://img.shields.io/github/license/Easy-Editor/EasyMaterials)](./LICENSE)

English | [简体中文](./README-zh_CN.md)

</div>

EasyMaterials is the official materials library for EasyEditor, providing a rich set of out-of-the-box materials for building low-code applications. It includes dashboard visualization components, form components, and more, all designed to seamlessly integrate with EasyEditor and EasyDashboard.

## 🎯 Features

- **🎨 Rich Components**: Covers common scenarios for dashboards and forms
- **📦 On-Demand Loading**: Support dynamic loading from CDN, reducing bundle size
- **🔧 Highly Configurable**: All components provide rich configuration options
- **🎭 Theme Support**: Built-in multiple themes, support custom themes
- **📱 Responsive Design**: Adaptive to different screen sizes
- **🌐 Internationalization**: Support multiple languages
- **♿ Accessibility**: Follow WCAG 2.1 AA standards
- **📊 Data Binding**: Seamless integration with EasyEditor's data source management

## 🏗️ Development

### Environment Requirements

- node >= 18.0.0
- pnpm >= 9.12.2

### Setup

```bash
git clone git@github.com:Easy-Editor/EasyMaterials.git
cd EasyMaterials
pnpm install
```

### Development Commands

```bash
# Start development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Preview specific material
pnpm dev:dashboard-bar-chart
```

### Create New Material

```bash
# Generate material template
pnpm create:material

# Follow the prompts to input:
# - Material type (dashboard/form)
# - Material name
# - Description
```

## 📦 Ecosystem

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - Plugin-based low-code engine
- [EasyDashboard](https://github.com/Easy-Editor/EasyDashboard) - Dashboard builder
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - Official materials library (this repo)

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Easy-Editor Team](https://github.com/Easy-Editor)
