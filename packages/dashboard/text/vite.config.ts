/**
 * Vite Configuration for Material Development
 * 物料开发 Vite 配置
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { materialDevPlugin } from './vite-plugin-material-dev'

export default defineConfig({
  plugins: [
    react(),
    materialDevPlugin({
      entry: '/src/index.tsx',
    }),
  ],

  server: {
    port: 5001,
    host: 'localhost',
    cors: true,
    // HMR 配置
    hmr: {
      port: 5001,
    },
  },

  // 优化依赖处理
  optimizeDeps: {
    // 排除这些依赖，让它们从平台端加载
    exclude: ['@easy-editor/core', '@easy-editor/materials-shared'],
  },

  // 构建配置（用于生产环境，开发时不影响）
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // 外部依赖不打包
      external: ['react', 'react-dom', '@easy-editor/core', '@easy-editor/materials-shared'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },

  // 解析配置
  resolve: {
    // 确保使用相同的 React 实例
    dedupe: ['react', 'react-dom'],
  },

  // esbuild 配置
  esbuild: {
    // 保留 JSX 注释，便于调试
    jsx: 'automatic',
  },
})
