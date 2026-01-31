/**
 * Text Component
 * 文本组件 - 支持普通文本、链接、标题、发光效果
 */

import { useMemo, type CSSProperties } from 'react'
import { cn, type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type TextAlign = 'left' | 'center' | 'right'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

export interface TextProps extends MaterialComponet {
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
  /** 事件处理 */
  onClick?: (e: React.MouseEvent) => void
  onDoubleClick?: (e: React.MouseEvent) => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
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
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const dataSource = useDataSource($data, __dataSource)
  const data = useMemo<string>(() => {
    if (dataSource.length > 0 && dataSource[0]?.text) {
      return String(dataSource[0].text)
    }
    return ''
  }, [dataSource])

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

  const containerClass = cn(styles.container, getAlignClass(textAlign), getValignClass(verticalAlign))

  const textClass = cn(styles.text, isLink && styles.link, underline && styles.underline)

  // 链接模式
  if (isLink && href) {
    const relValue = target === '_blank' ? 'noopener noreferrer' : ''
    return (
      <div
        className={containerClass}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        style={containerStyle}
      >
        <a className={textClass} href={href} rel={relValue} style={textStyle} target={target}>
          {data}
        </a>
      </div>
    )
  }

  // 普通文本
  return (
    <div
      className={containerClass}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={containerStyle}
    >
      <span className={textClass} style={textStyle}>
        {data}
      </span>
    </div>
  )
}

export default Text
