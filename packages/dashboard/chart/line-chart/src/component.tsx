/**
 * Line Chart Component
 * 折线图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { LineChart as EChartsLineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { SeriesOption } from 'echarts'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, DEFAULT_DATA, type DataPoint } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsLineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export interface LineChartProps extends MaterialComponet {
  /** X轴字段 */
  xField?: string
  /** Y轴字段列表 */
  yFields?: string[]
  /** 颜色列表 */
  colors?: string[]
  /** 显示网格 */
  showGrid?: boolean
  /** 显示图例 */
  showLegend?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 发光效果 */
  glowEffect?: boolean
  /** 线条宽度 */
  strokeWidth?: number
  /** 区域填充 */
  areaFill?: boolean
  /** 平滑曲线 */
  smooth?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

// 构建 series 配置
const buildSeries = (
  yFields: string[],
  data: DataPoint[],
  colors: string[],
  options: {
    smooth: boolean
    strokeWidth: number
    glowEffect: boolean
    areaFill: boolean
  },
): SeriesOption[] => {
  const { smooth, strokeWidth, glowEffect, areaFill } = options
  return yFields.map((field, index) => {
    const color = colors[index % colors.length]
    return {
      name: field,
      type: 'line' as const,
      data: data.map(item => item[field] as number),
      smooth,
      lineStyle: {
        width: strokeWidth,
        color,
        shadowColor: glowEffect ? color : 'transparent',
        shadowBlur: glowEffect ? 10 : 0,
      },
      itemStyle: {
        color,
      },
      areaStyle: areaFill
        ? {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: `${color}05` },
            ]),
          }
        : undefined,
      symbol: 'circle',
      symbolSize: 6,
    }
  })
}

// 构建图表配置
const buildOption = (
  data: DataPoint[],
  xField: string,
  series: SeriesOption[],
  options: {
    showGrid: boolean
    showLegend: boolean
    showTooltip: boolean
  },
) => {
  const { showGrid, showLegend, showTooltip } = options

  return {
    backgroundColor: 'transparent',
    grid: {
      top: showLegend ? 40 : 20,
      right: 20,
      bottom: 30,
      left: 50,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item[xField]),
      axisLine: {
        lineStyle: {
          color: '#8899aa',
          opacity: 0.3,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#8899aa',
        fontSize: 12,
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
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#8899aa',
          opacity: 0.3,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#8899aa',
        fontSize: 11,
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
    tooltip: showTooltip
      ? {
          trigger: 'axis',
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

export const LineChart: React.FC<LineChartProps> = ({
  ref,
  $data,
  __dataSource,
  xField = 'name',
  yFields = ['value1', 'value2'],
  colors = DEFAULT_COLORS,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  glowEffect = true,
  strokeWidth = 2,
  areaFill = false,
  smooth = true,
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
    if (dataSource.length > 0) {
      return dataSource as DataPoint[]
    }
    return DEFAULT_DATA
  }, [dataSource])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    // 构建 series
    const series = buildSeries(yFields, data, colors, {
      smooth,
      strokeWidth,
      glowEffect,
      areaFill,
    })

    const option = buildOption(data, xField, series, {
      showGrid,
      showLegend,
      showTooltip,
    })

    chartInstance.current.setOption(option)

    // 响应式调整
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.current?.dispose()
    }
  }, [data, xField, yFields, colors, showGrid, showLegend, showTooltip, glowEffect, strokeWidth, areaFill, smooth])

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
