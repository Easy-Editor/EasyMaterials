/**
 * Audio Component
 * 音频播放组件 - 支持数据源绑定和事件交互
 */

import { useState, useRef, useEffect, useMemo, type CSSProperties } from 'react'
import { useDataSource, type MaterialComponet } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type AudioStyle = 'custom' | 'native'

export interface AudioProps extends MaterialComponet {
  /** 音频地址（兼容旧版） */
  src?: string
  /** 标题 */
  title?: string
  /** 自动播放 */
  autoPlay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 样式类型 */
  audioStyle?: AudioStyle
  /** 播放速度 */
  playbackRate?: number
  /** 音量 (0-100) */
  volume?: number
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** 双击事件 */
  onDoubleClick?: (e: React.MouseEvent) => void
  /** 鼠标进入 */
  onMouseEnter?: (e: React.MouseEvent) => void
  /** 鼠标离开 */
  onMouseLeave?: (e: React.MouseEvent) => void
  /** 播放事件 */
  onPlay?: () => void
  /** 暂停事件 */
  onPause?: () => void
  /** 结束事件 */
  onEnded?: () => void
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const Audio: React.FC<AudioProps> = ({
  ref,
  $data,
  __dataSource,
  src: staticSrc = '',
  title = '音频文件',
  autoPlay = false,
  loop = false,
  audioStyle = 'custom',
  playbackRate = 1,
  volume = 100,
  rotation = 0,
  opacity = 100,
  background = 'transparent',
  style: externalStyle,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  onPlay,
  onPause,
  onEnded,
}) => {
  // 解析数据源
  const dataSource = useDataSource($data, __dataSource)
  const src = useMemo<string>(() => {
    if (dataSource.length > 0 && typeof dataSource[0]?.src === 'string') {
      return dataSource[0].src
    }
    return staticSrc
  }, [dataSource, staticSrc])

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [onEnded, onPlay, onPause])

  // 更新播放速度和音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
      audioRef.current.volume = volume / 100
    }
  }, [playbackRate, volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      audioRef.current.currentTime = percent * duration
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  const containerStyle: CSSProperties = {
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    opacity: opacity / 100,
    backgroundColor: background,
    ...externalStyle,
  }

  // 原生样式
  if (audioStyle === 'native') {
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
        <audio autoPlay={autoPlay} className={styles.nativeAudio} controls loop={loop} ref={audioRef} src={src} />
      </div>
    )
  }

  // 自定义样式
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
      <audio autoPlay={autoPlay} loop={loop} ref={audioRef} src={src} />

      <button
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className={styles.playButton}
        onClick={togglePlay}
        type='button'
      >
        {isPlaying ? (
          <div className={styles.pauseIcon}>
            <div className={styles.pauseBar} />
            <div className={styles.pauseBar} />
          </div>
        ) : (
          <div className={styles.playIcon} />
        )}
      </button>

      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.progressContainer}>
          <button
            aria-label='Seek to position'
            className={styles.progressBar}
            // @ts-expect-error
            onClick={handleProgressClick}
            type='button'
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </button>
          <span className={styles.time}>
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
        </div>
      </div>
    </div>
  )
}
