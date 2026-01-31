/**
 * Filter Component
 * 滤镜效果层组件 - 使用 backdrop-filter 对下层内容应用滤镜效果
 */

import type { CSSProperties } from 'react'
import styles from './component.module.css'
import type { MaterialComponet } from '@easy-editor/materials-shared'

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

export interface FilterProps extends MaterialComponet {
  /** 模糊 (px) */
  blur?: number
  /** 亮度 (0-200, 100为正常) */
  brightness?: number
  /** 对比度 (0-200, 100为正常) */
  contrast?: number
  /** 灰度 (0-100) */
  grayscale?: number
  /** 色相旋转 (0-360度) */
  hueRotate?: number
  /** 反相 (0-100) */
  invert?: number
  /** 不透明度 (0-100) */
  opacity?: number
  /** 饱和度 (0-200, 100为正常) */
  saturate?: number
  /** 棕褐色 (0-100) */
  sepia?: number
  /** 混合模式 */
  blendMode?: BlendMode
  /** 背景颜色（用于颜色叠加效果） */
  backgroundColor?: string
  /** 外部样式 */
  style?: CSSProperties
}

export const Filter: React.FC<FilterProps> = ({
  ref,
  blur = 0,
  brightness = 100,
  contrast = 100,
  grayscale = 0,
  hueRotate = 0,
  invert = 0,
  opacity = 100,
  saturate = 100,
  sepia = 0,
  blendMode = 'normal',
  backgroundColor = 'transparent',
  style: externalStyle,
}) => {
  // 构建 CSS filter 字符串
  const filters: string[] = []

  if (blur > 0) {
    filters.push(`blur(${blur}px)`)
  }
  if (brightness !== 100) {
    filters.push(`brightness(${brightness}%)`)
  }
  if (contrast !== 100) {
    filters.push(`contrast(${contrast}%)`)
  }
  if (grayscale > 0) {
    filters.push(`grayscale(${grayscale}%)`)
  }
  if (hueRotate !== 0) {
    filters.push(`hue-rotate(${hueRotate}deg)`)
  }
  if (invert > 0) {
    filters.push(`invert(${invert}%)`)
  }
  if (opacity !== 100) {
    filters.push(`opacity(${opacity}%)`)
  }
  if (saturate !== 100) {
    filters.push(`saturate(${saturate}%)`)
  }
  if (sepia > 0) {
    filters.push(`sepia(${sepia}%)`)
  }

  const filterValue = filters.length > 0 ? filters.join(' ') : 'none'

  const filterStyle: CSSProperties = {
    // 使用 backdrop-filter 对下层内容应用滤镜
    backdropFilter: filterValue,
    WebkitBackdropFilter: filterValue, // Safari 兼容
    mixBlendMode: blendMode,
    backgroundColor,
    ...externalStyle,
  }

  return <div className={styles.container} ref={ref} style={filterStyle} />
}

export default Filter
