/**
 * Scatter Chart Component
 * 散点图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { ScatterChart as EChartsScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import {
  MaterialEmptyState,
  type MaterialComponet,
  resolveMaterialChartColors,
  resolveMaterialTheme,
  shouldHideEmptyMaterial,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, type ScatterPoint } from './constants'
import { escapeTooltipHtml } from './tooltip'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsScatterChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export interface ScatterChartProps extends MaterialComponet {
  /** 静态数据（兼容旧版） */
  data?: ScatterPoint[]
  /** X轴标签 */
  xLabel?: string
  /** Y轴标签 */
  yLabel?: string
  /** 颜色列表 */
  colors?: string[]
  /** 点大小 */
  pointSize?: number
  /** 显示网格 */
  showGrid?: boolean
  /** 显示图例 */
  showLegend?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
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

const getLegendLayout = (position: NonNullable<ScatterChartProps['legendPosition']>) => {
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

// 按分类分组数据
const groupDataByCategory = (data: ScatterPoint[]): Map<string, ScatterPoint[]> => {
  const grouped = new Map<string, ScatterPoint[]>()

  for (const point of data) {
    const category = point.category ?? 'default'
    const existing = grouped.get(category) ?? []
    existing.push(point)
    grouped.set(category, existing)
  }

  return grouped
}

// 构建图表配置
const buildOption = (
  data: ScatterPoint[],
  theme: ReturnType<typeof resolveMaterialTheme>,
  options: {
    xLabel: string
    yLabel: string
    colors: string[]
    pointSize: number
    showGrid: boolean
    showLegend: boolean
    showTooltip: boolean
    legendPosition: NonNullable<ScatterChartProps['legendPosition']>
    glowEffect: boolean
  },
) => {
  const { xLabel, yLabel, colors, pointSize, showGrid, showLegend, showTooltip, legendPosition, glowEffect } = options

  // 按分类分组数据
  const groupedData = groupDataByCategory(data)
  const categories = Array.from(groupedData.keys())
  const hasMultipleCategories = categories.length > 1 || (categories.length === 1 && categories[0] !== 'default')

  // 构建 series
  const series = categories.map((category, index) => {
    const categoryData = groupedData.get(category) ?? []
    const color = colors[index % colors.length]
    const displayName = category === 'default' ? 'Data' : category

    return {
      name: displayName,
      type: 'scatter' as const,
      data: categoryData.map(point => [point.x, point.y, point.z ?? pointSize]),
      symbolSize: (val: number[]) => val[2] ?? pointSize,
      itemStyle: {
        color,
        opacity: 0.8,
        shadowColor: glowEffect ? color : 'transparent',
        shadowBlur: glowEffect ? 6 : 0,
      },
    }
  })

  return {
    backgroundColor: 'transparent',
    grid: {
      top: showLegend && hasMultipleCategories && legendPosition === 'top' ? 48 : 20,
      right: showLegend && hasMultipleCategories && legendPosition === 'right' ? 96 : 20,
      bottom: showLegend && hasMultipleCategories && legendPosition === 'bottom' ? 56 : 50,
      left: showLegend && hasMultipleCategories && legendPosition === 'left' ? 96 : 60,
      containLabel: false,
    },
    xAxis: {
      type: 'value',
      name: xLabel,
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: theme.mutedForeground,
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: theme.mutedForeground,
        fontSize: 11,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: theme.grid,
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: yLabel,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: theme.mutedForeground,
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: theme.mutedForeground,
        fontSize: 11,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: theme.grid,
          type: 'dashed',
        },
      },
    },
    tooltip: showTooltip
      ? {
          trigger: 'item',
          backgroundColor: theme.tooltipBackground,
          borderColor: theme.tooltipBorder,
          borderWidth: 1,
          textStyle: {
            color: theme.tooltipForeground,
          },
          formatter: (params: { value: number[]; seriesName: string }) =>
            `${escapeTooltipHtml(params.seriesName)}<br/>X: ${escapeTooltipHtml(params.value[0])}<br/>Y: ${escapeTooltipHtml(params.value[1])}`,
        }
      : undefined,
    legend:
      showLegend && hasMultipleCategories
        ? {
            show: true,
            ...getLegendLayout(legendPosition),
            textStyle: {
              color: theme.mutedForeground,
              fontSize: 11,
            },
          }
        : undefined,
    series,
  }
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  ref,
  $data,
  __dataSource,
  data: staticData,
  xLabel = 'X',
  yLabel = 'Y',
  colors = DEFAULT_COLORS,
  pointSize = 8,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  legendPosition = 'bottom',
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

  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const data = useMemo<ScatterPoint[]>(
    () => ($data ? dataSource : (staticData ?? dataSource)) as ScatterPoint[],
    [$data, dataSource, staticData],
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
      xLabel,
      yLabel,
      colors: resolvedColors,
      pointSize,
      showGrid,
      showLegend,
      showTooltip,
      legendPosition,
      glowEffect,
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
  }, [data, xLabel, yLabel, colors, pointSize, showGrid, showLegend, showTooltip, legendPosition, glowEffect])

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
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
        <div className={styles.chart} ref={chartRef} />
      )}
    </div>
  )
}

export default ScatterChart
