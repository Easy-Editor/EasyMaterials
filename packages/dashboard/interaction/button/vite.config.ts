/**
 * Vite Configuration for Material Development
 * 物料开发 Vite 配置
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { materialDevPlugin } from './.vite/plugins/vite-plugin-material-dev'
import { externalDeps } from './.vite/plugins/vite-plugin-external-deps'

export default defineConfig({
  plugins: [
    react(),
    // 外部化 React/ReactDOM，使用父应用提供的实例
    externalDeps({
      externals: ['react', 'react-dom', 'react/jsx-runtime', '@easy-editor/core'],
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
        '@easy-editor/core': 'EasyEditorCore',
      },
    }),
    materialDevPlugin({
      entry: '/src/index.tsx',
    }),
  ],
  server: {
    port: 5001,
    host: 'localhost',
    cors: true,
    hmr: {
      port: 5001,
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      // 确保生产构建也外部化这些依赖
      external: ['react', 'react-dom', 'react/jsx-runtime', '@easy-editor/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@easy-editor/core': 'EasyEditorCore',
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
