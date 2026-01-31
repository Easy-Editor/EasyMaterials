/**
 * Scatter Chart Component
 * 散点图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { ScatterChart as EChartsScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, DEFAULT_DATA, type ScatterPoint } from './constants'
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
  options: {
    xLabel: string
    yLabel: string
    colors: string[]
    pointSize: number
    showGrid: boolean
    showLegend: boolean
    showTooltip: boolean
    glowEffect: boolean
  },
) => {
  const { xLabel, yLabel, colors, pointSize, showGrid, showLegend, showTooltip, glowEffect } = options

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
        shadowBlur: glowEffect ? 10 : 0,
      },
    }
  })

  return {
    backgroundColor: 'transparent',
    grid: {
      top: showLegend && hasMultipleCategories ? 40 : 20,
      right: 20,
      bottom: 50,
      left: 60,
      containLabel: false,
    },
    xAxis: {
      type: 'value',
      name: xLabel,
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: '#8899aa',
        fontSize: 12,
      },
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
    yAxis: {
      type: 'value',
      name: yLabel,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: '#8899aa',
        fontSize: 12,
      },
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
          trigger: 'item',
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00d4ff',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
          formatter: (params: { value: number[]; seriesName: string }) =>
            `${params.seriesName}<br/>X: ${params.value[0]}<br/>Y: ${params.value[1]}`,
        }
      : undefined,
    legend:
      showLegend && hasMultipleCategories
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

export const ScatterChart: React.FC<ScatterChartProps> = ({
  ref,
  $data,
  __dataSource,
  data: staticData,
  xLabel = 'X',
  yLabel = 'Y',
  colors = DEFAULT_COLORS,
  pointSize = 10,
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
  const data = useMemo<ScatterPoint[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as ScatterPoint[]
    }
    return staticData ?? DEFAULT_DATA
  }, [dataSource, staticData])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const option = buildOption(data, {
      xLabel,
      yLabel,
      colors,
      pointSize,
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
  }, [data, xLabel, yLabel, colors, pointSize, showGrid, showLegend, showTooltip, glowEffect])

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
