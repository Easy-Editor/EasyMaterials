import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME, DEFAULT_DATA } from './constants'

const snippets: Snippet[] = [
  {
    title: '折线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        xField: 'name',
        yFields: ['value1', 'value2'],
        showGrid: true,
        showLegend: true,
        glowEffect: true,
        strokeWidth: 2,
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
    title: '简单折线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        xField: 'name',
        yFields: ['value1'],
        showGrid: true,
        showLegend: false,
        glowEffect: true,
        strokeWidth: 3,
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
