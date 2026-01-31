/**
 * Shared types, components and utilities for EasyEditor materials
 * @package @easy-editor/materials-shared
 */

// 物料分组常量
export const MaterialGroup = {
  /** 内置 */
  INNER: 'inner',
  /** 基础 */
  BASIC: 'basic',
  /** 图表 */
  CHART: 'chart',
  /** 数据展示 */
  DISPLAY: 'display',
  /** 媒体 */
  MEDIA: 'media',
  /** 交互 */
  INTERACTION: 'interaction',
  /** 地图 */
  MAP: 'map',
} as const

export type MaterialGroup = (typeof MaterialGroup)[keyof typeof MaterialGroup]

// 工具函数
export { cn } from './lib/utils'

// 类型定义
export * from './types'

// 数据源处理工具
export * from './datasource'

// 配置项工厂函数
export * from './configure'
