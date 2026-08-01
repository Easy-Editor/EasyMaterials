/**
 * Bar Chart Component
 * 柱状图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { BarChart as EChartsBarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { SeriesOption } from 'echarts'
import {
  MaterialEmptyState,
  type MaterialComponet,
  resolveMaterialChartColors,
  resolveMaterialTheme,
  shouldHideEmptyMaterial,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, type DataPoint } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsBarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export interface BarChartProps extends MaterialComponet {
  /** X轴字段 */
  xField?: string
  /** Y轴字段列表 */
  yFields?: string[]
  /** 颜色列表 */
  colors?: string[]
  /** 布局方向 */
  layout?: 'vertical' | 'horizontal'
  /** 堆叠模式 */
  stacked?: boolean
  /** 渐变填充 */
  gradient?: boolean
  /** 圆角 */
  borderRadius?: number
  /** 柱间距 */
  barGap?: string
  /** 显示网格 */
  showGrid?: boolean
  /** 显示图例 */
  showLegend?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** X轴标签 */
  xAxisLabel?: string
  /** Y轴标签 */
  yAxisLabel?: string
  /** 显示X轴 */
  xAxisVisible?: boolean
  /** 显示Y轴 */
  yAxisVisible?: boolean
  /** 类目标签旋转角度 */
  axisLabelRotate?: number
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

interface SeriesOptions {
  stacked: boolean
  gradient: boolean
  borderRadius: number
  glowEffect: boolean
  layout: string
  barGap?: string
}

const getLegendLayout = (position: NonNullable<BarChartProps['legendPosition']>) => {
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

// 获取渐变色
const getGradientColor = (color: string, isVertical: boolean) =>
  new echarts.graphic.LinearGradient(isVertical ? 0 : 1, isVertical ? 1 : 0, isVertical ? 0 : 0, isVertical ? 0 : 1, [
    { offset: 0, color: `${color}99` },
    { offset: 1, color },
  ])

// 构建单个 series 配置
const createBarSeries = (field: string, data: DataPoint[], color: string, options: SeriesOptions): SeriesOption => {
  const { stacked, gradient, borderRadius, glowEffect, layout } = options
  const isVertical = layout === 'vertical'

  return {
    name: field,
    type: 'bar' as const,
    data: data.map(item => item[field] as number),
    stack: stacked ? 'total' : undefined,
    barGap: options.barGap,
    itemStyle: {
      color: gradient ? getGradientColor(color, isVertical) : color,
      borderRadius,
      shadowColor: glowEffect ? color : 'transparent',
      shadowBlur: glowEffect ? 6 : 0,
    },
  }
}

// 构建 series 配置
const buildSeries = (yFields: string[], data: DataPoint[], colors: string[], options: SeriesOptions): SeriesOption[] =>
  yFields.map((field, index) => {
    const color = colors[index % colors.length]
    return createBarSeries(field, data, color, options)
  })

// 构建图表配置
const buildOption = (
  data: DataPoint[],
  xField: string,
  series: SeriesOption[],
  options: {
    layout: string
    showGrid: boolean
    showLegend: boolean
    showTooltip: boolean
    legendPosition: NonNullable<BarChartProps['legendPosition']>
    xAxisLabel: string
    yAxisLabel: string
    xAxisVisible: boolean
    yAxisVisible: boolean
    axisLabelRotate: number
    theme: ReturnType<typeof resolveMaterialTheme>
  },
) => {
  const {
    layout,
    showGrid,
    showLegend,
    showTooltip,
    legendPosition,
    xAxisLabel,
    yAxisLabel,
    xAxisVisible,
    yAxisVisible,
    axisLabelRotate,
    theme,
  } = options
  const isHorizontal = layout === 'horizontal'
  const defaultGridLeft = isHorizontal ? 80 : 50
  const categoryAxisLabel = isHorizontal ? yAxisLabel : xAxisLabel
  const valueAxisLabel = isHorizontal ? xAxisLabel : yAxisLabel
  const categoryAxisVisible = isHorizontal ? yAxisVisible : xAxisVisible
  const valueAxisVisible = isHorizontal ? xAxisVisible : yAxisVisible
  return {
    backgroundColor: 'transparent',
    grid: {
      top: showLegend && legendPosition === 'top' ? 48 : 20,
      right: showLegend && legendPosition === 'right' ? 96 : 20,
      bottom: showLegend && legendPosition === 'bottom' ? 48 : 30,
      left: showLegend && legendPosition === 'left' ? 96 : defaultGridLeft,
      containLabel: false,
    },
    xAxis: {
      type: isHorizontal ? 'value' : 'category',
      show: isHorizontal ? valueAxisVisible : categoryAxisVisible,
      name: isHorizontal ? valueAxisLabel : categoryAxisLabel,
      data: isHorizontal ? undefined : data.map(item => item[xField]),
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: theme.mutedForeground,
        fontSize: isHorizontal ? 11 : 12,
        rotate: isHorizontal ? 0 : axisLabelRotate,
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
      type: isHorizontal ? 'category' : 'value',
      show: isHorizontal ? categoryAxisVisible : valueAxisVisible,
      name: isHorizontal ? categoryAxisLabel : valueAxisLabel,
      data: isHorizontal ? data.map(item => item[xField]) : undefined,
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: theme.mutedForeground,
        fontSize: isHorizontal ? 12 : 11,
        rotate: isHorizontal ? axisLabelRotate : 0,
      },
      splitLine: {
        show: showGrid && !isHorizontal,
        lineStyle: {
          color: theme.grid,
          type: 'dashed',
        },
      },
    },
    tooltip: showTooltip
      ? {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: theme.tooltipBackground,
          borderColor: theme.tooltipBorder,
          borderWidth: 1,
          textStyle: {
            color: theme.tooltipForeground,
          },
        }
      : undefined,
    legend: showLegend
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

export const BarChart: React.FC<BarChartProps> = ({
  ref,
  $data,
  __dataSource,
  xField = 'name',
  yFields = ['value1', 'value2'],
  colors = DEFAULT_COLORS,
  layout = 'vertical',
  stacked = false,
  gradient = false,
  borderRadius = 4,
  barGap = '20%',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  legendPosition = 'bottom',
  xAxisLabel = '',
  yAxisLabel = '',
  xAxisVisible = true,
  yAxisVisible = true,
  axisLabelRotate = 0,
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
  const data = useMemo<DataPoint[]>(
    () =>
      dataSource
        .filter(item => item[xField] !== undefined && yFields.some(field => Number.isFinite(Number(item[field]))))
        .map(item => {
          const point: DataPoint = { name: String(item[xField]) }
          point[xField] = String(item[xField])
          for (const field of yFields) {
            if (item[field] !== undefined && Number.isFinite(Number(item[field]))) {
              point[field] = Number(item[field])
            }
          }
          return point
        }),
    [dataSource, xField, yFields],
  )

  useEffect(() => {
    if (!chartRef.current || data.length === 0) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const theme = resolveMaterialTheme(chartRef.current)
    const resolvedColors =
      colors === DEFAULT_COLORS || colors.length === 0 ? resolveMaterialChartColors(chartRef.current) : colors

    // 构建 series
    const series = buildSeries(yFields, data, resolvedColors, {
      stacked,
      gradient,
      borderRadius,
      glowEffect,
      layout,
      barGap,
    })

    const option = buildOption(data, xField, series, {
      layout,
      showGrid,
      showLegend,
      showTooltip,
      legendPosition,
      xAxisLabel,
      yAxisLabel,
      xAxisVisible,
      yAxisVisible,
      axisLabelRotate,
      theme,
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
    xField,
    yFields,
    colors,
    layout,
    stacked,
    gradient,
    borderRadius,
    barGap,
    showGrid,
    showLegend,
    showTooltip,
    legendPosition,
    xAxisLabel,
    yAxisLabel,
    xAxisVisible,
    yAxisVisible,
    axisLabelRotate,
    glowEffect,
  ])

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

export default BarChart
