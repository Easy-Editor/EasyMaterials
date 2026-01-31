/**
 * Button Component
 * 按钮组件 - 支持数据源绑定和事件交互
 */

import { useMemo, type CSSProperties, type MouseEvent } from 'react'
import { cn, type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends MaterialComponet<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: ButtonVariant
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示发光效果 */
  glowEnable?: boolean
  /** 链接地址 */
  href?: string
  /** 链接打开方式 */
  target?: '_blank' | '_self'
  /** 是否加载中 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 点击事件 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  /** 双击事件 */
  onDoubleClick?: (e: MouseEvent<HTMLButtonElement>) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: MouseEvent<HTMLButtonElement>) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void
}

const getSizeClass = (size: ButtonSize): string => {
  switch (size) {
    case 'small':
      return styles.sizeSmall
    case 'medium':
      return styles.sizeMedium
    case 'large':
      return styles.sizeLarge
    default:
      return styles.sizeMedium
  }
}

const getVariantClass = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return styles.variantPrimary
    case 'secondary':
      return styles.variantSecondary
    case 'outline':
      return styles.variantOutline
    case 'ghost':
      return styles.variantGhost
    case 'danger':
      return styles.variantDanger
    default:
      return styles.variantPrimary
  }
}

export const Button: React.FC<ButtonProps> = ({
  ref,
  $data,
  __dataSource,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  glowEnable = false,
  href,
  target = '_blank',
  loading = false,
  loadingText = '加载中...',
  rotation = 0,
  opacity = 100,
  background,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  style: externalStyle,
}) => {
  const dataSource = useDataSource($data, __dataSource)
  const data = useMemo<string>(() => {
    if (dataSource.length > 0 && dataSource[0]?.text) {
      return String(dataSource[0].text)
    }
    return ''
  }, [dataSource])

  const buttonClass = cn(styles.button, getSizeClass(size), getVariantClass(variant), glowEnable && styles.glow)

  const displayText = loading ? loadingText : data

  const buttonStyle: CSSProperties = {
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return
    }

    if (href) {
      window.open(href, target)
    }

    onClick?.(e)
  }

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={buttonStyle}
      type='button'
    >
      {displayText ? <span>{displayText}</span> : null}
    </button>
  )
}

export default Button
