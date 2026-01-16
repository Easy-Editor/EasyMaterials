/**
 * Carousel Snippets
 * 轮播组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '图片轮播',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        items: [
          { src: 'https://picsum.photos/800/400?random=1', alt: 'Slide 1' },
          { src: 'https://picsum.photos/800/400?random=2', alt: 'Slide 2' },
          { src: 'https://picsum.photos/800/400?random=3', alt: 'Slide 3' },
        ],
        autoPlay: true,
        interval: 3000,
        showNav: true,
        showIndicators: true,
        loop: true,
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
      props: {
        items: [
          { src: 'https://picsum.photos/800/400?random=4', alt: 'Slide 1' },
          { src: 'https://picsum.photos/800/400?random=5', alt: 'Slide 2' },
        ],
        autoPlay: false,
        showNav: true,
        showIndicators: true,
        loop: true,
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

export default snippets
