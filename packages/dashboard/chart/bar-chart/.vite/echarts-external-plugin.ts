// 自定义插件：处理 echarts 模块的命名导出
export const echartsExternalPlugin = () => {
  const ECHARTS_MODULES = ['echarts', 'echarts/core', 'echarts/charts', 'echarts/components', 'echarts/renderers']
  const VIRTUAL_PREFIX = '\0virtual:echarts-external:'

  return {
    name: 'vite-plugin-echarts-external',
    enforce: 'pre',
    resolveId(id) {
      if (ECHARTS_MODULES.includes(id)) {
        return VIRTUAL_PREFIX + id
      }
      return null
    },
    load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) {
        return null
      }
      const moduleName = id.slice(VIRTUAL_PREFIX.length)
      const globalKey = moduleName.includes('/') ? `["${moduleName}"]` : `.${moduleName}`

      return `
// External module: ${moduleName} -> window${globalKey}
const mod = window${globalKey} || window.echarts;
if (!mod) {
  throw new Error('External dependency "${moduleName}" is not available on window.');
}
export default mod;
export const {
  ${getExportsForModule(moduleName)}
} = mod;
`
    },
  }
}

// 根据模块名返回需要导出的属性
function getExportsForModule(moduleName) {
  switch (moduleName) {
    case 'echarts/core':
      return 'use, init, graphic, registerMap, getMap'
    case 'echarts/charts':
      return 'MapChart, LinesChart, EffectScatterChart, BarChart, LineChart, PieChart, RadarChart, ScatterChart, GaugeChart'
    case 'echarts/components':
      return 'GeoComponent, TooltipComponent, LegendComponent, GridComponent, VisualMapComponent, TitleComponent'
    case 'echarts/renderers':
      return 'CanvasRenderer, SVGRenderer'
    default:
      return 'use, init, graphic, registerMap'
  }
}

// echarts 模块列表
export const ECHARTS_EXTERNALS = ['echarts', 'echarts/core', 'echarts/charts', 'echarts/components', 'echarts/renderers']
export const ECHARTS_GLOBALS = {
  echarts: 'echarts',
  'echarts/core': 'echarts',
  'echarts/charts': 'echarts',
  'echarts/components': 'echarts',
  'echarts/renderers': 'echarts',
}
