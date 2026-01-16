import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '地理地图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        mapType: 'china',
        showVisualMap: true,
        showTooltip: true,
        showScatter: true,
        glowEffect: true,
        roam: true,
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
    title: '地图（无散点）',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        mapType: 'china',
        showVisualMap: true,
        showTooltip: true,
        showScatter: false,
        glowEffect: true,
        roam: true,
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
