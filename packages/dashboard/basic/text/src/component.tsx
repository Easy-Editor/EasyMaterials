/**
 * Text Component
 * 文本组件 - 支持普通文本、链接、标题、发光效果
 */

import type { CSSProperties, Ref } from 'react'
import { useMemo } from 'react'
import { cn } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type TextAlign = 'left' | 'center' | 'right'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

/** 数据配置类型（来自 DataSetter） */
interface DataConfig {
  /** 数据源类型：具体数据 | 数据源 | 全局数据源 */
  sourceType: 'static' | 'datasource' | 'global'
  /** 静态数据（sourceType === 'static'） */
  staticData?: unknown[]
  /** 数据源 ID（sourceType === 'datasource' | 'global'） */
  datasourceId?: string
  /** 字段映射配置 */
  fieldMappings?: Array<{
    componentField: string
    sourceField: string
  }>
}

/** 根据路径从对象中获取值 */
function getValueByPath(obj: unknown, path: string): unknown {
  if (!path) return obj
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) return undefined
    if (typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

/** 从数据源数据中提取数组 */
function extractDataFromSource(dsData: unknown): unknown[] {
  if (dsData === undefined) return []

  if (Array.isArray(dsData)) {
    return dsData
  }

  if (dsData && typeof dsData === 'object') {
    return [dsData]
  }

  return []
}

/** 应用字段映射 */
function applyFieldMappings(
  rawData: unknown[],
  mappings?: Array<{ componentField: string; sourceField: string }>,
): Record<string, unknown>[] {
  if (!mappings || mappings.length === 0) {
    return rawData as Record<string, unknown>[]
  }

  return rawData.map(item => {
    const result: Record<string, unknown> = {}
    for (const { componentField, sourceField } of mappings) {
      if (componentField && sourceField) {
        result[componentField] = getValueByPath(item, sourceField)
      }
    }
    return result
  })
}

export interface TextProps {
  ref?: Ref<HTMLDivElement>
  /** 数据配置（来自 $data extraProp） */
  $data?: DataConfig
  /** 数据源数据（由渲染器 HOC 传递） */
  __dataSource?: {
    component: Record<string, unknown>
    page: Record<string, unknown>
  }
  /** 字体大小 */
  fontSize?: number
  /** 字体粗细 */
  fontWeight?: number | 'normal' | 'bold'
  /** 字体家族 */
  fontFamily?: string
  /** 颜色 */
  color?: string
  /** 水平对齐 */
  textAlign?: TextAlign
  /** 垂直对齐 */
  verticalAlign?: VerticalAlign
  /** 行高 */
  lineHeight?: number
  /** 字间距 */
  letterSpacing?: number
  /** 是否为链接 */
  isLink?: boolean
  /** 链接地址 */
  href?: string
  /** 链接打开方式 */
  target?: '_self' | '_blank'
  /** 下划线 */
  underline?: boolean
  /** 发光效果 */
  glowEnable?: boolean
  /** 发光颜色 */
  glowColor?: string
  /** 发光强度 */
  glowIntensity?: number
  /** 旋转角度 */
  rotation?: number
  /** 不透明度 (0-100) */
  opacity?: number
  /** 背景颜色 */
  background?: string
  /** 显隐控制 */
  condition?: boolean
  /** 外部样式 */
  style?: CSSProperties
}

const getAlignClass = (align: TextAlign): string => {
  switch (align) {
    case 'left':
      return styles.alignLeft
    case 'center':
      return styles.alignCenter
    case 'right':
      return styles.alignRight
    default:
      return styles.alignLeft
  }
}

const getValignClass = (align: VerticalAlign): string => {
  switch (align) {
    case 'top':
      return styles.valignTop
    case 'middle':
      return styles.valignMiddle
    case 'bottom':
      return styles.valignBottom
    default:
      return styles.valignMiddle
  }
}

export const Text: React.FC<TextProps> = ({
  ref,
  $data,
  __dataSource,
  fontSize = 16,
  fontWeight = 'normal',
  fontFamily = 'inherit',
  color = '#ffffff',
  textAlign = 'left',
  verticalAlign = 'middle',
  lineHeight = 1.5,
  letterSpacing = 0,
  isLink = false,
  href = '',
  target = '_blank',
  underline = false,
  glowEnable = false,
  glowColor = '#00d4ff',
  glowIntensity = 1,
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  style: externalStyle,
}) => {
  // 解析数据配置，获取实际显示内容
  const resolvedContent = useMemo(() => {
    if (!$data) return ''

    let rawData: unknown[] = []

    if ($data.sourceType === 'static') {
      // 静态数据：直接使用
      rawData = Array.isArray($data.staticData) ? $data.staticData : []
    } else if ($data.sourceType === 'global' && $data.datasourceId) {
      // 全局数据源：从页面数据源获取
      const dsData = __dataSource?.page?.[$data.datasourceId]
      rawData = extractDataFromSource(dsData)
    } else if ($data.sourceType === 'datasource' && $data.datasourceId) {
      // 组件数据源：从组件数据源获取
      const dsData = __dataSource?.component?.[$data.datasourceId]
      rawData = extractDataFromSource(dsData)
    }

    // 应用字段映射
    const mappedData = applyFieldMappings(rawData, $data.fieldMappings)

    // 取第一条数据的 text 字段作为显示内容
    if (mappedData.length > 0 && mappedData[0].text !== undefined) {
      return String(mappedData[0].text)
    }

    return ''
  }, [$data, __dataSource])

  // 计算发光效果
  const textShadow = glowEnable
    ? `0 0 ${10 * glowIntensity}px ${glowColor}, 0 0 ${20 * glowIntensity}px ${glowColor}, 0 0 ${30 * glowIntensity}px ${glowColor}`
    : undefined

  const textStyle: CSSProperties = {
    fontSize,
    fontWeight,
    fontFamily,
    color,
    lineHeight,
    letterSpacing,
    textShadow,
  }

  // 容器样式：旋转、透明度、背景
  const containerStyle: CSSProperties = {
    ...externalStyle,
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
  }

  const containerClass = cn(
    styles.container,
    getAlignClass(textAlign),
    getValignClass(verticalAlign),
  )

  const textClass = cn(styles.text, isLink && styles.link, underline && styles.underline)

  // 链接模式
  if (isLink && href) {
    const relValue = target === '_blank' ? 'noopener noreferrer' : ''
    return (
      <div className={containerClass} ref={ref} style={containerStyle}>
        <a className={textClass} href={href} rel={relValue} style={textStyle} target={target}>
          {resolvedContent}
        </a>
      </div>
    )
  }

  // 普通文本
  return (
    <div className={containerClass} ref={ref} style={containerStyle}>
      <span className={textClass} style={textStyle}>
        {resolvedContent}
      </span>
    </div>
  )
}

export default Text
