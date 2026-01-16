import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import postcss from 'rollup-plugin-postcss'

const GLOBAL_NAME = 'EasyEditorMaterialsCarousel'

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
      ['@babel/preset-typescript', { allowDeclareFields: true }],
    ],
  }),
  cleanup({
    comments: ['some', /PURE/],
    extensions: ['.js', '.ts'],
  }),
]

export default [
  {
    input: 'src/meta.ts',
    output: [{ file: 'dist/meta.esm.js', format: 'esm', sourcemap: true, exports: 'named' }],
    plugins,
    external,
  },
  {
    input: 'src/component.tsx',
    output: [{ file: 'dist/component.esm.js', format: 'esm', sourcemap: true, exports: 'named' }],
    plugins,
    external,
  },
  {
    input: 'src/index.tsx',
    output: [
      { file: 'dist/index.js', format: 'umd', name: GLOBAL_NAME, globals, sourcemap: true, exports: 'named' },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: true, exports: 'named' },
    ],
    plugins,
    external,
  },
  {
    input: 'src/index.tsx',
    output: [
      { file: 'dist/index.min.js', format: 'umd', name: GLOBAL_NAME, globals, sourcemap: true, exports: 'named' },
    ],
    plugins: [...plugins, terser()],
    external,
  },
]
