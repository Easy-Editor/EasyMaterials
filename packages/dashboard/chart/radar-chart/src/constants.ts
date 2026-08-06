import { MATERIAL_CHART_COLORS } from '@easy-editor/materials-shared'

/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsTechRadarChart'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-tech-radar-chart'

/**
 * 默认颜色
 */
export const DEFAULT_COLORS = [...MATERIAL_CHART_COLORS]

/**
 * 默认维度
 */
export const DEFAULT_DIMENSIONS = ['Attack', 'Defense', 'Speed', 'Magic', 'HP']

/**
 * 雷达图数据点类型
 */
export interface RadarDataPoint {
  dimension: string
  [key: string]: number | string | undefined
}

/**
 * 默认数据
 */
export const DEFAULT_DATA: RadarDataPoint[] = [
  { dimension: 'Attack', value1: 85, value2: 70 },
  { dimension: 'Defense', value1: 70, value2: 90 },
  { dimension: 'Speed', value1: 95, value2: 60 },
  { dimension: 'Magic', value1: 60, value2: 85 },
  { dimension: 'HP', value1: 75, value2: 80 },
]

/**
 * 默认系列配置
 */
export const DEFAULT_SERIES = [
  { name: '系列 1', dataKey: 'value1', color: MATERIAL_CHART_COLORS[0] },
  { name: '系列 2', dataKey: 'value2', color: MATERIAL_CHART_COLORS[1] },
]
