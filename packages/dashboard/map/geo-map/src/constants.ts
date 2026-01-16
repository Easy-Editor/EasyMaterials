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
export const COMPONENT_NAME = 'EasyEditorMaterialsGeoMap'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-geo-map'

/**
 * 地图类型
 */
export type MapType = 'china' | 'world'

/**
 * 地图数据点
 */
export interface MapDataPoint {
  name: string
  value: number
  coord?: [number, number]
}

/**
 * 散点数据
 */
export interface ScatterPoint {
  name: string
  value: [number, number, number] // [lng, lat, value]
}

/**
 * 默认颜色 - 科技感渐变色
 */
export const DEFAULT_COLORS = ['#00f2fe', '#4facfe', '#00d4ff', '#a8edea']

/**
 * 默认区域数据 - 中国主要省份
 */
export const DEFAULT_REGION_DATA: MapDataPoint[] = [
  { name: '北京', value: 2154 },
  { name: '天津', value: 1560 },
  { name: '河北', value: 7461 },
  { name: '山西', value: 3491 },
  { name: '内蒙古', value: 2405 },
  { name: '辽宁', value: 4259 },
  { name: '吉林', value: 2407 },
  { name: '黑龙江', value: 3185 },
  { name: '上海', value: 2487 },
  { name: '江苏', value: 8505 },
  { name: '浙江', value: 6457 },
  { name: '安徽', value: 6102 },
  { name: '福建', value: 4154 },
  { name: '江西', value: 4518 },
  { name: '山东', value: 10152 },
  { name: '河南', value: 9936 },
  { name: '湖北', value: 5775 },
  { name: '湖南', value: 6644 },
  { name: '广东', value: 12684 },
  { name: '广西', value: 5012 },
  { name: '海南', value: 1008 },
  { name: '重庆', value: 3205 },
  { name: '四川', value: 8367 },
  { name: '贵州', value: 3856 },
  { name: '云南', value: 4720 },
  { name: '西藏', value: 364 },
  { name: '陕西', value: 3952 },
  { name: '甘肃', value: 2501 },
  { name: '青海', value: 592 },
  { name: '宁夏', value: 720 },
  { name: '新疆', value: 2585 },
  { name: '台湾', value: 2359 },
  { name: '香港', value: 745 },
  { name: '澳门', value: 68 },
]

/**
 * 默认散点数据 - 中国主要城市
 */
export const DEFAULT_SCATTER_DATA: ScatterPoint[] = [
  { name: '北京', value: [116.46, 39.92, 2154] },
  { name: '上海', value: [121.48, 31.22, 2487] },
  { name: '广州', value: [113.23, 23.16, 1530] },
  { name: '深圳', value: [114.07, 22.62, 1756] },
  { name: '杭州', value: [120.19, 30.26, 1193] },
  { name: '成都', value: [104.06, 30.67, 2093] },
  { name: '武汉', value: [114.31, 30.52, 1121] },
  { name: '西安', value: [108.95, 34.27, 1295] },
  { name: '重庆', value: [106.54, 29.59, 3205] },
  { name: '南京', value: [118.78, 32.04, 931] },
]
