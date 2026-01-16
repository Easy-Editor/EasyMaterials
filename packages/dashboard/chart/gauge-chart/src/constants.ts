/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsGaugeChart'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-gauge-chart'

/**
 * 指针类型
 */
export const POINTER_TYPES = ['needle', 'triangle', 'rect'] as const

/**
 * 颜色区间类型
 */
export interface GaugeRange {
  from: number
  to: number
  color: string
}

/**
 * 默认颜色区间
 */
export const DEFAULT_RANGES: GaugeRange[] = [
  { from: 0, to: 40, color: '#00ff88' },
  { from: 40, to: 70, color: '#ffcc00' },
  { from: 70, to: 100, color: '#ff4444' },
]
