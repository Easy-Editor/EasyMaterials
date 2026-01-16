/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsLineChart'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-line-chart'

/**
 * 默认颜色
 */
export const DEFAULT_COLORS = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffd93d', '#6bcbff', '#c56bff']

/**
 * 数据点类型
 */
export interface DataPoint {
  name: string
  [key: string]: number | string | undefined
}

/**
 * 默认数据
 */
export const DEFAULT_DATA: DataPoint[] = [
  { name: 'Mon', value1: 120, value2: 80 },
  { name: 'Tue', value1: 200, value2: 120 },
  { name: 'Wed', value1: 150, value2: 100 },
  { name: 'Thu', value1: 280, value2: 180 },
  { name: 'Fri', value1: 220, value2: 140 },
  { name: 'Sat', value1: 300, value2: 200 },
  { name: 'Sun', value1: 250, value2: 160 },
]
