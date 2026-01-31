/**
 * Scroll List Component
 * 滚动列表组件 - 支持数据源绑定和事件交互
 */

import { useMemo, type CSSProperties } from 'react'
import { cn, useDataSource, type MaterialComponet } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export interface ScrollListItem {
  rank: number
  name: string
  value: number
}

export interface ScrollListProps extends MaterialComponet {
  /** 最大显示条数 */
  maxItems?: number
  /** 是否显示排名 */
  showRank?: boolean
  /** 是否显示奖牌图标 */
  showMedal?: boolean
  /** 是否显示进度条 */
  progressBarEnable?: boolean
  /** 是否使用渐变进度条 */
  progressBarGradient?: boolean
  /** 进度条颜色 [起始色, 结束色] */
  progressBarColors?: [string, string]
  /** 数值格式化 */
  valueFormat?: 'number' | 'currency' | 'percent'
  /** 数值前缀 */
  valuePrefix?: string
  /** 数值后缀 */
  valueSuffix?: string
  /** 名称颜色 */
  nameColor?: string
  /** 数值颜色 */
  valueColor?: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 边框颜色 */
  borderColor?: string
  /** 行背景颜色 */
  itemBackgroundColor?: string
  /** 行边框颜色 */
  itemBorderColor?: string
  /** 是否显示发光效果 */
  glowEnable?: boolean
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
  /** 行点击事件 */
  onItemClick?: (item: ScrollListItem, index: number) => void
}

const DEFAULT_DATA: ScrollListItem[] = [
  { rank: 1, name: '北京市', value: 9800 },
  { rank: 2, name: '上海市', value: 8500 },
  { rank: 3, name: '广州市', value: 7200 },
  { rank: 4, name: '深圳市', value: 6100 },
  { rank: 5, name: '杭州市', value: 4800 },
]

const MEDAL_EMOJI: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

const getRankClass = (rank: number): string => {
  if (rank === 1) {
    return styles.rankGold
  }
  if (rank === 2) {
    return styles.rankSilver
  }
  if (rank === 3) {
    return styles.rankBronze
  }
  return ''
}

const formatDisplayValue = (value: number, format: string, prefix: string, suffix: string): string => {
  let formatted: string
  switch (format) {
    case 'currency':
      formatted = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      break
    case 'percent':
      formatted = `${value}%`
      break
    default:
      formatted = value.toLocaleString()
  }
  return `${prefix}${formatted}${suffix}`
}

export const ScrollList: React.FC<ScrollListProps> = ({
  ref,
  $data,
  __dataSource,
  maxItems = 5,
  showRank = true,
  showMedal = true,
  progressBarEnable = true,
  progressBarGradient = true,
  progressBarColors = ['#00d4ff', '#9b59b6'],
  valueFormat = 'number',
  valuePrefix = '',
  valueSuffix = '',
  nameColor = '#e6e6e6',
  valueColor = '#00d4ff',
  backgroundColor = 'rgba(10, 10, 26, 0.95)',
  borderColor = 'rgba(26, 26, 62, 0.8)',
  itemBackgroundColor = 'rgba(15, 15, 42, 0.9)',
  itemBorderColor = 'rgba(26, 26, 62, 0.6)',
  glowEnable = false,
  rotation = 0,
  opacity = 100,
  style: externalStyle,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}) => {
  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const data = useMemo<ScrollListItem[]>(() => {
    if (dataSource.length > 0) {
      return dataSource as ScrollListItem[]
    }
    return DEFAULT_DATA
  }, [dataSource])

  const displayData = data.slice(0, maxItems)
  const maxValue = Math.max(...displayData.map(item => item.value), 1)

  const getProgressBarStyle = (value: number): CSSProperties => {
    const percentage = (value / maxValue) * 100
    return {
      width: `${percentage}%`,
      background: progressBarGradient
        ? `linear-gradient(90deg, ${progressBarColors[0]}, ${progressBarColors[1]})`
        : progressBarColors[0],
      boxShadow: glowEnable ? `0 0 8px ${progressBarColors[0]}60` : undefined,
    }
  }

  const containerStyle: CSSProperties = {
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor,
    borderColor,
    ...externalStyle,
  }

  const itemStyle: CSSProperties = {
    backgroundColor: itemBackgroundColor,
    borderColor: itemBorderColor,
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
      <div className={styles.list}>
        {displayData.map((item, index) => {
          const isTopThree = item.rank <= 3

          return (
            <div className={styles.item} key={item.rank} onClick={() => onItemClick?.(item, index)} style={itemStyle}>
              {/* Rank Badge */}
              {showRank ? (
                <div
                  className={cn(
                    styles.rankBadge,
                    isTopThree ? styles.rankBadgeTopThree : styles.rankBadgeNormal,
                    getRankClass(item.rank),
                  )}
                >
                  {showMedal && isTopThree ? MEDAL_EMOJI[item.rank] : item.rank}
                </div>
              ) : null}

              {/* Name */}
              <div className={styles.name} style={{ color: nameColor }}>
                {item.name}
              </div>

              {/* Value and Progress */}
              <div className={styles.valueContainer}>
                <span className={styles.value} style={{ color: valueColor }}>
                  {formatDisplayValue(item.value, valueFormat, valuePrefix, valueSuffix)}
                </span>
                {progressBarEnable ? (
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={getProgressBarStyle(item.value)} />
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollList
