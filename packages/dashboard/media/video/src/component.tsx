/**
 * Video Component
 * 视频播放组件 - 支持数据源绑定和事件交互
 */

import { useState, useRef, useEffect, useMemo, type MouseEventHandler } from 'react'
import { cn, useDataSource, type MaterialComponet } from '@easy-editor/materials-shared'
import styles from './component.module.css'

export type ObjectFit = 'cover' | 'contain' | 'fill'

export interface VideoProps extends MaterialComponet {
  /** 视频地址（兼容旧版） */
  src?: string
  /** 封面图片 */
  poster?: string
  /** 自动播放 */
  autoPlay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 静音 */
  muted?: boolean
  /** 显示控制条 */
  controls?: boolean
  /** 播放速度 */
  playbackRate?: number
  /** 音量 (0-100) */
  volume?: number
  /** 填充方式 */
  objectFit?: ObjectFit
  /** 圆角 */
  borderRadius?: number
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

const getObjectFitClass = (fit: ObjectFit): string => {
  switch (fit) {
    case 'cover':
      return styles.videoCover
    case 'contain':
      return styles.videoContain
    case 'fill':
      return styles.videoFill
    default:
      return styles.videoContain
  }
}

export const Video: React.FC<VideoProps> = ({
  __designMode,
  ref,
  $data,
  __dataSource,
  src: staticSrc = '',
  poster = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  playbackRate = 1,
  volume = 100,
  objectFit = 'contain',
  borderRadius = 8,
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

  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPoster, setShowPoster] = useState(!autoPlay && poster !== '')

  // 更新播放速度和音量
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
      videoRef.current.volume = volume / 100
    }
  }, [playbackRate, volume])

  // 事件监听
  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handlePlay = () => onPlay?.()
    const handlePause = () => onPause?.()
    const handleEnded = () => onEnded?.()

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onPlay, onPause, onEnded])

  const handlePlay: MouseEventHandler<HTMLImageElement | HTMLButtonElement> = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setShowPoster(false)
    }
  }

  return (
    <div
      className={styles.container}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      style={{ borderRadius }}
    >
      <video
        autoPlay={autoPlay}
        className={cn(styles.video, getObjectFitClass(objectFit))}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        poster={showPoster ? undefined : poster}
        ref={videoRef}
        src={src}
        style={{
          pointerEvents: __designMode === 'design' ? 'none' : 'auto',
        }}
      />
      {showPoster && poster !== '' ? (
        <>
          <button aria-label='Play video' className={styles.poster} onClick={handlePlay} type='button'>
            <img alt='Video poster' className={styles.poster} height='100%' src={poster} width='100%' />
          </button>
          <button aria-label='Play video' className={styles.playButton} onClick={handlePlay} type='button'>
            <div className={styles.playIcon} />
          </button>
        </>
      ) : null}
    </div>
  )
}

export default Video
