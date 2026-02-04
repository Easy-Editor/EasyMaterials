/**
 * @easy-editor/easypack configuration
 * @type {import('@easy-editor/easypack').EasypackConfig}
 */
import { ECHARTS_EXTERNALS, ECHARTS_GLOBALS, echartsExternalPlugin } from './.vite/echarts-external-plugin'

export default {
  preset: 'material',
  dev: {
    port: 5001,
  },
  css: {
    scopedName: 'em_scatter-chart__[local]___[hash:base64:5]',
  },
  rollup: {
    external: ECHARTS_EXTERNALS,
    output: {
      globals: ECHARTS_GLOBALS,
    },
  },
  vitePlugins: [echartsExternalPlugin()],
}
