import { useEffect, useRef, type CSSProperties, type Ref } from 'react'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { DEFAULT_COLORS, DEFAULT_DATA, type ScatterPoint } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([ScatterChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

interface ScatterChartProps {
  ref?: Ref<HTMLDivElement>
  data?: ScatterPoint[]
  xLabel?: string
  yLabel?: string
  colors?: string[]
  pointSize?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  glowEffect?: boolean
  style?: CSSProperties
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

const ScatterChartComponent = (props: ScatterChartProps) => {
  const {
    ref,
    data = DEFAULT_DATA,
    xLabel = 'X',
    yLabel = 'Y',
    colors = DEFAULT_COLORS,
    pointSize = 10,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    glowEffect = true,
    style: externalStyle,
  } = props

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

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
    ...externalStyle,
  }

  return (
    <div className={styles.container} ref={ref} style={containerStyle}>
      <div className={styles.chart} ref={chartRef} />
    </div>
  )
}

export default ScatterChartComponent
