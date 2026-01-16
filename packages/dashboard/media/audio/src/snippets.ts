/**
 * Audio Snippets
 * 音频组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '音频播放器',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        src: '',
        title: '音频文件',
        autoPlay: false,
        loop: false,
        audioStyle: 'custom',
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
      props: {
        src: '',
        title: '音频文件',
        audioStyle: 'native',
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

export default snippets
