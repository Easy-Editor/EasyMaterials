/**
 * Vite Plugin: External Dependencies
 * 外部依赖插件 - 在开发模式下将 React/ReactDOM 外部化
 *
 * 用途：
 * - 防止 Vite 将 React/ReactDOM 打包进开发服务器的模块
 * - 强制使用父应用（dashboard）提供的 React 实例
 * - 解决双 React 实例导致的 "Invalid hook call" 错误
 */

import type { Plugin } from 'vite'

interface ExternalDepsOptions {
  /** 需要外部化的依赖列表 */
  externals?: string[]
  /** 全局变量映射 */
  globals?: Record<string, string>
}

const DEFAULT_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime']

const DEFAULT_GLOBALS: Record<string, string> = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
}

/**
 * 创建外部依赖插件
 */
export function externalDeps(options: ExternalDepsOptions = {}): Plugin {
  const externals = options.externals || DEFAULT_EXTERNALS
  const globals = { ...DEFAULT_GLOBALS, ...options.globals }

  // 虚拟模块前缀
  const VIRTUAL_PREFIX = '\0virtual:external:'

  return {
    name: 'vite-plugin-external-deps',
    enforce: 'pre',

    // 在开发模式下拦截模块解析
    resolveId(id) {
      // 检查是否是需要外部化的依赖
      if (externals.includes(id)) {
        // 返回虚拟模块 ID（\0 前缀告诉 Vite 这是虚拟模块）
        return VIRTUAL_PREFIX + id
      }
      return null
    },

    // 加载外部模块的代理代码
    load(id) {
      // 检查是否是虚拟外部模块
      if (!id.startsWith(VIRTUAL_PREFIX)) {
        return null
      }

      const moduleName = id.slice(VIRTUAL_PREFIX.length)
      const globalName = globals[moduleName]

      if (!globalName) {
        throw new Error(
          `[vite-plugin-external-deps] No global mapping found for "${moduleName}". ` +
            `Please add it to the globals option.`
        )
      }

      // 对于 react，导出常用的命名导出
      if (moduleName === 'react') {
        return `
// External module: react -> window.${globalName}
const React = window.${globalName};
if (!React) {
  throw new Error(
    'External dependency "react" (window.${globalName}) is not available. ' +
    'Make sure the parent application has loaded it globally.'
  );
}

// 导出默认导出
export default React;

// 导出常用的命名导出
export const {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  useDeferredValue,
  useTransition,
  useId,
  useSyncExternalStore,
  Fragment,
  StrictMode,
  Suspense,
  createElement,
  createContext,
  forwardRef,
  lazy,
  memo,
  startTransition,
  Component,
  PureComponent,
  Children,
  cloneElement,
  isValidElement,
} = React;
`
      }

      // 对于 react-dom，导出常用的命名导出
      if (moduleName === 'react-dom') {
        return `
// External module: react-dom -> window.${globalName}
const ReactDOM = window.${globalName};
if (!ReactDOM) {
  throw new Error(
    'External dependency "react-dom" (window.${globalName}) is not available. ' +
    'Make sure the parent application has loaded it globally.'
  );
}

// 导出默认导出
export default ReactDOM;

// 导出常用的命名导出
export const {
  createRoot,
  hydrateRoot,
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
  flushSync,
} = ReactDOM;
`
      }

      // 对于 react/jsx-runtime
      if (moduleName === 'react/jsx-runtime') {
        return `
// External module: react/jsx-runtime -> window.${globalName}
const jsxRuntime = window.${globalName};
if (!jsxRuntime) {
  throw new Error(
    'External dependency "react/jsx-runtime" (window.${globalName}) is not available. ' +
    'Make sure the parent application has loaded it globally.'
  );
}

// 导出 JSX 运行时函数
export const { jsx, jsxs, Fragment } = jsxRuntime;
export default jsxRuntime;
`
      }

      // 对于 @easy-editor/core
      if (moduleName === '@easy-editor/core') {
        return `
// External module: @easy-editor/core -> window.${globalName}
const EasyEditorCore = window.${globalName};
if (!EasyEditorCore) {
  throw new Error(
    'External dependency "@easy-editor/core" (window.${globalName}) is not available. ' +
    'Make sure the parent application has loaded it globally.'
  );
}

// 导出整个模块
export default EasyEditorCore;
export * from '\0virtual:external:@easy-editor/core:named';
`
      }

      // 处理 @easy-editor/core 的命名导出
      if (id === '\0virtual:external:@easy-editor/core:named') {
        return `
const EasyEditorCore = window.${globals['@easy-editor/core']};
// 尝试导出所有属性
const keys = Object.keys(EasyEditorCore || {});
const exports = {};
keys.forEach(key => {
  exports[key] = EasyEditorCore[key];
});
export default exports;
`
      }

      // 默认情况：简单的全局变量代理
      return `
// External module: ${moduleName} -> window.${globalName}
const mod = window.${globalName};
if (!mod) {
  throw new Error(
    'External dependency "${moduleName}" (window.${globalName}) is not available. ' +
    'Make sure the parent application has loaded it globally.'
  );
}
export default mod;
`
    },

    // 配置 Rollup 外部化（用于构建）
    config(config) {
      return {
        build: {
          rollupOptions: {
            external: externals,
            output: {
              globals,
            },
          },
        },
      }
    },
  }
}
