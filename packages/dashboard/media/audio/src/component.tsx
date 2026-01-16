/**
 * Audio Component
 * 音频播放组件
 */

import { useState, useRef, useEffect, type CSSProperties, type Ref } from 'react'
import styles from './component.module.css'

export type AudioStyle = 'custom' | 'native'

export interface AudioProps {
  ref?: Ref<HTMLDivElement>
  /** 音频地址 */
  src?: string
  /** 标题 */
  title?: string
  /** 自动播放 */
  autoPlay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 样式类型 */
  audioStyle?: AudioStyle
  /** 外部样式 */
  style?: CSSProperties
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const Audio: React.FC<AudioProps> = ({
  ref,
  src = '',
  title = '音频文件',
  autoPlay = false,
  loop = false,
  audioStyle = 'custom',
  style: externalStyle,
}) => {
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
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
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

  // 原生样式
  if (audioStyle === 'native') {
    return (
      <div className={styles.container} ref={ref} style={externalStyle}>
        <audio autoPlay={autoPlay} className={styles.nativeAudio} controls loop={loop} ref={audioRef} src={src} />
      </div>
    )
  }

  // 自定义样式
  return (
    <div className={styles.container} ref={ref} style={externalStyle}>
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

export default Audio
