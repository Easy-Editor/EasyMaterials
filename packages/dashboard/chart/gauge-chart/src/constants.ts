import { MATERIAL_STATUS_COLORS } from '@easy-editor/materials-shared'

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
  { from: 0, to: 40, color: MATERIAL_STATUS_COLORS.success },
  { from: 40, to: 70, color: MATERIAL_STATUS_COLORS.warning },
  { from: 70, to: 100, color: MATERIAL_STATUS_COLORS.danger },
]
