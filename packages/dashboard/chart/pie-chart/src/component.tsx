/**
 * Pie Chart Component
 * 饼图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { PieChart as EChartsPieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, DEFAULT_DATA } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsPieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface PieDataItem {
  name: string
  value: number
}

export interface PieChartProps extends MaterialComponet {
  /** 内半径 */
  innerRadius?: string
  /** 外半径 */
  outerRadius?: string
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
  /** 发光效果 */
  glowEffect?: boolean
  /** 玫瑰图 */
  roseType?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
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
  options: {
    innerRadius: string
    outerRadius: string
    showLegend: boolean
    showTooltip: boolean
    showLabel: boolean
    labelType: string
    glowEffect: boolean
    roseType: boolean
    colors: string[]
  },
) => {
  const { innerRadius, outerRadius, showLegend, showTooltip, showLabel, labelType, glowEffect, roseType, colors } =
    options

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
          formatter: (params: { name: string; value: number; percent: number }) =>
            `${params.name}: ${params.value} (${params.percent.toFixed(1)}%)`,
        }
      : undefined,
    legend: showLegend
      ? {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: '#8899aa',
            fontSize: 11,
          },
          formatter: (name: string) => (name.length > 10 ? `${name.slice(0, 10)}...` : name),
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: [innerRadius, outerRadius],
        center: showLegend ? ['40%', '50%'] : ['50%', '50%'],
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
            shadowBlur: glowEffect ? 10 : 0,
          },
        })),
        label: showLabel
          ? {
              show: true,
              color: '#8899aa',
              fontSize: 11,
              formatter: (params: { name: string; value: number; percent: number }) => formatLabel(params, labelType),
            }
          : { show: false },
        labelLine: showLabel
          ? {
              show: true,
              lineStyle: {
                color: '#8899aa',
              },
            }
          : { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 212, 255, 0.5)',
          },
        },
      },
    ],
  }
}

export const PieChart: React.FC<PieChartProps> = ({
  ref,
  $data,
  __dataSource,
  innerRadius = '0%',
  outerRadius = '70%',
  colors = DEFAULT_COLORS,
  showLabel = true,
  labelType = 'percent',
  showLegend = true,
  showTooltip = true,
  glowEffect = true,
  roseType = false,
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
  const data = useMemo<PieDataItem[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as PieDataItem[]
    }
    return DEFAULT_DATA
  }, [dataSource])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartInstance.current = echarts.init(chartRef.current)

    const option = buildOption(data, {
      innerRadius,
      outerRadius,
      showLegend,
      showTooltip,
      showLabel,
      labelType,
      glowEffect,
      roseType,
      colors,
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
  }, [data, innerRadius, outerRadius, colors, showLabel, labelType, showLegend, showTooltip, glowEffect, roseType])

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
