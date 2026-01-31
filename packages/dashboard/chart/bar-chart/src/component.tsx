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
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
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
      shadowBlur: glowEffect ? 10 : 0,
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
    glowEffect: boolean
  },
) => {
  const { layout, showGrid, showLegend, showTooltip } = options
  const isHorizontal = layout === 'horizontal'

  return {
    backgroundColor: 'transparent',
    grid: {
      top: showLegend ? 40 : 20,
      right: 20,
      bottom: 30,
      left: isHorizontal ? 80 : 50,
      containLabel: false,
    },
    xAxis: {
      type: isHorizontal ? 'value' : 'category',
      data: isHorizontal ? undefined : data.map(item => item[xField]),
      axisLine: {
        lineStyle: {
          color: '#8899aa',
          opacity: 0.3,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#8899aa',
        fontSize: isHorizontal ? 11 : 12,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#00d4ff',
          opacity: 0.1,
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: isHorizontal ? 'category' : 'value',
      data: isHorizontal ? data.map(item => item[xField]) : undefined,
      axisLine: {
        lineStyle: {
          color: '#8899aa',
          opacity: 0.3,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#8899aa',
        fontSize: isHorizontal ? 12 : 11,
      },
      splitLine: {
        show: showGrid && !isHorizontal,
        lineStyle: {
          color: '#00d4ff',
          opacity: 0.1,
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
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00d4ff',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
        }
      : undefined,
    legend: showLegend
      ? {
          show: true,
          top: 10,
          textStyle: {
            color: '#8899aa',
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
  gradient = true,
  borderRadius = 4,
  barGap = '20%',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  glowEffect = true,
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
  const data = useMemo<DataPoint[]>(() => {
    if (dataSource.length > 0 && dataSource[0]?.name && dataSource[0]?.value1 && dataSource[0]?.value2) {
      return dataSource.map(item => ({
        name: String(item.name),
        value1: Number(item.value1),
        value2: Number(item.value2),
      }))
    }
    return []
  }, [dataSource])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    // 构建 series
    const series = buildSeries(yFields, data, colors, {
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
      <div className={styles.chart} ref={chartRef} />
    </div>
  )
}

export default BarChart
