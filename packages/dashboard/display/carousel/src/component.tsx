/**
 * Carousel Component
 * 轮播组件
 */

import { useState, useEffect, useCallback, type CSSProperties, type Ref } from 'react'
import styles from './component.module.css'

export interface CarouselItem {
  /** 图片地址 */
  src: string
  /** 图片描述 */
  alt?: string
  /** 点击链接 */
  link?: string
}

export interface CarouselProps {
  ref?: Ref<HTMLDivElement>
  /** 轮播项 */
  items?: CarouselItem[]
  /** 自动播放 */
  autoPlay?: boolean
  /** 自动播放间隔（毫秒） */
  interval?: number
  /** 是否显示导航按钮 */
  showNav?: boolean
  /** 是否显示指示器 */
  showIndicators?: boolean
  /** 是否循环播放 */
  loop?: boolean
  /** 外部样式 */
  style?: CSSProperties
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { src: 'https://picsum.photos/800/400?random=1', alt: 'Slide 1' },
  { src: 'https://picsum.photos/800/400?random=2', alt: 'Slide 2' },
  { src: 'https://picsum.photos/800/400?random=3', alt: 'Slide 3' },
]

const ChevronLeft = () => (
  <svg aria-hidden='true' fill='none' height='24' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' width='24'>
    <title>Previous</title>
    <path d='M15 18l-6-6 6-6' />
  </svg>
)

const ChevronRight = () => (
  <svg aria-hidden='true' fill='none' height='24' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' width='24'>
    <title>Next</title>
    <path d='M9 18l6-6-6-6' />
  </svg>
)

export const Carousel: React.FC<CarouselProps> = ({
  ref,
  items = DEFAULT_ITEMS,
  autoPlay = true,
  interval = 3000,
  showNav = true,
  showIndicators = true,
  loop = true,
  style: externalStyle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev >= items.length - 1) {
        return loop ? 0 : prev
      }
      return prev + 1
    })
  }, [items.length, loop])

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev <= 0) {
        return loop ? items.length - 1 : prev
      }
      return prev - 1
    })
  }, [items.length, loop])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // 自动播放
  useEffect(() => {
    if (!autoPlay || items.length <= 1) {
      return
    }

    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, goToNext, items.length])

  if (items.length === 0) {
    return null
  }

  return (
    <div className={styles.container} ref={ref} style={externalStyle}>
      <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div className={styles.slide} key={index}>
            {item.link ? (
              <a href={item.link} rel='noopener noreferrer' target='_blank'>
                <img
                  alt={item.alt || ''}
                  className={styles.slideImage}
                  draggable={false}
                  height='200'
                  src={item.src}
                  width='100%'
                />
              </a>
            ) : (
              <img
                alt={item.alt || ''}
                className={styles.slideImage}
                draggable={false}
                height='200'
                src={item.src}
                width='100%'
              />
            )}
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      {showNav && items.length > 1 && (
        <>
          <button
            aria-label='Previous slide'
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={goToPrev}
            type='button'
          >
            <ChevronLeft />
          </button>
          <button
            aria-label='Next slide'
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={goToNext}
            type='button'
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* 指示器 */}
      {showIndicators && items.length > 1 && (
        <div className={styles.indicators}>
          {items.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              key={index}
              onClick={() => goToSlide(index)}
              type='button'
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
