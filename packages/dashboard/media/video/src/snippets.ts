/**
 * Video Snippets
 * 视频组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '视频播放器',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        src: '',
        poster: '',
        autoPlay: false,
        loop: false,
        muted: false,
        controls: true,
        objectFit: 'contain',
        borderRadius: 8,
      },
      $dashboard: {
        rect: {
          width: 400,
          height: 300,
        },
      },
    },
  },
  {
    title: '背景视频',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        src: '',
        autoPlay: true,
        loop: true,
        muted: true,
        controls: false,
        objectFit: 'cover',
        borderRadius: 0,
      },
      $dashboard: {
        rect: {
          width: 600,
          height: 400,
        },
      },
    },
  },
]

export default snippets
