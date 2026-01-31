/**
 * Fly Line Snippets
 * 飞线组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME, DEFAULT_FLY_LINES } from './constants'

const snippets: Snippet[] = [
  {
    title: '飞线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '飞线图',
      props: {
        $data: generateStaticDataSource(DEFAULT_FLY_LINES),
        mapType: 'china',
        showAnimation: true,
        animationSpeed: 2,
        curveness: 0.3,
        showScatter: true,
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
  {
    title: '迁徙图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '迁徙图',
      props: {
        $data: generateStaticDataSource(DEFAULT_FLY_LINES),
        mapType: 'china',
        showAnimation: true,
        animationSpeed: 3,
        curveness: 0.5,
        showScatter: true,
        lineColor: '#ff6b6b',
        lineGlowColor: '#ff6b6b',
        scatterColor: '#4ecdc4',
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
