import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '散点图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        xLabel: 'X',
        yLabel: 'Y',
        pointSize: 8,
        showGrid: true,
        showLegend: true,
        glowEffect: true,
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
    title: '简单散点图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        xLabel: 'Value X',
        yLabel: 'Value Y',
        pointSize: 10,
        showGrid: true,
        showLegend: false,
        glowEffect: true,
      },
      $dashboard: {
        rect: {
          width: 300,
          height: 200,
        },
      },
    },
  },
]

export default snippets
