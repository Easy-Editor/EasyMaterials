/**
 * GaugeChart SVG 辅助函数
 */

import type { Point } from './types'

/**
 * 将角度转换为弧度
 */
export const degToRad = (deg: number): number => (deg * Math.PI) / 180

/**
 * 根据角度计算圆上的点坐标
 */
export const polarToCartesian = (cx: number, cy: number, radius: number, angleDeg: number): Point => {
  const rad = degToRad(angleDeg)
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

/**
 * 生成圆弧路径
 */
// biome-ignore lint: 参数过多是数学函数需要
export const describeArc = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string => {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ')
}

/**
 * 生成唯一 ID
 */
export const generateUniqueId = (prefix: string): string => `${prefix}-${Math.random().toString(36).substr(2, 9)}`

/**
 * 计算归一化值
 */
export const normalizeValue = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

/**
 * 计算值对应的角度
 */
// biome-ignore lint: 参数过多是数学函数需要
export const valueToAngle = (
  value: number,
  min: number,
  max: number,
  startAngle: number,
  angleRange: number,
): number => {
  const ratio = (value - min) / (max - min)
  return startAngle - ratio * angleRange
}
