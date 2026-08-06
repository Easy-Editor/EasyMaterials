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
import {
  MaterialEmptyState,
  type MaterialComponet,
  resolveMaterialChartColors,
  resolveMaterialTheme,
  shouldHideEmptyMaterial,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_SERIES, type RadarDataPoint } from './constants'
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
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

const getLegendLayout = (position: NonNullable<RadarChartProps['legendPosition']>) => {
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
    legendPosition: NonNullable<RadarChartProps['legendPosition']>
    theme: ReturnType<typeof resolveMaterialTheme>
  },
): EChartsOption => {
  const { showGrid, fillOpacity, glowEffect, showLegend, showTooltip, legendPosition, theme } = options

  // 提取维度名称
  const indicators = data.map(item => ({
    name: String(item[dimensionKey]),
    max: 100,
  }))

  // 构建 series 数据
  const seriesData = series.map(s => ({
    name: s.name,
    value: data.map(item => item[s.dataKey] as number),
    itemStyle: {
      color: s.color,
      shadowColor: glowEffect ? s.color : 'transparent',
      shadowBlur: glowEffect ? 6 : 0,
    },
    lineStyle: {
      color: s.color,
      width: 2,
      shadowColor: glowEffect ? s.color : 'transparent',
      shadowBlur: glowEffect ? 6 : 0,
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
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: theme.mutedForeground,
        fontSize: 11,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: theme.grid,
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        show: showGrid,
        lineStyle: {
          color: theme.grid,
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
  glowEffect = false,
  showLegend = true,
  showTooltip = true,
  legendPosition = 'bottom',
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
  const data = useMemo<RadarDataPoint[]>(
    () => ($data ? dataSource : (staticData ?? dataSource)) as RadarDataPoint[],
    [$data, dataSource, staticData],
  )

  const validSeries = useMemo(
    () => (Array.isArray(series) ? series.filter(item => item?.name && item.dataKey && item.color) : []),
    [series],
  )
  const isEmpty = data.length === 0 || validSeries.length === 0

  useEffect(() => {
    if (!chartRef.current || isEmpty) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const theme = resolveMaterialTheme(chartRef.current)
    const chartColors = resolveMaterialChartColors(chartRef.current)
    const resolvedSeries =
      series === DEFAULT_SERIES
        ? validSeries.map((item, index) => ({ ...item, color: chartColors[index % chartColors.length] }))
        : validSeries

    const option = buildOption(data, dimensionKey, resolvedSeries, {
      showGrid,
      fillOpacity,
      glowEffect,
      showLegend,
      showTooltip,
      legendPosition,
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
    dimensionKey,
    validSeries,
    showGrid,
    fillOpacity,
    glowEffect,
    showLegend,
    showTooltip,
    legendPosition,
    isEmpty,
  ])

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

export default RadarChart
