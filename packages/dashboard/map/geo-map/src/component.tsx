/**
 * Geo Map Component
 * 地理地图组件 - 支持数据源绑定和事件交互
 */

import { useEffect, useRef, useMemo, type CSSProperties } from 'react'
import * as echarts from 'echarts/core'
import { MapChart, EffectScatterChart } from 'echarts/charts'
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import {
  escapeHtml,
  MATERIAL_THEME,
  MaterialEmptyState,
  shouldHideEmptyMaterial,
  type MaterialComponet,
  useDataSource,
} from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, type MapDataPoint, type ScatterPoint, type MapType } from './constants'
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
    __designMode,
    ref,
    $data,
    __dataSource,
    mapType = 'china',
    mapJson,
    regionData: staticRegionData,
    scatterData: staticScatterData,
    emptyBehavior,
    emptyText,
    colors,
    showVisualMap = true,
    showTooltip = true,
    showScatter = true,
    scatterSymbolSize = 12,
    glowEffect = false,
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
    if ($data) {
      return dataSource as unknown as MapDataPoint[]
    }
    return staticRegionData ?? []
  }, [$data, dataSource, staticRegionData])
  const scatterData = useMemo<ScatterPoint[]>(() => staticScatterData ?? [], [staticScatterData])
  const chartColors = useMemo<string[]>(
    () => DEFAULT_COLORS.map((fallback, index) => colors?.[index] ?? fallback),
    [colors],
  )

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 计算数据范围
  const values = regionData.map(d => d.value)
  const minValue = values.length > 0 ? Math.min(...values) : 0
  const maxValue = values.length > 0 ? Math.max(...values) : 100
  const valueRangeMax = maxValue > 0 ? maxValue : 1
  const isEmpty = regionData.length === 0

  useEffect(() => {
    if (isEmpty || !chartRef.current) {
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
            backgroundColor: MATERIAL_THEME.tooltipBackground,
            borderColor: MATERIAL_THEME.tooltipBorder,
            borderWidth: 1,
            padding: [10, 15],
            textStyle: {
              color: MATERIAL_THEME.tooltipForeground,
              fontSize: 13,
            },
            formatter: (params: { name: string; value?: number; seriesType: string }) => {
              const safeName = escapeHtml(params.name)
              if (params.seriesType === 'effectScatter') {
                return `<div style="font-weight:500">${safeName}</div>`
              }
              const safeValue = escapeHtml(params.value?.toLocaleString() ?? '-')
              return `<div style="font-weight:500">${safeName}</div><div style="color:${MATERIAL_THEME.mutedForeground};margin-top:4px">${safeValue}</div>`
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
              color: MATERIAL_THEME.mutedForeground,
              fontSize: 11,
            },
            inRange: {
              color: [MATERIAL_THEME.surfaceRaised, chartColors[5], chartColors[0]],
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
            color: MATERIAL_THEME.foreground,
            fontSize: 12,
            fontWeight: 500,
          },
          itemStyle: {
            areaColor: chartColors[0],
            shadowColor: glowEffect ? chartColors[0] : 'transparent',
            shadowBlur: glowEffect ? 8 : 0,
            borderColor: MATERIAL_THEME.foreground,
            borderWidth: 1,
          },
        },
        itemStyle: {
          areaColor: MATERIAL_THEME.surfaceRaised,
          borderColor: MATERIAL_THEME.border,
          borderWidth: 1,
          shadowColor: glowEffect ? chartColors[0] : 'transparent',
          shadowBlur: glowEffect ? 4 : 0,
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
                  const size = ((val[2] ?? 0) / valueRangeMax) * scatterSymbolSize + scatterSymbolSize / 2
                  return Math.max(size, 8)
                },
                showEffectOn: 'render' as const,
                rippleEffect: {
                  brushType: 'stroke' as const,
                  scale: 4,
                  period: 4,
                },
                itemStyle: {
                  color: chartColors[0],
                  shadowColor: glowEffect ? chartColors[0] : 'transparent',
                  shadowBlur: glowEffect ? 6 : 0,
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
    valueRangeMax,
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

export default GeoMap
