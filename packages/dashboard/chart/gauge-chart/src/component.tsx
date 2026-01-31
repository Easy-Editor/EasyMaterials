/**
 * Gauge Chart Component
 * 仪表盘组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { GaugeChart as EChartsGaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import { DEFAULT_RANGES, type GaugeRange } from './constants'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([EChartsGaugeChart, TooltipComponent, CanvasRenderer])

export interface GaugeChartProps extends MaterialComponet {
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 单位 */
  unit?: string
  /** 显示刻度 */
  showScale?: boolean
  /** 刻度数量 */
  divisions?: number
  /** 显示刻度值 */
  showLabels?: boolean
  /** 指针类型 */
  pointerType?: 'needle' | 'triangle' | 'rect'
  /** 指针颜色 */
  pointerColor?: string
  /** 颜色区间 */
  ranges?: GaugeRange[]
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

export const GaugeChart: React.FC<GaugeChartProps> = ({
  ref,
  $data,
  __dataSource,
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

  // 解析数据源（单值）
  const dataSource = useDataSource($data, __dataSource)
  const value = useMemo<number>(() => {
    if (dataSource.length > 0 && dataSource[0]?.value !== undefined) {
      return Number(dataSource[0].value)
    }
    return 0
  }, [dataSource])

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
          center: ['50%', '80%'],
          radius: '72%',
          progress: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 16,
              color: axisLineColors,
              shadowColor: glowEffect ? 'rgba(0, 212, 255, 0.3)' : 'transparent',
              shadowBlur: glowEffect ? 10 : 0,
            },
          },
          axisTick: {
            show: showScale,
            distance: -20,
            length: 4,
            lineStyle: {
              color: '#8899aa',
              width: 1,
            },
            splitNumber: divisions / 5,
          },
          splitLine: {
            show: showScale,
            distance: -24,
            length: 8,
            lineStyle: {
              color: '#8899aa',
              width: 2,
            },
          },
          axisLabel: {
            show: showLabels,
            distance: -32,
            color: '#8899aa',
            fontSize: 9,
          },
          pointer: {
            show: true,
            length: '55%',
            width: pointerWidth,
            itemStyle: {
              color: pointerColor,
              shadowColor: glowEffect ? pointerColor : 'transparent',
              shadowBlur: glowEffect ? 10 : 0,
            },
          },
          anchor: {
            show: true,
            size: 10,
            itemStyle: {
              color: pointerColor,
              shadowColor: glowEffect ? pointerColor : 'transparent',
              shadowBlur: glowEffect ? 5 : 0,
            },
          },
          title: {
            show: true,
            offsetCenter: [0, '20%'],
            color: '#8899aa',
            fontSize: 11,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '40%'],
            fontSize: 22,
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
