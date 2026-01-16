/**
 * Fly Line Snippets
 * 飞线组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME, DEFAULT_FLY_LINES, DEFAULT_SCATTER_POINTS } from './constants'

export const snippets: Snippet[] = [
  {
    title: '飞线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        mapType: 'china',
        // @ts-expect-error
        flyLines: DEFAULT_FLY_LINES,
        // @ts-expect-error
        scatterPoints: DEFAULT_SCATTER_POINTS,
        showAnimation: true,
        animationSpeed: 2,
        curveness: 0.3,
        showScatter: true,
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
      props: {
        mapType: 'china',
        // @ts-expect-error
        flyLines: DEFAULT_FLY_LINES,
        // @ts-expect-error
        scatterPoints: DEFAULT_SCATTER_POINTS,
        showAnimation: true,
        animationSpeed: 3,
        curveness: 0.5,
        showScatter: true,
        lineColor: '#ff6b6b',
        lineGlowColor: '#ff6b6b',
        scatterColor: '#4ecdc4',
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
