/**
 * Video Snippets
 * 视频组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '视频播放器',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '视频播放器',
      props: {
        $data: generateStaticDataSource({ src: '' }),
        poster: '',
        autoPlay: false,
        loop: false,
        muted: false,
        controls: true,
        objectFit: 'contain',
        borderRadius: 8,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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
      title: '背景视频',
      props: {
        $data: generateStaticDataSource({ src: '' }),
        autoPlay: true,
        loop: true,
        muted: true,
        controls: false,
        objectFit: 'cover',
        borderRadius: 0,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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

export { snippets }
