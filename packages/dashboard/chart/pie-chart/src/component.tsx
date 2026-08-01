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
import { escapeTooltipHtml } from './tooltip'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsPieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface PieDataItem {
  name: string
  value: number
}

export interface PieChartProps extends MaterialComponet {
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
  } = options

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
          formatter: (params: { name: string; value: number; percent: number }) =>
            `${escapeTooltipHtml(params.name)}: ${escapeTooltipHtml(params.value)} (${escapeTooltipHtml(params.percent.toFixed(1))}%)`,
        }
      : undefined,
    legend: showLegend
      ? {
          ...getLegendLayout(legendPosition),
          textStyle: {
            color: theme.mutedForeground,
            fontSize: 11,
          },
          formatter: (name: string) => (name.length > 10 ? `${name.slice(0, 10)}...` : name),
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: [normalizeRadius(innerRadius), normalizeRadius(outerRadius)],
        center: getPieCenter(showLegend, legendPosition),
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
        label: showLabel
          ? {
              show: true,
              color: theme.mutedForeground,
              fontSize: 11,
              formatter: (params: { name: string; value: number; percent: number }) => formatLabel(params, labelType),
            }
          : { show: false },
        labelLine: showLabel
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
  legendPosition = 'right',
  glowEffect = false,
  roseType = false,
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

export default PieChart
