/**
 * Radar Chart Component
 * 雷达图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { RadarChart as EChartsRadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import { DEFAULT_DATA, DEFAULT_SERIES, type RadarDataPoint } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsRadarChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface RadarSeries {
  name: string
  dataKey: string
  color: string
}

export interface RadarChartProps extends MaterialComponet {
  /** 静态数据（兼容旧版） */
  data?: RadarDataPoint[]
  /** 维度字段 */
  dimensionKey?: string
  /** 系列配置 */
  series?: RadarSeries[]
  /** 显示网格 */
  showGrid?: boolean
  /** 填充透明度 */
  fillOpacity?: number
  /** 发光效果 */
  glowEffect?: boolean
  /** 显示图例 */
  showLegend?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

// 构建图表配置
const buildOption = (
  data: RadarDataPoint[],
  dimensionKey: string,
  series: RadarSeries[],
  options: {
    showGrid: boolean
    fillOpacity: number
    glowEffect: boolean
    showLegend: boolean
    showTooltip: boolean
  },
): EChartsOption => {
  const { showGrid, fillOpacity, glowEffect, showLegend, showTooltip } = options

  // 提取维度名称
  const indicators = data.map(item => ({
    name: item[dimensionKey] as string,
    max: 100,
  }))

  // 构建 series 数据
  const seriesData = series.map(s => ({
    name: s.name,
    value: data.map(item => item[s.dataKey] as number),
    itemStyle: {
      color: s.color,
      shadowColor: glowEffect ? s.color : 'transparent',
      shadowBlur: glowEffect ? 10 : 0,
    },
    lineStyle: {
      color: s.color,
      width: 2,
      shadowColor: glowEffect ? s.color : 'transparent',
      shadowBlur: glowEffect ? 10 : 0,
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: `${s.color}${Math.round(fillOpacity * 255)
            .toString(16)
            .padStart(2, '0')}`,
        },
        { offset: 1, color: `${s.color}10` },
      ]),
    },
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: showTooltip
      ? {
          trigger: 'item',
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
          bottom: 10,
          textStyle: {
            color: '#8899aa',
            fontSize: 11,
          },
        }
      : undefined,
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#8899aa',
        fontSize: 11,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#1a3a5c',
          opacity: 0.6,
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        show: showGrid,
        lineStyle: {
          color: '#1a3a5c',
          opacity: 0.6,
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: seriesData,
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  }
}

export const RadarChart: React.FC<RadarChartProps> = ({
  ref,
  $data,
  __dataSource,
  data: staticData,
  dimensionKey = 'dimension',
  series = DEFAULT_SERIES,
  showGrid = true,
  fillOpacity = 0.3,
  glowEffect = true,
  showLegend = true,
  showTooltip = true,
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
  const data = useMemo<RadarDataPoint[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as RadarDataPoint[]
    }
    return staticData ?? DEFAULT_DATA
  }, [dataSource, staticData])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const option = buildOption(data, dimensionKey, series, {
      showGrid,
      fillOpacity,
      glowEffect,
      showLegend,
      showTooltip,
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
  }, [data, dimensionKey, series, showGrid, fillOpacity, glowEffect, showLegend, showTooltip])

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
