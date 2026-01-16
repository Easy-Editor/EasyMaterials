/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsTechScatterChart'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-tech-scatter-chart'

/**
 * 默认颜色
 */
export const DEFAULT_COLORS = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffd93d', '#6bcbff', '#c56bff']

/**
 * 散点数据类型
 */
export interface ScatterPoint {
  x: number
  y: number
  z?: number
  name?: string
  category?: string
}

/**
 * 默认数据（20个固定散点）
 */
export const DEFAULT_DATA: ScatterPoint[] = [
  { x: 23, y: 45, z: 18, name: 'Point 1', category: 'A' },
  { x: 67, y: 32, z: 25, name: 'Point 2', category: 'B' },
  { x: 12, y: 78, z: 12, name: 'Point 3', category: 'C' },
  { x: 89, y: 56, z: 30, name: 'Point 4', category: 'A' },
  { x: 34, y: 91, z: 22, name: 'Point 5', category: 'B' },
  { x: 56, y: 23, z: 15, name: 'Point 6', category: 'C' },
  { x: 78, y: 67, z: 28, name: 'Point 7', category: 'A' },
  { x: 45, y: 12, z: 20, name: 'Point 8', category: 'B' },
  { x: 91, y: 89, z: 35, name: 'Point 9', category: 'C' },
  { x: 15, y: 34, z: 14, name: 'Point 10', category: 'A' },
  { x: 62, y: 48, z: 26, name: 'Point 11', category: 'B' },
  { x: 28, y: 72, z: 19, name: 'Point 12', category: 'C' },
  { x: 83, y: 15, z: 32, name: 'Point 13', category: 'A' },
  { x: 41, y: 63, z: 17, name: 'Point 14', category: 'B' },
  { x: 95, y: 41, z: 38, name: 'Point 15', category: 'C' },
  { x: 19, y: 85, z: 11, name: 'Point 16', category: 'A' },
  { x: 72, y: 29, z: 24, name: 'Point 17', category: 'B' },
  { x: 38, y: 94, z: 21, name: 'Point 18', category: 'C' },
  { x: 86, y: 52, z: 33, name: 'Point 19', category: 'A' },
  { x: 51, y: 76, z: 16, name: 'Point 20', category: 'B' },
]
