import { useEffect, useRef, type CSSProperties, type Ref } from 'react'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { DEFAULT_DATA, DEFAULT_SERIES, type RadarDataPoint } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface RadarSeries {
  name: string
  dataKey: string
  color: string
}

interface RadarChartProps {
  ref?: Ref<HTMLDivElement>
  data?: RadarDataPoint[]
  dimensionKey?: string
  series?: RadarSeries[]
  showGrid?: boolean
  fillOpacity?: number
  glowEffect?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  style?: CSSProperties
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

const RadarChartComponent = (props: RadarChartProps) => {
  const {
    ref,
    data = DEFAULT_DATA,
    dimensionKey = 'dimension',
    series = DEFAULT_SERIES,
    showGrid = true,
    fillOpacity = 0.3,
    glowEffect = true,
    showLegend = true,
    showTooltip = true,
    style: externalStyle,
  } = props

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

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
    ...externalStyle,
  }

  return (
    <div className={styles.container} ref={ref} style={containerStyle}>
      <div className={styles.chart} ref={chartRef} />
    </div>
  )
}

export default RadarChartComponent
