import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json' with { type: 'json' }

const GLOBAL_NAME = 'EasyEditorMaterialsGeoMap'

// 外部依赖（不打包进组件）
const external = ['react', 'react-dom', 'react/jsx-runtime', '@easy-editor/core']

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
  '@easy-editor/core': 'EasyEditorCore',
}

const plugins = [
  nodeResolve({
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  }),
  commonjs(),
  json(),
  postcss({
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    autoModules: true,
    minimize: true,
    inject: true,
  }),
  babel({
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    exclude: 'node_modules/**',
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
        },
      ],
    ],
  }),
  cleanup({
    comments: ['some', /PURE/],
    extensions: ['.js', '.ts'],
  }),
]

export default [
  /* ---------------------------------- 元数据构建 --------------------------------- */
  {
    input: 'src/meta.ts',
    output: [
      {
        file: 'dist/meta.esm.js',
        format: 'esm',
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (meta, esm) */`,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/meta.ts',
    output: [
      {
        file: 'dist/meta.js',
        format: 'umd',
        name: `${GLOBAL_NAME}Meta`,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (meta) */`,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/meta.ts',
    output: [
      {
        file: 'dist/meta.min.js',
        format: 'umd',
        name: `${GLOBAL_NAME}Meta`,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (meta, minified) */`,
        exports: 'named',
      },
    ],
    plugins: [...plugins, terser()],
    external,
  },

  /* ---------------------------------- 组件构建 ---------------------------------- */
  {
    input: 'src/component.tsx',
    output: [
      {
        file: 'dist/component.esm.js',
        format: 'esm',
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (component, esm) */`,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/component.tsx',
    output: [
      {
        file: 'dist/component.js',
        format: 'umd',
        name: `${GLOBAL_NAME}Component`,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (component) */`,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/component.tsx',
    output: [
      {
        file: 'dist/component.min.js',
        format: 'umd',
        name: `${GLOBAL_NAME}Component`,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (component, minified) */`,
        exports: 'named',
      },
    ],
    plugins: [...plugins, terser()],
    external,
  },

  /* ---------------------------------- 完整构建 ---------------------------------- */
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: GLOBAL_NAME,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} */`,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
    external,
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: GLOBAL_NAME,
        globals,
        sourcemap: true,
        banner: `/* @easy-editor/geo-map v${pkg.version} (minified) */`,
        exports: 'named',
      },
    ],
    plugins: [...plugins, terser()],
    external,
  },
]
