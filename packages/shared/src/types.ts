/**
 * Material Groups
 * 物料分组常量
 */
export const MaterialGroup = {
  /** 内置 */
  INNER: 'inner',
  /** 基础 */
  BASIC: 'basic',
  /** 图表 */
  CHART: 'chart',
  /** 数据展示 */
  DATA: 'data',
  /** 交互 */
  INTERACTION: 'interaction',
} as const

/**
 * Material Group Type
 */
export type MaterialGroupType = (typeof MaterialGroup)[keyof typeof MaterialGroup]
