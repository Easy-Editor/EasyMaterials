import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME, DEFAULT_DATA } from './constants'

const snippets: Snippet[] = [
  {
    title: '饼图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        innerRadius: 0,
        outerRadius: 70,
        showLabel: true,
        labelType: 'percent',
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
    title: '环形图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        innerRadius: 50,
        outerRadius: 70,
        showLabel: true,
        labelType: 'percent',
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
]

export default snippets
