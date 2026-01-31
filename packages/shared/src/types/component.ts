import type { DesignMode } from '@easy-editor/core'
import type { DataConfig, DataSourceContext } from '../datasource'
import type { Ref, CSSProperties } from 'react'

/**
 * 通用组件属性
 */
export interface MaterialComponet<T = HTMLDivElement> {
  ref?: Ref<T>
  __designMode?: DesignMode
  /** 数据配置 */
  $data?: DataConfig
  /** 数据源上下文 */
  __dataSource?: DataSourceContext

  /** 旋转角度 */
  rotation?: number
  /** 不透明度 */
  opacity?: number
  /** 背景颜色 */
  background?: string

  /** 外部样式 */
  style?: CSSProperties
}
