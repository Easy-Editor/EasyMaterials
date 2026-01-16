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
export const COMPONENT_NAME = 'EasyEditorMaterialsVideo'

/**
 * 包名
 */
export const PACKAGE_NAME = '@easy-editor/materials-dashboard-video'
