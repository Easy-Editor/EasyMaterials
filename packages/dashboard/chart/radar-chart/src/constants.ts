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
export const DEFAULT_COLORS = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffd93d', '#6bcbff', '#c56bff']

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
  { dimension: 'Attack', player1: 85, player2: 70 },
  { dimension: 'Defense', player1: 70, player2: 90 },
  { dimension: 'Speed', player1: 95, player2: 60 },
  { dimension: 'Magic', player1: 60, player2: 85 },
  { dimension: 'HP', player1: 75, player2: 80 },
]

/**
 * 默认系列配置
 */
export const DEFAULT_SERIES = [
  { name: 'Player 1', dataKey: 'player1', color: '#00d4ff' },
  { name: 'Player 2', dataKey: 'player2', color: '#00ff88' },
]
