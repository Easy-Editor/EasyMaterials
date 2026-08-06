/**
 * Pie Chart Component
 * 饼图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { PieChart as EChartsPieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import {
  MaterialEmptyState,
  type MaterialComponet,
  resolveMaterialChartColors,
  resolveMaterialTheme,
  shouldHideEmptyMaterial,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_COLORS } from './constants'
import { resolveConcentricRingLayout, resolvePieLegendInteraction, resolvePieOverlays } from './display-style.js'
import { escapeTooltipHtml } from './tooltip'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsPieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface PieDataItem {
  name: string
  value: number
}

export interface PieChartProps extends MaterialComponet {
  /** 展示样式 */
  displayStyle?: 'standard' | 'concentric-rings' | 'tilted-donut'
  /** 内半径 */
  innerRadius?: string | number
  /** 外半径 */
  outerRadius?: string | number
  /** 颜色列表 */
  colors?: string[]
  /** 显示标签 */
  showLabel?: boolean
  /** 标签类型 */
  labelType?: 'percent' | 'value' | 'name'
  /** 显示图例 */
  showLegend?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 发光效果 */
  glowEffect?: boolean
  /** 玫瑰图 */
  roseType?: boolean
  /** 同心环轨道色 */
  trackColor?: string
  /** 同心环宽度（百分比半径） */
  ringWidth?: number
  /** 同心环间距（百分比半径） */
  ringGap?: number
  /** 倾斜环纵向压缩比例 */
  tiltRatio?: number
  /** 倾斜环层叠深度 */
  tiltedDepth?: number
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

const normalizeRadius = (value: string | number): string => (typeof value === 'number' ? `${value}%` : value)

const normalizePercentRadius = (value: string | number, fallback: number): number => {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value)
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : fallback
}

const getLegendLayout = (position: NonNullable<PieChartProps['legendPosition']>) => {
  switch (position) {
    case 'bottom':
      return { bottom: 8, left: 'center', orient: 'horizontal' as const }
    case 'left':
      return { left: 8, top: 'middle', orient: 'vertical' as const }
    case 'right':
      return { right: 8, top: 'middle', orient: 'vertical' as const }
    default:
      return { left: 'center', top: 8, orient: 'horizontal' as const }
  }
}

const getPieCenter = (
  showLegend: boolean,
  legendPosition: NonNullable<PieChartProps['legendPosition']>,
): [string, string] => {
  if (!showLegend || legendPosition === 'top' || legendPosition === 'bottom') {
    return ['50%', '50%']
  }
  return legendPosition === 'left' ? ['60%', '50%'] : ['40%', '50%']
}

// 格式化标签
const formatLabel = (params: { name: string; value: number; percent: number }, labelType: string): string => {
  switch (labelType) {
    case 'percent':
      return `${params.percent.toFixed(1)}%`
    case 'value':
      return String(params.value)
    case 'name':
      return params.name
    default:
      return `${params.percent.toFixed(1)}%`
  }
}

// 构建图表配置
const buildOption = (
  data: PieDataItem[],
  theme: ReturnType<typeof resolveMaterialTheme>,
  options: {
    innerRadius: string | number
    outerRadius: string | number
    showLegend: boolean
    showTooltip: boolean
    legendPosition: NonNullable<PieChartProps['legendPosition']>
    showLabel: boolean
    labelType: string
    glowEffect: boolean
    roseType: boolean
    colors: string[]
    displayStyle: NonNullable<PieChartProps['displayStyle']>
    trackColor: string
    ringWidth: number
    ringGap: number
    tiltedDepth: number
  },
) => {
  const {
    innerRadius,
    outerRadius,
    showLegend,
    showTooltip,
    legendPosition,
    showLabel,
    labelType,
    glowEffect,
    roseType,
    colors,
    displayStyle,
    trackColor,
    ringWidth,
    ringGap,
    tiltedDepth,
  } = options

  const overlays = resolvePieOverlays(displayStyle, { showLabel, showLegend, showTooltip })

  const tooltip = overlays.showTooltip
    ? {
        trigger: 'item',
        backgroundColor: theme.tooltipBackground,
        borderColor: theme.tooltipBorder,
        borderWidth: 1,
        textStyle: {
          color: theme.tooltipForeground,
        },
        formatter: (params: {
          name: string
          value: number
          percent: number
          seriesName?: string
          data?: { rawValue?: number; displayPercent?: number; isTrack?: boolean }
        }) => {
          if (params.data?.isTrack) {
            return ''
          }
          const name = params.seriesName || params.name
          const value = params.data?.rawValue ?? params.value
          const percent = params.data?.displayPercent ?? params.percent
          return `${escapeTooltipHtml(name)}: ${escapeTooltipHtml(value)} (${escapeTooltipHtml(percent.toFixed(1))}%)`
        },
      }
    : undefined

  const legend = overlays.showLegend
    ? {
        ...getLegendLayout(legendPosition),
        data: data.map(item => item.name),
        ...resolvePieLegendInteraction(displayStyle),
        textStyle: {
          color: theme.mutedForeground,
          fontSize: 11,
        },
        formatter: (name: string) => (name.length > 10 ? `${name.slice(0, 10)}...` : name),
      }
    : undefined

  const center = getPieCenter(overlays.showLegend, legendPosition)

  if (displayStyle === 'concentric-rings') {
    const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0) || 1
    const outer = normalizePercentRadius(outerRadius, 70)
    const inner = normalizePercentRadius(innerRadius, 0)
    const ringLayout = resolveConcentricRingLayout({
      count: data.length,
      outerRadius: outer,
      innerRadius: inner,
      ringWidth,
      ringGap,
    })

    return {
      backgroundColor: 'transparent',
      tooltip,
      legend,
      series: data.map((item, index) => {
        const ring = ringLayout[index]
        const value = Math.max(0, item.value)
        const displayPercent = (value / total) * 100
        const color = colors[index % colors.length]

        return {
          name: item.name,
          type: 'pie',
          radius: [`${ring.inner}%`, `${ring.outer}%`],
          center,
          startAngle: 90,
          clockwise: true,
          avoidLabelOverlap: false,
          minAngle: 0,
          animationDelay: index * 80,
          label: { show: false },
          labelLine: { show: false },
          emphasis: { scale: false },
          data: [
            {
              name: item.name,
              value,
              rawValue: item.value,
              displayPercent,
              itemStyle: { color, borderWidth: 0 },
              label: overlays.showLabel
                ? {
                    show: true,
                    position: 'outside',
                    color: theme.mutedForeground,
                    fontSize: 11,
                    formatter: `${displayPercent.toFixed(0)}%`,
                  }
                : { show: false },
              labelLine: overlays.showLabel
                ? {
                    show: true,
                    length: 5 + index * 2,
                    length2: 5,
                    lineStyle: { color },
                  }
                : { show: false },
            },
            {
              name: `__track_${index}`,
              value: Math.max(0, total - value),
              isTrack: true,
              tooltip: { show: false },
              itemStyle: { color: trackColor, borderWidth: 0 },
              label: { show: false },
              labelLine: { show: false },
              emphasis: { disabled: true },
            },
          ],
        }
      }),
    }
  }

  const standardSeries = {
    type: 'pie',
    radius: [normalizeRadius(innerRadius), normalizeRadius(outerRadius)],
    center,
    roseType: roseType ? 'radius' : undefined,
    data: data.map((item, index) => ({
      ...item,
      itemStyle: {
        color: glowEffect
          ? new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: colors[index % colors.length] },
              { offset: 1, color: `${colors[index % colors.length]}b3` },
            ])
          : colors[index % colors.length],
        shadowColor: glowEffect ? colors[index % colors.length] : 'transparent',
        shadowBlur: glowEffect ? 6 : 0,
      },
    })),
    label: overlays.showLabel
      ? {
          show: true,
          color: theme.mutedForeground,
          fontSize: 11,
          formatter: (params: { name: string; value: number; percent: number }) => formatLabel(params, labelType),
        }
      : { show: false },
    labelLine: overlays.showLabel
      ? {
          show: true,
          lineStyle: {
            color: theme.border,
          },
        }
      : { show: false },
    emphasis: {
      itemStyle: {
        shadowBlur: glowEffect ? 8 : 4,
        shadowOffsetX: 0,
        shadowColor: glowEffect ? theme.accent : theme.border,
      },
    },
  }

  if (displayStyle === 'tilted-donut') {
    const safeDepth = Math.min(24, Math.max(0, Math.round(tiltedDepth)))
    const layerCount = Math.max(1, Math.ceil(safeDepth / 3))
    const centerY = Number.parseFloat(center[1]) || 50
    const depthLayers = Array.from({ length: layerCount }, (_, index) => ({
      ...standardSeries,
      name: '__tilted_depth',
      center: [center[0], `${centerY + ((safeDepth - index * 3) / 3) * 0.7}%`],
      silent: true,
      tooltip: { show: false },
      label: { show: false },
      labelLine: { show: false },
      emphasis: { disabled: true },
      z: index,
      data: data.map((item, dataIndex) => ({
        ...item,
        name: `__depth_${dataIndex}`,
        itemStyle: {
          color: colors[dataIndex % colors.length],
          opacity: 0.18 + (index / layerCount) * 0.18,
          borderWidth: 0,
        },
      })),
    }))

    return {
      backgroundColor: 'transparent',
      tooltip,
      legend,
      series: [...depthLayers, { ...standardSeries, z: layerCount + 1 }],
    }
  }

  return {
    backgroundColor: 'transparent',
    tooltip,
    legend,
    series: [standardSeries],
  }
}

export const PieChart: React.FC<PieChartProps> = ({
  ref,
  $data,
  __dataSource,
  displayStyle = 'standard',
  innerRadius = '0%',
  outerRadius = '70%',
  colors = DEFAULT_COLORS,
  showLabel = true,
  labelType = 'percent',
  showLegend = true,
  showTooltip = true,
  legendPosition = 'right',
  glowEffect = false,
  roseType = false,
  trackColor = 'rgba(120, 153, 177, 0.16)',
  ringWidth = 5,
  ringGap = 3,
  tiltRatio = 0.56,
  tiltedDepth = 12,
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

  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const data = useMemo<PieDataItem[]>(
    () =>
      dataSource.flatMap(item => {
        const value = Number(item.value)
        return item.name !== undefined && Number.isFinite(value) ? [{ name: String(item.name), value }] : []
      }),
    [dataSource],
  )

  useEffect(() => {
    if (!chartRef.current || data.length === 0) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const theme = resolveMaterialTheme(chartRef.current)
    const resolvedColors =
      colors === DEFAULT_COLORS || colors.length === 0 ? resolveMaterialChartColors(chartRef.current) : colors

    const option = buildOption(data, theme, {
      innerRadius,
      outerRadius,
      showLegend,
      showTooltip,
      legendPosition,
      showLabel,
      labelType,
      glowEffect,
      roseType,
      colors: resolvedColors,
      displayStyle,
      trackColor,
      ringWidth,
      ringGap,
      tiltedDepth,
    })

    chartInstance.current.setOption(option)

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.current?.dispose()
    }
  }, [
    data,
    innerRadius,
    outerRadius,
    colors,
    showLabel,
    labelType,
    showLegend,
    showTooltip,
    legendPosition,
    glowEffect,
    roseType,
    displayStyle,
    trackColor,
    ringWidth,
    ringGap,
    tiltedDepth,
  ])

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }
  const chartStyle: CSSProperties = {
    transform: displayStyle === 'tilted-donut' ? `scaleY(${Math.min(1, Math.max(0.25, tiltRatio))})` : 'none',
  }

  const isEmpty = data.length === 0
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
        <div className={styles.chart} ref={chartRef} style={chartStyle} />
      )}
    </div>
  )
}

export default PieChart
