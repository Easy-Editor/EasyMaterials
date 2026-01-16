/**
 * GaugeChart 类型定义
 */

import type { CSSProperties, Ref } from 'react'

/**
 * 颜色区间定义
 */
export interface GaugeRange {
  from: number
  to: number
  color: string
}

/**
 * GaugeChart 组件属性
 */
export interface GaugeChartProps {
  ref?: Ref<HTMLDivElement>
  value?: number
  min?: number
  max?: number
  unit?: string
  showScale?: boolean
  divisions?: number
  showLabels?: boolean
  pointerType?: 'needle' | 'triangle' | 'rect'
  pointerColor?: string
  ranges?: GaugeRange[]
  glowEffect?: boolean
  style?: CSSProperties
}

/**
 * 仪表盘配置参数
 */
export interface GaugeConfig {
  size: number
  center: number
  outerRadius: number
  innerRadius: number
  scaleRadius: number
  startAngle: number
  endAngle: number
  angleRange: number
}

/**
 * 点坐标
 */
export interface Point {
  x: number
  y: number
}
