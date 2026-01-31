/**
 * Audio Snippets
 * 音频组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '音频播放器',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '音频播放器',
      props: {
        $data: generateStaticDataSource({ src: '' }),
        title: '音频文件',
        autoPlay: false,
        loop: false,
        audioStyle: 'custom',
        playbackRate: 1,
        volume: 100,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 300,
          height: 60,
        },
      },
    },
  },
  {
    title: '原生音频',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '原生音频',
      props: {
        $data: generateStaticDataSource({ src: '' }),
        title: '音频文件',
        audioStyle: 'native',
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 300,
          height: 60,
        },
      },
    },
  },
]

export { snippets }
