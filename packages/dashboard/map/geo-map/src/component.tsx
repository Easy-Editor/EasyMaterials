/**
 * Geo Map Component
 * 地理地图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useRef, useMemo, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { MapChart, EffectScatterChart } from 'echarts/charts'
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import {
  DEFAULT_COLORS,
  DEFAULT_REGION_DATA,
  DEFAULT_SCATTER_DATA,
  type MapDataPoint,
  type ScatterPoint,
  type MapType,
} from './constants'
import chinaGeoJson from './assets/geo/china.json'
import worldGeoJson from './assets/geo/world.json'
import styles from './component.module.css'

// 按需注册 ECharts 组件
echarts.use([MapChart, EffectScatterChart, GeoComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

// 内置地图数据
const BUILTIN_MAP_JSON: Record<MapType, object> = {
  china: chinaGeoJson as object,
  world: worldGeoJson as object,
}

// 已注册的地图
const registeredMaps = new Set<string>()

interface GeoMapProps extends MaterialComponet {
  /** 地图类型 */
  mapType?: MapType
  /** 地图 GeoJSON 数据 */
  mapJson?: object
  /** 区域数据（兼容旧版） */
  regionData?: MapDataPoint[]
  /** 散点数据（兼容旧版） */
  scatterData?: ScatterPoint[]
  /** 颜色列表 */
  colors?: string[]
  /** 显示图例 */
  showVisualMap?: boolean
  /** 显示提示 */
  showTooltip?: boolean
  /** 显示散点 */
  showScatter?: boolean
  /** 散点大小 */
  scatterSymbolSize?: number
  /** 发光效果 */
  glowEffect?: boolean
  /** 允许缩放 */
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

export const GeoMap = (props: GeoMapProps) => {
  const {
    ref,
    $data,
    __dataSource,
    mapType = 'china',
    mapJson,
    regionData: staticRegionData,
    scatterData: staticScatterData,
    colors,
    showVisualMap = true,
    showTooltip = true,
    showScatter = true,
    scatterSymbolSize = 12,
    glowEffect = true,
    roam = true,
    rotation = 0,
    opacity = 100,
    background = 'transparent',
    style: externalStyle,
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
  } = props

  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const regionData = useMemo<MapDataPoint[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as MapDataPoint[]
    }
    return staticRegionData ?? DEFAULT_REGION_DATA
  }, [dataSource, staticRegionData])
  const scatterData = useMemo<ScatterPoint[]>(() => staticScatterData ?? DEFAULT_SCATTER_DATA, [staticScatterData])
  const chartColors = useMemo<string[]>(() => colors ?? DEFAULT_COLORS, [colors])

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 计算数据范围
  const values = regionData.map(d => d.value)
  const minValue = values.length > 0 ? Math.min(...values) : 0
  const maxValue = values.length > 0 ? Math.max(...values) : 100

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

    chartInstance.current = echarts.init(chartRef.current)

    const option = {
      backgroundColor: 'transparent',
      tooltip: showTooltip
        ? {
            trigger: 'item',
            backgroundColor: 'rgba(0, 15, 35, 0.95)',
            borderColor: 'rgba(0, 242, 254, 0.6)',
            borderWidth: 1,
            padding: [10, 15],
            textStyle: {
              color: '#fff',
              fontSize: 13,
            },
            formatter: (params: { name: string; value?: number; seriesType: string }) => {
              if (params.seriesType === 'effectScatter') {
                return `<div style="font-weight:500">${params.name}</div>`
              }
              return `<div style="font-weight:500">${params.name}</div><div style="color:#00f2fe;margin-top:4px">${params.value?.toLocaleString() ?? '-'}</div>`
            },
          }
        : { show: false },
      visualMap: showVisualMap
        ? {
            min: minValue,
            max: maxValue,
            left: 20,
            bottom: 20,
            itemWidth: 12,
            itemHeight: 100,
            text: ['高', '低'],
            textStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 11,
            },
            inRange: {
              color: ['#0a2e4e', '#0d4a6e', '#1a6a8e', '#2a8aae', '#4abadd', '#00f2fe'],
            },
            calculable: true,
          }
        : undefined,
      geo: {
        map: mapType,
        roam,
        zoom: 1.2,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
          },
          itemStyle: {
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00f2fe' },
                { offset: 1, color: '#4facfe' },
              ],
            },
            shadowColor: glowEffect ? 'rgba(0, 242, 254, 0.8)' : 'transparent',
            shadowBlur: glowEffect ? 25 : 0,
            borderColor: '#00f2fe',
            borderWidth: 2,
          },
        },
        itemStyle: {
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#0d2b4a' },
              { offset: 1, color: '#051428' },
            ],
          },
          borderColor: 'rgba(0, 242, 254, 0.3)',
          borderWidth: 1,
          shadowColor: glowEffect ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
          shadowBlur: glowEffect ? 8 : 0,
          shadowOffsetY: glowEffect ? 2 : 0,
        },
      },
      series: [
        {
          name: '区域数据',
          type: 'map',
          map: mapType,
          geoIndex: 0,
          data: regionData,
        },
        ...(showScatter
          ? [
              {
                name: '散点',
                type: 'effectScatter' as const,
                coordinateSystem: 'geo' as const,
                data: scatterData.map(item => ({
                  name: item.name,
                  value: item.value,
                })),
                symbolSize: (val: number[]) => {
                  const size = (val[2] / maxValue) * scatterSymbolSize + scatterSymbolSize / 2
                  return Math.max(size, 8)
                },
                showEffectOn: 'render' as const,
                rippleEffect: {
                  brushType: 'stroke' as const,
                  scale: 4,
                  period: 4,
                },
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: '#fff' },
                      { offset: 0.3, color: chartColors[0] },
                      { offset: 1, color: chartColors[0] },
                    ],
                  },
                  shadowColor: glowEffect ? chartColors[0] : 'transparent',
                  shadowBlur: glowEffect ? 15 : 0,
                },
                zlevel: 1,
              },
            ]
          : []),
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
  }, [
    mapType,
    mapJson,
    regionData,
    scatterData,
    chartColors,
    showVisualMap,
    showTooltip,
    showScatter,
    scatterSymbolSize,
    glowEffect,
    roam,
    minValue,
    maxValue,
  ])

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

export default GeoMap
