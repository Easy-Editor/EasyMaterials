/**
 * 物料常量配置
 * 统一管理全局变量名等配置，确保 meta.ts 和 rollup.config.js 使用相同的值
 */

/**
 * UMD 全局变量基础名称
 * 用于构建：
 * - 元数据：${GLOBAL_NAME}Meta (例如: EasyEditorMaterialsProgressMeta)
 * - 组件：${GLOBAL_NAME}Component (例如: EasyEditorMaterialsProgressComponent)
 * - 完整构建：${GLOBAL_NAME} (例如: EasyEditorMaterialsProgress)
 */
export const COMPONENT_NAME = 'EasyEditorMaterialsProgress'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-progress'

/**
 * 值格式类型
 */
export const VALUE_FORMATS = ['percent', 'number'] as const

/**
 * 默认轨道颜色
 */
export const DEFAULT_TRACK_COLOR = 'rgba(255, 255, 255, 0.1)'

/**
 * 默认进度颜色
 */
export const DEFAULT_PROGRESS_COLOR = '#00ffff'

/**
 * 默认渐变颜色
 */
export const DEFAULT_GRADIENT_COLORS: [string, string] = ['#00ffff', '#ff00ff']

/**
 * 默认发光颜色
 */
export const DEFAULT_GLOW_COLOR = '#00ffff'
