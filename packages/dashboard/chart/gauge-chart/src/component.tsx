import { useEffect, useRef, type CSSProperties, type Ref } from 'react'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { DEFAULT_RANGES, type GaugeRange } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([GaugeChart, TooltipComponent, CanvasRenderer])

interface GaugeChartProps {
  ref?: Ref<HTMLDivElement>
  value?: number
  min?: number
  max?: number
  unit?: string
  showScale?: boolean
  divisions?: number
  showLabels?: boolean
  pointerType?: 'needle' | 'triangle' | 'rect'
  pointerColor?: string
  ranges?: GaugeRange[]
  glowEffect?: boolean
  style?: CSSProperties
}

const GaugeChartComponent = (props: GaugeChartProps) => {
  const {
    ref,
    value = 0,
    min = 0,
    max = 100,
    unit = '',
    showScale = true,
    divisions = 10,
    showLabels = true,
    pointerType = 'needle',
    pointerColor = '#00d4ff',
    ranges = DEFAULT_RANGES,
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

    // 构建颜色区间
    const axisLineColors: [number, string][] = ranges.map(range => [(range.to - min) / (max - min), range.color])

    // 指针宽度根据类型调整
    const pointerWidthMap: Record<string, number> = {
      needle: 4,
      triangle: 8,
      rect: 6,
    }
    const pointerWidth = pointerWidthMap[pointerType] ?? 6

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          min,
          max,
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '70%'],
          radius: '90%',
          progress: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 20,
              color: axisLineColors,
              shadowColor: glowEffect ? 'rgba(0, 212, 255, 0.3)' : 'transparent',
              shadowBlur: glowEffect ? 10 : 0,
            },
          },
          axisTick: {
            show: showScale,
            distance: -25,
            length: 6,
            lineStyle: {
              color: '#8899aa',
              width: 1,
            },
            splitNumber: divisions / 5,
          },
          splitLine: {
            show: showScale,
            distance: -30,
            length: 12,
            lineStyle: {
              color: '#8899aa',
              width: 2,
            },
          },
          axisLabel: {
            show: showLabels,
            distance: -40,
            color: '#8899aa',
            fontSize: 10,
          },
          pointer: {
            show: true,
            length: '60%',
            width: pointerWidth,
            itemStyle: {
              color: pointerColor,
              shadowColor: glowEffect ? pointerColor : 'transparent',
              shadowBlur: glowEffect ? 10 : 0,
            },
          },
          anchor: {
            show: true,
            size: 12,
            itemStyle: {
              color: pointerColor,
              shadowColor: glowEffect ? pointerColor : 'transparent',
              shadowBlur: glowEffect ? 5 : 0,
            },
          },
          title: {
            show: true,
            offsetCenter: [0, '30%'],
            color: '#8899aa',
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '50%'],
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            formatter: (val: number) => `${val}${unit}`,
            textShadowColor: glowEffect ? 'rgba(0, 212, 255, 0.5)' : 'transparent',
            textShadowBlur: glowEffect ? 10 : 0,
          },
          data: [{ value }],
        },
      ],
    }

    chartInstance.current.setOption(option)

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.current?.dispose()
    }
  }, [value, min, max, unit, showScale, divisions, showLabels, pointerType, pointerColor, ranges, glowEffect])

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

export default GaugeChartComponent
