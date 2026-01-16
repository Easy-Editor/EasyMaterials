/**
 * Button Component
 * 按钮组件
 */

import type { CSSProperties, Ref, MouseEvent } from 'react'
import { cn } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  ref?: Ref<HTMLButtonElement>
  /** 按钮文本 */
  text?: string
  /** 按钮变体 */
  variant?: ButtonVariant
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示发光效果 */
  glowEnable?: boolean
  /** 点击事件 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  /** 外部样式 */
  style?: CSSProperties
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
  text = '按钮',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  glowEnable = false,
  onClick,
  style: externalStyle,
}) => {
  const buttonClass = cn(styles.button, getSizeClass(size), getVariantClass(variant), glowEnable && styles.glow)

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} ref={ref} style={externalStyle} type='button'>
      {text ? <span>{text}</span> : null}
    </button>
  )
}

export default Button
