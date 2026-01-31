/**
 * Number Flip Component
 * 数字翻牌组件 - 支持数据源绑定和事件交互
 */

import { useMemo, type CSSProperties } from 'react'
import { cn, type MaterialComponet, useDataSource } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type TrendType = 'up' | 'down' | 'flat'

export interface NumberFlipProps extends MaterialComponet {
  /** 小数位数 */
  decimals?: number
  /** 是否显示千分位分隔符 */
  separator?: boolean
  /** 前缀 */
  prefix?: string
  /** 后缀 */
  suffix?: string
  /** 字体大小 */
  fontSize?: number
  /** 字体类型 */
  fontFamily?: 'digital' | 'default'
  /** 颜色 */
  color?: string
  /** 发光强度 (0-2) */
  glowIntensity?: number
  /** 是否显示趋势 */
  trendEnable?: boolean
  /** 趋势值 */
  trendValue?: number
  /** 趋势类型 */
  trendType?: TrendType
  /** 趋势后缀 */
  trendSuffix?: string
  /** 趋势上升颜色 */
  trendUpColor?: string
  /** 趋势下降颜色 */
  trendDownColor?: string
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

const formatNumber = (value: number, decimals: number, separator: boolean): string => {
  const fixed = value.toFixed(decimals)
  if (!separator) {
    return fixed
  }

  const [intPart, decPart] = fixed.split('.')
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${formattedInt}.${decPart}` : formattedInt
}

const TrendIndicator: React.FC<{
  type: TrendType
  value: number
  suffix: string
  upColor: string
  downColor: string
  size: number
}> = ({ type, value, suffix, upColor, downColor, size }) => {
  let color = '#8899aa'
  if (type === 'up') {
    color = upColor
  } else if (type === 'down') {
    color = downColor
  }

  return (
    <div className={styles.trend} style={{ fontSize: size * 0.35 }}>
      {type !== 'flat' && (
        <svg
          aria-label={`Trend ${type}`}
          fill='none'
          height={size * 0.3}
          role='img'
          style={{
            transform: type === 'down' ? 'rotate(180deg)' : undefined,
          }}
          viewBox='0 0 24 24'
          width={size * 0.3}
        >
          <title>Trend arrow {type}</title>
          <path d='M12 4L20 14H4L12 4Z' fill={color} />
        </svg>
      )}
      {type === 'flat' && <span style={{ color, marginRight: 4 }}>—</span>}
      <span style={{ color }}>
        {value}
        {suffix}
      </span>
    </div>
  )
}

export const NumberFlip: React.FC<NumberFlipProps> = ({
  ref,
  $data,
  __dataSource,
  decimals = 0,
  separator = true,
  prefix = '',
  suffix = '',
  fontSize = 48,
  fontFamily = 'digital',
  color = '#00d4ff',
  glowIntensity = 0.5,
  trendEnable = false,
  trendValue = 0,
  trendType = 'up',
  trendSuffix = '%',
  trendUpColor = '#52c41a',
  trendDownColor = '#ff4d4f',
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  style: externalStyle,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const value = useMemo<number>(() => {
    if (dataSource.length > 0 && typeof dataSource[0]?.value === 'number') {
      return dataSource[0].value
    }
    return 0
  }, [dataSource])

  const isDigital = fontFamily === 'digital'
  const formattedValue = formatNumber(value, decimals, separator)

  // 计算发光效果的 text-shadow
  const glowShadow =
    glowIntensity > 0
      ? `0 0 ${10 * glowIntensity}px ${color}, 0 0 ${20 * glowIntensity}px ${color}40, 0 0 ${30 * glowIntensity}px ${color}20`
      : 'none'

  const containerStyle: CSSProperties = {
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }

  return (
    <div
      className={styles.container}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={containerStyle}
    >
      <div className={styles.content}>
        {prefix ? (
          <span
            className={cn(styles.prefix, isDigital && styles.prefixDigital)}
            style={{
              fontSize: `${fontSize * 0.5}px`,
              color,
            }}
          >
            {prefix}
          </span>
        ) : null}
        <span
          className={cn(styles.value, isDigital && styles.valueDigital)}
          style={{
            fontSize: `${fontSize}px`,
            color,
            textShadow: glowShadow,
          }}
        >
          {formattedValue}
        </span>
        {suffix ? (
          <span
            className={cn(styles.suffix, isDigital && styles.suffixDigital)}
            style={{
              fontSize: `${fontSize * 0.4}px`,
              color,
            }}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {trendEnable ? (
        <TrendIndicator
          downColor={trendDownColor}
          size={fontSize}
          suffix={trendSuffix}
          type={trendType}
          upColor={trendUpColor}
          value={trendValue}
        />
      ) : null}
    </div>
  )
}

export default NumberFlip
