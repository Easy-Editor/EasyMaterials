/**
 * Progress Component
 * 进度组件 - 支持数据源绑定和事件交互
 */

import { useId, useRef, useEffect, useState, useMemo, type CSSProperties } from 'react'
import {
  MaterialEmptyState,
  MATERIAL_CHART_COLORS,
  MATERIAL_THEME,
  shouldHideEmptyMaterial,
  type MaterialComponet,
  useDataSource,
} from '@easy-editor/materials-shared'
import styles from './component.module.css'
import { formatProgressValue, normalizeProgressValue, type ProgressValueFormat } from './model'

export interface ProgressProps extends MaterialComponet {
  /** 最大值 */
  maxValue?: number
  /** 进度条类型 */
  type?: 'ring' | 'bar'
  /** 是否显示数值 */
  showValue?: boolean
  /** 是否显示标签 */
  showLabel?: boolean
  /** 标签文本 */
  label?: string
  /** 数值格式 */
  valueFormat?: ProgressValueFormat
  /** 线条宽度比例（相对于尺寸的百分比） */
  strokeWidthRatio?: number
  /** 轨道颜色 */
  trackColor?: string
  /** 进度颜色 */
  progressColor?: string
  /** 是否启用渐变 */
  gradientEnable?: boolean
  /** 渐变颜色 [起始色, 结束色] */
  gradientColors?: [string, string]
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
}

// 环形进度条组件
const RingProgress = ({
  value,
  percentage,
  strokeWidthRatio,
  trackColor,
  progressColor,
  gradientEnable,
  gradientColors,
  showValue,
  showLabel,
  label,
  valueFormat,
  displayColor,
  gradientId,
}: {
  value: number
  percentage: number
  strokeWidthRatio: number
  trackColor: string
  progressColor: string
  gradientEnable: boolean
  gradientColors: [string, string]
  showValue: boolean
  showLabel: boolean
  label: string
  valueFormat: ProgressValueFormat
  displayColor: string
  gradientId: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(100)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect()
      const minSize = Math.min(width, height)
      if (minSize > 0) {
        setSize(minSize)
      }
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  const safeStrokeWidthRatio = Math.min(0.5, Math.max(0.01, strokeWidthRatio))
  const strokeWidth = Math.max(2, size * safeStrokeWidthRatio)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const center = size / 2
  const progressStroke = gradientEnable ? `url(#${gradientId})` : progressColor
  const hasLabel = showLabel ? label.length > 0 : false

  return (
    <div className={styles.container} ref={containerRef}>
      <svg aria-label='Progress ring' className={styles.ring} height={size} role='img' width={size}>
        <title>Progress indicator</title>
        {gradientEnable ? (
          <defs>
            <linearGradient id={gradientId} x1='0%' x2='100%' y1='0%' y2='0%'>
              <stop offset='0%' stopColor={gradientColors[0]} />
              <stop offset='100%' stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>
        ) : null}
        {/* 轨道 */}
        <circle cx={center} cy={center} fill='none' r={radius} stroke={trackColor} strokeWidth={strokeWidth} />
        {/* 进度 */}
        <circle
          className={styles.ringProgress}
          cx={center}
          cy={center}
          fill='none'
          r={radius}
          stroke={progressStroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={styles.centerContent}>
        {showValue ? (
          <span className={styles.value} style={{ fontSize: size * 0.2, color: displayColor }}>
            {formatProgressValue(value, percentage, valueFormat)}
          </span>
        ) : null}
        {hasLabel ? (
          <span className={styles.label} style={{ fontSize: size * 0.1 }}>
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}

// 线性进度条组件
const BarProgress = ({
  value,
  percentage,
  trackColor,
  progressColor,
  gradientEnable,
  gradientColors,
  showValue,
  showLabel,
  label,
  valueFormat,
  displayColor,
}: {
  value: number
  percentage: number
  trackColor: string
  progressColor: string
  gradientEnable: boolean
  gradientColors: [string, string]
  showValue: boolean
  showLabel: boolean
  label: string
  valueFormat: ProgressValueFormat
  displayColor: string
}) => {
  const fillBackground = gradientEnable
    ? `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`
    : progressColor

  return (
    <div className={styles.barContainer}>
      {showLabel || showValue ? (
        <div className={styles.barLabels}>
          {showLabel ? <span className={styles.barLabel}>{label}</span> : null}
          {showValue ? (
            <span className={styles.barValue} style={{ color: displayColor }}>
              {formatProgressValue(value, percentage, valueFormat)}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={styles.barWrapper} style={{ background: trackColor }}>
        <div
          className={styles.barFill}
          style={{
            transform: `scaleX(${percentage / 100})`,
            background: fillBackground,
          }}
        />
      </div>
    </div>
  )
}

export const Progress: React.FC<ProgressProps> = ({
  ref,
  $data,
  __dataSource,
  __designMode,
  emptyBehavior,
  emptyText,
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  style: externalStyle,
  maxValue = 100,
  type = 'ring',
  showValue = true,
  showLabel = false,
  label = '',
  valueFormat = 'percent',
  strokeWidthRatio = 0.07,
  trackColor = `var(--ee-material-track, ${MATERIAL_THEME.track})`,
  progressColor = `var(--ee-material-accent, ${MATERIAL_THEME.accent})`,
  gradientEnable = false,
  gradientColors = [MATERIAL_CHART_COLORS[0], MATERIAL_CHART_COLORS[4]],
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const gradientId = useId()

  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const value = useMemo<number | null>(() => {
    if (dataSource.length > 0 && typeof dataSource[0]?.value === 'number') {
      return dataSource[0].value
    }
    return null
  }, [dataSource])
  const isEmpty = value === null
  const normalized = normalizeProgressValue(value ?? 0, maxValue)
  const { value: normalizedValue, percentage } = normalized
  const resolvedGradientColors: [string, string] = [
    gradientColors[0] || MATERIAL_CHART_COLORS[0],
    gradientColors[1] || gradientColors[0] || MATERIAL_CHART_COLORS[4],
  ]
  const displayColor = gradientEnable ? resolvedGradientColors[0] : progressColor

  const wrapperStyle: CSSProperties = {
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }

  if (shouldHideEmptyMaterial(isEmpty, emptyBehavior, __designMode)) {
    return null
  }

  if (isEmpty) {
    return (
      <div className={styles.wrapper} ref={ref} style={wrapperStyle}>
        <MaterialEmptyState behavior={emptyBehavior} designMode={__designMode} text={emptyText} />
      </div>
    )
  }

  if (type === 'ring') {
    return (
      <div
        className={styles.wrapper}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        style={wrapperStyle}
      >
        <RingProgress
          displayColor={displayColor}
          gradientColors={resolvedGradientColors}
          gradientEnable={gradientEnable}
          gradientId={gradientId}
          label={label}
          percentage={percentage}
          progressColor={progressColor}
          showLabel={showLabel}
          showValue={showValue}
          strokeWidthRatio={strokeWidthRatio}
          trackColor={trackColor}
          value={normalizedValue}
          valueFormat={valueFormat}
        />
      </div>
    )
  }

  return (
    <div
      className={styles.wrapper}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={wrapperStyle}
    >
      <BarProgress
        displayColor={displayColor}
        gradientColors={resolvedGradientColors}
        gradientEnable={gradientEnable}
        label={label}
        percentage={percentage}
        progressColor={progressColor}
        showLabel={showLabel}
        showValue={showValue}
        trackColor={trackColor}
        value={normalizedValue}
        valueFormat={valueFormat}
      />
    </div>
  )
}

export default Progress
