/**
 * Image Component
 * 图片/图标/边框装饰组件
 */

import type { CSSProperties } from 'react'
import { cn, type MaterialComponet } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none'
export type BorderStyle = 'none' | 'neon' | 'gradient' | 'tech'
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
  /** 边框颜色（霓虹/科技感边框） */
  borderColor?: string
  /** 阴影 */
  shadow?: boolean
  /** 阴影颜色 */
  shadowColor?: string
  /** 外部样式 */
  style?: CSSProperties
}

const DEFAULT_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAgNjAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGRlZnMgaWQ9IlN2Z2pzRGVmczEwMDEiPjwvZGVmcz4NCiAgPGcNCiAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjYwNDgwNDY3OTI2Mjc2NTIsMCwwLDAuNjA0ODA0Njc5MjYyNzY1MiwtMC4wMDAwMTg0MDMxMDAyOTc2NjgwNzYsLTAuMDAwNDk0ODEwODgwODczMjQ1OSkiDQogICAgZmlsbD0iI2ZmZiINCiAgPg0KICAgIDxwYXRoDQogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgICBkPSJNOTUuMTA4LDg0LjEyNWMtMC40ODQsMC0wLjk1NS0wLjI1Mi0xLjIxNi0wLjcwMUw2NS44NDksMzQuNzljLTAuMzg2LTAuNjcxLTAuMTU1LTEuNTI4LDAuNTE2LTEuOTE3ICBjMC42NzMtMC4zODYsMS41MjctMC4xNTYsMS45MTYsMC41MTVsMjguMDQzLDQ4LjYzNGMwLjM4NiwwLjY3LDAuMTU2LDEuNTI3LTAuNTE1LDEuOTE2Qzk1LjU4Nyw4NC4wNjQsOTUuMzQ2LDg0LjEyNSw5NS4xMDgsODQuMTI1ICB6Ig0KICAgID48L3BhdGg+DQogICAgPHBhdGgNCiAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICAgIGQ9Ik03Ni45MzgsODQuMTI1SDEuNDAzYy0wLjUwMSwwLTAuOTY0LTAuMjY2LTEuMjEzLTAuNzAxYy0wLjI1Mi0wLjQzMy0wLjI1Mi0wLjk2Ny0wLjAwMy0xLjQwMUw0Ny4wMTEsMC43MTYgIGMwLjI1MS0wLjQzMywwLjcxNC0wLjcwMSwxLjIxNS0wLjcwMWgxOS4yM2MwLjc3NSwwLDEuNDAyLDAuNjI3LDEuNDAyLDEuNDAyYzAsMC43NzQtMC42MjcsMS40MDEtMS40MDIsMS40MDFINDkuMDM3TDMuODI4LDgxLjMyMSAgaDczLjExYzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDFDNzguMzM5LDgzLjQ5OCw3Ny43MTIsODQuMTI1LDc2LjkzOCw4NC4xMjV6Ig0KICAgID48L3BhdGg+DQogICAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJNNDguODkyLDM0LjA4OSI+PC9wYXRoPg0KICAgIDxwYXRoDQogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgICBkPSJNNzYuOTM4LDg0LjEyNUgxLjQwM2MtMC43NzUsMC0xLjQwMi0wLjYyNy0xLjQwMi0xLjQwMmMwLTAuNzc0LDAuNjI3LTEuNDAxLDEuNDAyLTEuNDAxaDczLjEwOUw1Ni43NjYsNTAuNTU0ICBjLTAuMzg2LTAuNjctMC4xNTYtMS41MjcsMC41MTUtMS45MTZjMC42NzEtMC4zODYsMS41MjgtMC4xNTYsMS45MTcsMC41MTVsMTguOTU2LDMyLjg3YzAuMjQ5LDAuNDM1LDAuMjQ5LDAuOTY5LTAuMDAzLDEuNDAxICBDNzcuOTAxLDgzLjg1Niw3Ny40MzksODQuMTI1LDc2LjkzOCw4NC4xMjV6Ig0KICAgID48L3BhdGg+DQogICAgPHBhdGgNCiAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICAgIGQ9Ik0yOC43MDcsMTAwLjAwMUgxMC43NmMtMC43NzUsMC0xLjQwMi0wLjYyNy0xLjQwMi0xLjQwMWMwLTAuNzc1LDAuNjI3LTEuNDAyLDEuNDAyLTEuNDAyaDE3Ljk0NiAgYzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDJDMzAuMTA4LDk5LjM3NCwyOS40ODEsMTAwLjAwMSwyOC43MDcsMTAwLjAwMXoiDQogICAgPjwvcGF0aD4NCiAgICA8cGF0aA0KICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgICAgZD0iTTc2LjkzOCw4NC4xMjVIMS40MDNjLTAuNTAxLDAtMC45NjQtMC4yNjktMS4yMTMtMC43MDFjLTAuMjUyLTAuNDMzLTAuMjUyLTAuOTY3LTAuMDAzLTEuNDAxbDE4Ljk1NC0zMi44NyAgYzAuMzg5LTAuNjcxLDEuMjQtMC45MDEsMS45MTctMC41MTVjMC42NzEsMC4zODksMC45MDEsMS4yNDYsMC41MTUsMS45MTZMMy44MjgsODEuMzIxaDczLjExYzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDEgIEM3OC4zMzksODMuNDk4LDc3LjcxMiw4NC4xMjUsNzYuOTM4LDg0LjEyNXoiDQogICAgPjwvcGF0aD4NCiAgICA8cGF0aA0KICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgICAgZD0iTTEwNC4yMzYsMTAwLjAwMUgyOC43MDdjLTAuNzc1LDAtMS40MDItMC42MjctMS40MDItMS40MDFjMC0wLjc3NSwwLjYyNy0xLjQwMiwxLjQwMi0xLjQwMmg3My4xMDRMODQuMDY3LDY2LjQzNCAgYy0wLjM4Ni0wLjY3MS0wLjE1Ni0xLjUyOCwwLjUxNS0xLjkxN2MwLjY3MS0wLjM4MywxLjUyNy0wLjE1OCwxLjkxNiwwLjUxNWwxOC45NTQsMzIuODY3YzAuMjQ5LDAuNDM2LDAuMjQ5LDAuOTY5LTAuMDAzLDEuNDAxICBDMTA1LjIsOTkuNzMyLDEwNC43MzcsMTAwLjAwMSwxMDQuMjM2LDEwMC4wMDF6Ig0KICAgID48L3BhdGg+DQogICAgPHBhdGgNCiAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICAgIGQ9Ik03Ni45MzgsODQuMTI1SDIwLjYzM2MtMC43NzUsMC0xLjQwMi0wLjYyNy0xLjQwMi0xLjQwMmMwLTAuNzc0LDAuNjI3LTEuNDAxLDEuNDAyLTEuNDAxaDU2LjMwNSAgYzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDFDNzguMzM5LDgzLjQ5OCw3Ny43MTIsODQuMTI1LDc2LjkzOCw4NC4xMjV6Ig0KICAgID48L3BhdGg+DQogICAgPHBhdGgNCiAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICAgIGQ9Ik02Ny40MzIsNjcuNjQ0aC0zNy4zNGMtMC41MDEsMC0wLjk2NC0wLjI2Ni0xLjIxMy0wLjcwMWMtMC4yNTItMC40MzMtMC4yNTItMC45NjctMC4wMDMtMS40MDFsMzcuMzQtNjQuODM5ICBjMC4zODYtMC42NzEsMS4yNC0wLjkwMSwxLjkxNy0wLjUxNWMwLjY3LDAuMzg2LDAuOSwxLjI0MywwLjUxNSwxLjkxN0wzMi41MTcsNjQuODRoMzQuOTE1YzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDEgIEM2OC44MzMsNjcuMDE3LDY4LjIwNyw2Ny42NDQsNjcuNDMyLDY3LjY0NHoiDQogICAgPjwvcGF0aD4NCiAgICA8cGF0aA0KICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgICAgZD0iTTY3LjQzMiw2Ny42NDRINDguNTQ0Yy0wLjUwMSwwLTAuOTY0LTAuMjY2LTEuMjEzLTAuNzAxYy0wLjI1Mi0wLjQzMy0wLjI1Mi0wLjk2Ny0wLjAwMy0xLjQwMWwxOC41MTktMzIuMTU1ICBjMC4zODktMC42NzEsMS4yNC0wLjkwMSwxLjkxNi0wLjUxNWMwLjY3MSwwLjM4NiwwLjksMS4yNDMsMC41MTUsMS45MTdMNTAuOTcsNjQuODRoMTYuNDYyYzAuNzc0LDAsMS40MDEsMC42MjcsMS40MDEsMS40MDEgIEM2OC44MzMsNjcuMDE3LDY4LjIwNyw2Ny42NDQsNjcuNDMyLDY3LjY0NHoiDQogICAgPjwvcGF0aD4NCiAgICA8cGF0aA0KICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgICAgZD0iTTEwLjc2LDEwMC4wMDFjLTAuNDc5LDAtMC45NDctMC4yNDYtMS4yMDgtMC42OUwwLjE5NSw4My40MzVjLTAuMzk0LTAuNjY4LTAuMTcyLTEuNTI0LDAuNDk2LTEuOTE5ICBjMC42NjUtMC4zOTIsMS41MjUtMC4xNzMsMS45MTksMC40OTVsOS4zNTgsMTUuODc3YzAuMzk0LDAuNjY4LDAuMTcyLDEuNTI3LTAuNDk2LDEuOTE5ICBDMTEuMjQ4LDk5LjkzOCwxMS4wMDQsMTAwLjAwMSwxMC43NiwxMDAuMDAxeiINCiAgICA+PC9wYXRoPg0KICAgIDxwYXRoDQogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgICBkPSJNMTA0LjIzNiwxMDAuMDAxYy0wLjI2LDAtMC41MjEtMC4wNzEtMC43NTMtMC4yMTljLTAuNjUxLTAuNDE2LTAuODQ2LTEuMjgxLTAuNDMtMS45MzZsOS42NDUtMTUuMTU5TDY3LjQ1Nyw0LjIyMyAgTDMxLjMzMiw2Ni45NTZjLTAuMzkyLDAuNjcxLTEuMjQzLDAuODk2LTEuOTE3LDAuNTE1Yy0wLjY3MS0wLjM4Ni0wLjkwMS0xLjI0My0wLjUxNS0xLjkxNmwzNy4zNC02NC44MzkgIGMwLjUwNC0wLjg2NSwxLjkyOC0wLjg2NSwyLjQzMiwwbDQ2Ljg4MSw4MS4zMDdjMC4yNjEsMC40NTEsMC4yNDcsMS4wMTMtMC4wMzIsMS40NTNsLTEwLjEwMywxNS44NzYgIEMxMDUuMTUsOTkuNzcxLDEwNC42OTksMTAwLjAwMSwxMDQuMjM2LDEwMC4wMDF6Ig0KICAgID48L3BhdGg+DQogIDwvZz4NCjwvc3ZnPg0K'

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
    case 'neon':
      return styles.borderNeon
    case 'gradient':
      return styles.borderGradient
    case 'tech':
      return styles.borderTech
    default:
      return ''
  }
}

export const Image: React.FC<ImageProps> = ({
  ref,
  src = DEFAULT_IMAGE,
  alt = '',
  objectFit = 'cover',
  borderRadius = 0,
  borderStyle = 'none',
  borderColor = '#00d4ff',
  shadow = false,
  shadowColor = 'rgba(0, 212, 255, 0.3)',
  style: externalStyle,
}) => {
  const containerStyle: CSSProperties = {
    borderRadius,
    color: borderColor,
    boxShadow: shadow ? `0 4px 20px ${shadowColor}` : undefined,
    ...externalStyle,
  } as CSSProperties

  // 图片模式
  return (
    <div className={cn(styles.container, getBorderClass(borderStyle))} ref={ref} style={containerStyle}>
      <img
        alt={alt}
        className={cn(styles.image, getObjectFitClass(objectFit))}
        draggable={false}
        height='100%'
        src={src}
        width='100%'
      />
    </div>
  )
}

export default Image
