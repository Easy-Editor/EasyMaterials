/**
 * Video Component
 * 视频播放组件
 */

import { useState, useRef, type CSSProperties, type Ref, type MouseEventHandler } from 'react'
import { cn } from '@easy-editor/materials-shared'
import styles from './component.module.css'
import type { DesignMode } from '@easy-editor/core'

export type ObjectFit = 'cover' | 'contain' | 'fill'

export interface VideoProps {
  __designMode: DesignMode
  ref?: Ref<HTMLDivElement>
  /** 视频地址 */
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
  /** 填充方式 */
  objectFit?: ObjectFit
  /** 圆角 */
  borderRadius?: number
  /** 外部样式 */
  style?: CSSProperties
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
  src = '',
  poster = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  objectFit = 'contain',
  borderRadius = 8,
  style: externalStyle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPoster, setShowPoster] = useState(!autoPlay && poster !== '')

  const handlePlay: MouseEventHandler<HTMLImageElement | HTMLButtonElement> = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setShowPoster(false)
    }
  }

  return (
    <div className={styles.container} ref={ref} style={{ borderRadius, ...externalStyle }}>
      <video
        autoPlay={autoPlay}
        className={cn(styles.video, getObjectFitClass(objectFit))}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        poster={showPoster ? undefined : poster}
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
