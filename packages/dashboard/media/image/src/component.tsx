/**
 * Image Component
 * 图片/图标/边框装饰组件
 */

import type { CSSProperties } from 'react'
import {
  cn,
  MATERIAL_THEME,
  MaterialEmptyState,
  shouldHideEmptyMaterial,
  type MaterialComponet,
} from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none'
export type BorderStyle = 'none' | 'solid'
export type DisplayMode = 'image' | 'icon'

export interface ImageProps extends MaterialComponet {
  /** 图片地址 */
  src?: string
  /** 图片描述 */
  alt?: string
  /** 图片填充方式 */
  objectFit?: ObjectFit
  /** 圆角 */
  borderRadius?: number
  /** 边框样式 */
  borderStyle?: BorderStyle
  /** 边框颜色 */
  borderColor?: string
  /** 阴影 */
  shadow?: boolean
  /** 阴影颜色 */
  shadowColor?: string
  /** 外部样式 */
  style?: CSSProperties
}

const getObjectFitClass = (fit: ObjectFit): string => {
  switch (fit) {
    case 'cover':
      return styles.imageCover
    case 'contain':
      return styles.imageContain
    case 'fill':
      return styles.imageFill
    default:
      return ''
  }
}

const getBorderClass = (borderStyle: BorderStyle): string => {
  switch (borderStyle) {
    case 'solid':
      return styles.borderSolid
    default:
      return ''
  }
}

export const Image: React.FC<ImageProps> = ({
  __designMode,
  ref,
  src = '',
  alt = '',
  objectFit = 'cover',
  borderRadius = 0,
  borderStyle = 'solid',
  borderColor = MATERIAL_THEME.border,
  shadow = false,
  shadowColor = 'rgba(15, 23, 42, 0.18)',
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  emptyBehavior,
  emptyText,
  style: externalStyle,
}) => {
  const containerStyle: CSSProperties = {
    borderRadius,
    color: borderColor,
    boxShadow: shadow ? `0 4px 20px ${shadowColor}` : undefined,
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }
  const isEmpty = src.trim().length === 0

  if (shouldHideEmptyMaterial(isEmpty, emptyBehavior, __designMode)) {
    return null
  }

  return (
    <div className={cn(styles.container, getBorderClass(borderStyle))} ref={ref} style={containerStyle}>
      {isEmpty ? (
        <MaterialEmptyState behavior={emptyBehavior} designMode={__designMode} text={emptyText} />
      ) : (
        <img
          alt={alt}
          className={cn(styles.image, getObjectFitClass(objectFit))}
          draggable={false}
          height='100%'
          src={src}
          width='100%'
        />
      )}
    </div>
  )
}

export default Image
