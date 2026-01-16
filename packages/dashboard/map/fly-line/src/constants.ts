/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 * 用于构建：
 * - 元数据：${GLOBAL_NAME}Meta (例如: EasyEditorMaterialsAudioMeta)
 * - 组件：${GLOBAL_NAME}Component (例如: EasyEditorMaterialsAudioComponent)
 * - 完整构建：${GLOBAL_NAME} (例如: EasyEditorMaterialsAudio)
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsFlyLine'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-fly-line'

/** 飞线数据点 */
export interface FlyLineData {
  /** 起点名称 */
  fromName: string
  /** 终点名称 */
  toName: string
  /** 起点坐标 [lng, lat] */
  fromCoord: [number, number]
  /** 终点坐标 [lng, lat] */
  toCoord: [number, number]
  /** 值（影响线条粗细） */
  value?: number
}

/** 散点数据 */
export interface ScatterPoint {
  name: string
  coord: [number, number]
  value?: number
}

/** 地图类型 */
export type MapType = 'china' | 'world' | string

/** 默认飞线数据 */
export const DEFAULT_FLY_LINES: FlyLineData[] = [
  {
    fromName: '北京',
    toName: '上海',
    fromCoord: [116.4, 39.9],
    toCoord: [121.5, 31.2],
    value: 100,
  },
  {
    fromName: '北京',
    toName: '广州',
    fromCoord: [116.4, 39.9],
    toCoord: [113.3, 23.1],
    value: 80,
  },
  {
    fromName: '北京',
    toName: '成都',
    fromCoord: [116.4, 39.9],
    toCoord: [104.1, 30.7],
    value: 60,
  },
  {
    fromName: '上海',
    toName: '深圳',
    fromCoord: [121.5, 31.2],
    toCoord: [114.1, 22.5],
    value: 70,
  },
  {
    fromName: '广州',
    toName: '武汉',
    fromCoord: [113.3, 23.1],
    toCoord: [114.3, 30.6],
    value: 50,
  },
]

/** 默认散点数据 */
export const DEFAULT_SCATTER_POINTS: ScatterPoint[] = [
  { name: '北京', coord: [116.4, 39.9], value: 100 },
  { name: '上海', coord: [121.5, 31.2], value: 90 },
  { name: '广州', coord: [113.3, 23.1], value: 80 },
  { name: '深圳', coord: [114.1, 22.5], value: 75 },
  { name: '成都', coord: [104.1, 30.7], value: 60 },
  { name: '武汉', coord: [114.3, 30.6], value: 55 },
]

/** 默认颜色配置 */
export const DEFAULT_COLORS = {
  /** 飞线颜色 */
  lineColor: '#00d4ff',
  /** 飞线发光颜色 */
  lineGlowColor: '#00d4ff',
  /** 散点颜色 */
  scatterColor: '#ffd700',
  /** 地图区域颜色 */
  areaColor: 'rgba(0, 40, 80, 0.6)',
  /** 地图边框颜色 */
  borderColor: 'rgba(0, 200, 255, 0.3)',
}
