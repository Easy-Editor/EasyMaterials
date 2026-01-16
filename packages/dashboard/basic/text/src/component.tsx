/**
 * Text Component
 * 文本组件 - 支持普通文本、链接、标题、发光效果
 */

import type { CSSProperties, Ref } from 'react'
import { cn } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type TextAlign = 'left' | 'center' | 'right'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

export interface TextProps {
  ref?: Ref<HTMLDivElement>
  /** 文本内容 */
  content?: string
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
  content = '文本内容',
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
  style: externalStyle,
}) => {
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

  const containerClass = cn(styles.container, getAlignClass(textAlign), getValignClass(verticalAlign))

  const textClass = cn(styles.text, isLink && styles.link, underline && styles.underline)

  // 链接模式
  if (isLink && href) {
    const relValue = target === '_blank' ? 'noopener noreferrer' : ''
    return (
      <div className={containerClass} ref={ref} style={externalStyle}>
        <a className={textClass} href={href} rel={relValue} style={textStyle} target={target}>
          {content}
        </a>
      </div>
    )
  }

  // 普通文本
  return (
    <div className={containerClass} ref={ref} style={externalStyle}>
      <span className={textClass} style={textStyle}>
        {content}
      </span>
    </div>
  )
}

export default Text
