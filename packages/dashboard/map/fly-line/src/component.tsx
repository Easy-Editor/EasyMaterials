/**
 * Fly Line Component
 * 飞线/迁徙图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useRef, useMemo, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { LinesChart, EffectScatterChart, MapChart } from 'echarts/charts'
import { GeoComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import {
  DEFAULT_FLY_LINES,
  DEFAULT_SCATTER_POINTS,
  DEFAULT_COLORS,
  type FlyLineData,
  type ScatterPoint,
  type MapType,
} from './constants'
import chinaGeoJson from './assets/geo/china.json'
import worldGeoJson from './assets/geo/world.json'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([LinesChart, EffectScatterChart, MapChart, GeoComponent, TooltipComponent, CanvasRenderer])

// 内置地图数据
const BUILTIN_MAP_JSON: Record<MapType, object> = {
  china: chinaGeoJson as object,
  world: worldGeoJson as object,
}

// 已注册的地图
const registeredMaps = new Set<string>()

export interface FlyLineProps extends MaterialComponet {
  /** 地图类型 */
  mapType?: MapType
  /** 地图 GeoJSON 数据 */
  mapJson?: object
  /** 飞线数据（兼容旧版） */
  flyLines?: FlyLineData[]
  /** 散点数据（兼容旧版） */
  scatterPoints?: ScatterPoint[]
  /** 飞线颜色 */
  lineColor?: string
  /** 飞线发光颜色 */
  lineGlowColor?: string
  /** 散点颜色 */
  scatterColor?: string
  /** 地图区域颜色 */
  areaColor?: string
  /** 地图边框颜色 */
  borderColor?: string
  /** 是否显示散点 */
  showScatter?: boolean
  /** 是否显示飞线动画 */
  showAnimation?: boolean
  /** 飞线动画速度 */
  animationSpeed?: number
  /** 飞线曲率 */
  curveness?: number
  /** 是否显示提示框 */
  showTooltip?: boolean
  /** 是否允许缩放拖拽 */
  roam?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

export const FlyLine: React.FC<FlyLineProps> = ({
  ref,
  $data,
  __dataSource,
  mapType = 'china',
  mapJson,
  flyLines: staticFlyLines,
  scatterPoints = DEFAULT_SCATTER_POINTS,
  lineColor = DEFAULT_COLORS.lineColor,
  lineGlowColor = DEFAULT_COLORS.lineGlowColor,
  scatterColor = DEFAULT_COLORS.scatterColor,
  areaColor = DEFAULT_COLORS.areaColor,
  borderColor = DEFAULT_COLORS.borderColor,
  showScatter = true,
  showAnimation = true,
  animationSpeed = 2,
  curveness = 0.3,
  showTooltip = true,
  roam = false,
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
  const flyLines = useMemo<FlyLineData[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as FlyLineData[]
    }
    return staticFlyLines ?? DEFAULT_FLY_LINES
  }, [dataSource, staticFlyLines])

  // 转换飞线数据为 ECharts 格式
  const linesData = useMemo(
    () =>
      flyLines.map(line => ({
        fromName: line.fromName,
        toName: line.toName,
        coords: [line.fromCoord, line.toCoord],
        value: line.value,
      })),
    [flyLines],
  )

  // 转换散点数据为 ECharts 格式
  const scatterData = useMemo(
    () =>
      scatterPoints.map(point => ({
        name: point.name,
        value: [...point.coord, point.value ?? 10],
      })),
    [scatterPoints],
  )

  // 构建 ECharts 配置
  const option = useMemo(() => {
    const series: EChartsOption['series'] = []

    // 飞线系列
    series.push({
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      effect: showAnimation
        ? {
            show: true,
            period: 6 / animationSpeed,
            trailLength: 0.4,
            symbol: 'arrow',
            symbolSize: 6,
            color: lineGlowColor,
          }
        : { show: false },
      lineStyle: {
        color: lineColor,
        width: 1.5,
        opacity: 0.6,
        curveness,
      },
      data: linesData,
    })

    // 散点系列
    if (showScatter) {
      series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 3,
        },
        symbol: 'circle',
        symbolSize: (val: number[]) => Math.max(8, (val[2] ?? 10) / 10),
        itemStyle: {
          color: scatterColor,
          shadowBlur: 10,
          shadowColor: scatterColor,
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#fff',
          fontSize: 11,
        },
        data: scatterData,
      })
    }

    return {
      backgroundColor: 'transparent',
      tooltip: showTooltip
        ? {
            trigger: 'item',
            backgroundColor: 'rgba(0, 20, 40, 0.9)',
            borderColor: 'rgba(0, 200, 255, 0.3)',
            textStyle: { color: '#fff' },
            formatter: (params: { name?: string; value?: number[] }) => {
              if (params.name) {
                return params.name
              }
              return ''
            },
          }
        : undefined,
      geo: {
        map: mapType,
        roam,
        zoom: 1.2,
        center: mapType === 'china' ? [105, 36] : undefined,
        itemStyle: {
          areaColor,
          borderColor,
          borderWidth: 1,
          shadowColor: 'rgba(0, 200, 255, 0.2)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(0, 100, 150, 0.8)',
          },
          label: {
            show: false,
          },
        },
        silent: true,
      },
      series,
    }
  }, [
    mapType,
    linesData,
    scatterData,
    lineColor,
    lineGlowColor,
    scatterColor,
    areaColor,
    borderColor,
    showScatter,
    showAnimation,
    animationSpeed,
    curveness,
    showTooltip,
    roam,
  ])

  // 注册地图并初始化图表
  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    // 获取地图数据：优先使用用户提供的 mapJson，否则使用内置地图
    const geoJson = mapJson || BUILTIN_MAP_JSON[mapType]

    // 注册地图（避免重复注册）
    const mapKey = mapJson ? `custom_${mapType}` : mapType
    if (!registeredMaps.has(mapKey) && geoJson) {
      echarts.registerMap(mapType, geoJson as Parameters<typeof echarts.registerMap>[1])
      registeredMaps.add(mapKey)
    }

    // 初始化图表
    chartInstance.current = echarts.init(chartRef.current)
    chartInstance.current.setOption(option)

    // 响应式调整
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [mapType, mapJson])

  // 更新配置
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(option, { notMerge: true })
    }
  }, [option])

  const containerStyle: CSSProperties = {
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

