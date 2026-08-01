/**
 * Gauge Chart Component
 * 仪表盘组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { GaugeChart as EChartsGaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import {
  MaterialEmptyState,
  type MaterialComponet,
  resolveMaterialTheme,
  shouldHideEmptyMaterial,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_RANGES, type GaugeRange } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsGaugeChart, TooltipComponent, CanvasRenderer])

const MINOR_TICKS_PER_DIVISION = 5

export const normalizeGaugeDomain = (min: number, max: number): [number, number] => {
  const safeMin = Number.isFinite(min) ? min : 0
  const candidateMax = Number.isFinite(max) ? max : safeMin + 100
  return [safeMin, candidateMax > safeMin ? candidateMax : safeMin + 1]
}

export const normalizeGaugeRanges = (
  ranges: GaugeRange[],
  min: number,
  max: number,
  fallbackColor: string,
): GaugeRange[] => {
  const candidates = (Array.isArray(ranges) ? ranges : [])
    .filter(
      range =>
        range &&
        Number.isFinite(range.from) &&
        Number.isFinite(range.to) &&
        range.to > range.from &&
        typeof range.color === 'string' &&
        range.color.trim().length > 0 &&
        range.to > min &&
        range.from < max,
    )
    .map(range => ({
      ...range,
      from: Math.max(min, range.from),
      to: Math.min(max, range.to),
      color: range.color.trim(),
    }))
    .sort((left, right) => left.from - right.from || left.to - right.to)

  if (candidates.length === 0) {
    return [{ from: min, to: max, color: fallbackColor }]
  }

  const normalized: GaugeRange[] = []
  let cursor = min
  let gapColor = fallbackColor
  for (const range of candidates) {
    if (range.from > cursor) {
      normalized.push({ from: cursor, to: range.from, color: gapColor })
      cursor = range.from
    }

    const rangeStart = Math.max(cursor, range.from)
    if (range.to <= rangeStart) {
      continue
    }

    normalized.push({ ...range, from: rangeStart })
    cursor = range.to
    gapColor = range.color
    if (cursor >= max) {
      break
    }
  }

  if (cursor < max) {
    normalized.push({ from: cursor, to: max, color: gapColor })
  }
  return normalized
}

export interface GaugeChartProps extends MaterialComponet {
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 单位 */
  unit?: string
  /** 显示刻度 */
  showScale?: boolean
  /** 刻度数量 */
  divisions?: number
  /** 显示刻度值 */
  showLabels?: boolean
  /** 指针类型 */
  pointerType?: 'needle' | 'triangle' | 'rect'
  /** 指针颜色 */
  pointerColor?: string
  /** 颜色区间 */
  ranges?: GaugeRange[]
  /** 发光效果 */
  glowEffect?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  ref,
  $data,
  __dataSource,
  min = 0,
  max = 100,
  unit = '',
  showScale = true,
  divisions = 10,
  showLabels = true,
  pointerType = 'needle',
  pointerColor,
  ranges = DEFAULT_RANGES,
  glowEffect = false,
  emptyBehavior,
  emptyText,
  __designMode,
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  style: externalStyle,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 解析数据源（单值）
  const dataSource = useDataSource($data, __dataSource)
  const value = useMemo<number | null>(() => {
    if (dataSource.length > 0 && dataSource[0]?.value !== undefined) {
      const nextValue = Number(dataSource[0].value)
      return Number.isFinite(nextValue) ? nextValue : null
    }
    return null
  }, [dataSource])

  const isEmpty = value === null

  useEffect(() => {
    if (!chartRef.current || value === null) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const theme = resolveMaterialTheme(chartRef.current)
    const resolvedPointerColor = pointerColor ?? theme.accent
    const [safeMin, safeMax] = normalizeGaugeDomain(min, max)
    const safeRanges = normalizeGaugeRanges(ranges, safeMin, safeMax, theme.border)
    const safeDivisions = Math.max(2, Math.floor(Number.isFinite(divisions) ? divisions : 10))
    const safeValue = Math.min(safeMax, Math.max(safeMin, value))

    // 构建颜色区间
    const axisLineColors: [number, string][] = safeRanges.map(range => [
      (range.to - safeMin) / (safeMax - safeMin),
      range.color,
    ])

    // 指针宽度根据类型调整
    const pointerWidthMap: Record<string, number> = {
      needle: 4,
      triangle: 8,
      rect: 6,
    }
    const pointerWidth = pointerWidthMap[pointerType] ?? 6

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          min: safeMin,
          max: safeMax,
          splitNumber: safeDivisions,
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '80%'],
          radius: '72%',
          progress: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 16,
              color: axisLineColors,
              shadowColor: glowEffect ? theme.accent : 'transparent',
              shadowBlur: glowEffect ? 6 : 0,
            },
          },
          axisTick: {
            show: showScale,
            distance: -20,
            length: 4,
            lineStyle: {
              color: theme.mutedForeground,
              width: 1,
            },
            splitNumber: MINOR_TICKS_PER_DIVISION,
          },
          splitLine: {
            show: showScale,
            distance: -24,
            length: 8,
            lineStyle: {
              color: theme.mutedForeground,
              width: 2,
            },
          },
          axisLabel: {
            show: showLabels,
            distance: -32,
            color: theme.mutedForeground,
            fontSize: 9,
          },
          pointer: {
            show: true,
            length: '55%',
            width: pointerWidth,
            itemStyle: {
              color: resolvedPointerColor,
              shadowColor: glowEffect ? resolvedPointerColor : 'transparent',
              shadowBlur: glowEffect ? 6 : 0,
            },
          },
          anchor: {
            show: true,
            size: 10,
            itemStyle: {
              color: resolvedPointerColor,
              shadowColor: glowEffect ? resolvedPointerColor : 'transparent',
              shadowBlur: glowEffect ? 4 : 0,
            },
          },
          title: {
            show: true,
            offsetCenter: [0, '20%'],
            color: theme.mutedForeground,
            fontSize: 11,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '40%'],
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.foreground,
            formatter: (val: number) => `${val}${unit}`,
            textShadowColor: glowEffect ? resolvedPointerColor : 'transparent',
            textShadowBlur: glowEffect ? 6 : 0,
          },
          data: [{ value: safeValue }],
        },
      ],
    }

    chartInstance.current.setOption(option)

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.current?.dispose()
    }
  }, [value, min, max, unit, showScale, divisions, showLabels, pointerType, pointerColor, ranges, glowEffect])

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }

  if (shouldHideEmptyMaterial(isEmpty, emptyBehavior, __designMode)) {
    return null
  }

  return (
    <div
      className={styles.container}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={containerStyle}
    >
      {isEmpty ? (
        <MaterialEmptyState behavior={emptyBehavior} designMode={__designMode} text={emptyText} />
      ) : (
        <div className={styles.chart} ref={chartRef} />
      )}
    </div>
  )
}

export default GaugeChart
