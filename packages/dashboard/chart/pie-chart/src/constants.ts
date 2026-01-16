/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsPieChart'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-pie-chart'

/**
 * 默认颜色
 */
export const DEFAULT_COLORS = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffd93d', '#6bcbff', '#c56bff']

/**
 * 默认数据
 */
export const DEFAULT_DATA = [
  { name: 'Category A', value: 335 },
  { name: 'Category B', value: 310 },
  { name: 'Category C', value: 234 },
  { name: 'Category D', value: 135 },
  { name: 'Category E', value: 148 },
]
