/**
 * Scroll List Component
 * 滚动列表组件 - 支持数据源绑定和事件交互
 */

import { useMemo, type CSSProperties, type HTMLAttributes } from 'react'
import {
  cn,
  MaterialEmptyState,
  MATERIAL_CHART_COLORS,
  MATERIAL_THEME,
  shouldHideEmptyMaterial,
  useDataSource,
  type MaterialComponet,
} from '@easy-editor/materials-shared'
import styles from './component.module.css'

export interface ScrollListItem {
  rank: number
  name: string
  value: number
}

export interface ScrollListProps extends MaterialComponet {
  /** 列表展示样式 */
  displayStyle?: 'standard' | 'ranking-track'
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
  __designMode,
  emptyBehavior,
  emptyText,
  displayStyle = 'standard',
  maxItems = 5,
  showRank = true,
  showMedal = false,
  progressBarEnable = true,
  progressBarGradient = false,
  progressBarColors = [MATERIAL_CHART_COLORS[0], MATERIAL_CHART_COLORS[4]],
  valueFormat = 'number',
  valuePrefix = '',
  valueSuffix = '',
  nameColor = `var(--ee-material-foreground, ${MATERIAL_THEME.foreground})`,
  valueColor = `var(--ee-material-foreground, ${MATERIAL_THEME.foreground})`,
  backgroundColor = `var(--ee-material-surface, ${MATERIAL_THEME.surface})`,
  borderColor = `var(--ee-material-border, ${MATERIAL_THEME.border})`,
  itemBackgroundColor = 'transparent',
  itemBorderColor = `var(--ee-material-border, ${MATERIAL_THEME.border})`,
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
  const data = useMemo<ScrollListItem[]>(
    () =>
      dataSource.flatMap(item => {
        if (typeof item.rank !== 'number' || typeof item.name !== 'string' || typeof item.value !== 'number') {
          return []
        }
        return [{ rank: item.rank, name: item.name, value: item.value }]
      }),
    [dataSource],
  )

  const safeMaxItems = Number.isFinite(maxItems) ? Math.max(1, Math.trunc(maxItems)) : 5
  const displayData = data.slice(0, safeMaxItems)
  const maxValue = Math.max(...displayData.map(item => item.value), 1)
  const resolvedProgressBarColors: [string, string] = [
    progressBarColors[0] || MATERIAL_CHART_COLORS[0],
    progressBarColors[1] || progressBarColors[0] || MATERIAL_CHART_COLORS[4],
  ]

  const getProgressPercentage = (value: number) => Math.min(100, Math.max(0, (value / maxValue) * 100))

  const getProgressBarStyle = (value: number): CSSProperties => {
    const percentage = getProgressPercentage(value)
    return {
      transform: `scaleX(${percentage / 100})`,
      background: progressBarGradient
        ? `linear-gradient(90deg, ${resolvedProgressBarColors[0]}, ${resolvedProgressBarColors[1]})`
        : resolvedProgressBarColors[0],
      outline: glowEnable ? `1px solid ${resolvedProgressBarColors[0]}` : undefined,
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

  const isEmpty = displayData.length === 0
  if (shouldHideEmptyMaterial(isEmpty, emptyBehavior, __designMode)) {
    return null
  }

  if (isEmpty) {
    return (
      <div className={styles.container} ref={ref} style={containerStyle}>
        <MaterialEmptyState behavior={emptyBehavior} designMode={__designMode} text={emptyText} />
      </div>
    )
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
          const highlightRank = showMedal ? isTopThree : false
          const isRankingTrack = displayStyle === 'ranking-track'
          let interactionProps: HTMLAttributes<HTMLDivElement> | undefined
          if (onItemClick) {
            const itemClickHandler = onItemClick
            interactionProps = {
              role: 'button',
              tabIndex: 0,
              onKeyDown: event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  itemClickHandler(item, index)
                }
              },
            }
          }

          return (
            <div
              className={cn(styles.item, isRankingTrack ? styles.itemRankingTrack : '')}
              key={item.rank}
              onClick={() => onItemClick?.(item, index)}
              style={itemStyle}
              {...interactionProps}
            >
              {/* Rank Badge */}
              {showRank ? (
                <div className={cn(styles.rankBadge, highlightRank ? styles.rankBadgeTopThree : '')}>
                  {isRankingTrack ? `No.${item.rank}` : String(item.rank).padStart(2, '0')}
                </div>
              ) : null}

              {/* Name */}
              <div className={styles.name} style={{ color: nameColor }}>
                {item.name}
              </div>

              {/* Value and Progress */}
              {isRankingTrack ? (
                <div className={styles.rankingValueContainer}>
                  {progressBarEnable ? (
                    <div className={styles.rankingTrack}>
                      <div className={styles.rankingFill} style={getProgressBarStyle(item.value)} />
                      <span
                        className={styles.rankingMarker}
                        style={{
                          left: `${getProgressPercentage(item.value)}%`,
                          borderColor: resolvedProgressBarColors[0],
                        }}
                      />
                    </div>
                  ) : null}
                  <span className={styles.value} style={{ color: valueColor }}>
                    {formatDisplayValue(item.value, valueFormat, valuePrefix, valueSuffix)}
                  </span>
                </div>
              ) : (
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
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollList
