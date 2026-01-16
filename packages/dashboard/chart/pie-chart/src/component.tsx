import { useEffect, useRef, type CSSProperties, type Ref } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { DEFAULT_COLORS, DEFAULT_DATA } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface PieDataItem {
  name: string
  value: number
}

interface PieChartProps {
  ref?: Ref<HTMLDivElement>
  data?: PieDataItem[]
  innerRadius?: string
  outerRadius?: string
  colors?: string[]
  showLabel?: boolean
  labelType?: 'percent' | 'value' | 'name'
  showLegend?: boolean
  showTooltip?: boolean
  glowEffect?: boolean
  roseType?: boolean
  style?: CSSProperties
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

const PieChartComponent = (props: PieChartProps) => {
  const {
    ref,
    data = DEFAULT_DATA,
    innerRadius = '0%',
    outerRadius = '70%',
    colors = DEFAULT_COLORS,
    showLabel = true,
    labelType = 'percent',
    showLegend = true,
    showTooltip = true,
    glowEffect = true,
    roseType = false,
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
    ...externalStyle,
  }

  return (
    <div className={styles.container} ref={ref} style={containerStyle}>
      <div className={styles.chart} ref={chartRef} />
    </div>
  )
}

export default PieChartComponent
