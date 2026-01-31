/**
 * Carousel Snippets
 * 轮播组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认轮播数据 */
const DEFAULT_CAROUSEL_DATA = [
  { src: 'https://picsum.photos/800/400?random=1', alt: 'Slide 1' },
  { src: 'https://picsum.photos/800/400?random=2', alt: 'Slide 2' },
  { src: 'https://picsum.photos/800/400?random=3', alt: 'Slide 3' },
]

export const snippets: Snippet[] = [
  {
    title: '图片轮播',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '图片轮播',
      props: {
        $data: generateStaticDataSource(DEFAULT_CAROUSEL_DATA),
        autoPlay: true,
        interval: 3000,
        showNav: true,
        showIndicators: true,
        loop: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 600,
          height: 300,
        },
      },
    },
  },
  {
    title: '手动轮播',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '手动轮播',
      props: {
        $data: generateStaticDataSource([
          { src: 'https://picsum.photos/800/400?random=4', alt: 'Slide 1' },
          { src: 'https://picsum.photos/800/400?random=5', alt: 'Slide 2' },
        ]),
        autoPlay: false,
        showNav: true,
        showIndicators: true,
        loop: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 600,
          height: 300,
        },
      },
    },
  },
]
