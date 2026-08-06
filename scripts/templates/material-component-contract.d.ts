import type { DesignMode, JSONObject } from '@easy-editor/core'
import type { CSSProperties, Ref } from 'react'

export interface FieldMapping extends JSONObject {
  componentField: string
  sourceField: string
}

export interface DataConfig extends JSONObject {
  sourceType: 'static' | 'datasource' | 'global'
  staticData?: JSONObject[]
  datasourceId?: string
  fieldMappings?: FieldMapping[]
}

export interface DataSourceContext {
  component: Record<string, unknown>
  page: Record<string, unknown>
}

export type EmptyBehavior = 'blank' | 'message' | 'hide'

export interface MaterialComponet<T = HTMLDivElement> {
  ref?: Ref<T>
  __designMode?: DesignMode
  $data?: DataConfig
  __dataSource?: DataSourceContext
  emptyBehavior?: EmptyBehavior
  emptyText?: string
  rotation?: number
  opacity?: number
  background?: string
  style?: CSSProperties
}
