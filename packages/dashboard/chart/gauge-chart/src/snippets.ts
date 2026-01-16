import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '仪表盘',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 65,
        min: 0,
        max: 100,
        showScale: true,
        divisions: 10,
        showLabels: true,
        pointerType: 'needle',
        pointerColor: '#ffffff',
      },
      $dashboard: {
        rect: {
          width: 220,
          height: 140,
        },
      },
    },
  },
  {
    title: '发光仪表盘',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 78,
        min: 0,
        max: 100,
        unit: '%',
        showScale: true,
        divisions: 10,
        showLabels: true,
        pointerType: 'needle',
        pointerColor: '#00ffff',
        glowEffect: true,
      },
      $dashboard: {
        rect: {
          width: 220,
          height: 140,
        },
      },
    },
  },
]

export default snippets
