import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME, DEFAULT_DATA, DEFAULT_SERIES } from './constants'

const snippets: Snippet[] = [
  {
    title: '雷达图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        dimensionKey: 'dimension',
        series: DEFAULT_SERIES,
        showGrid: true,
        fillOpacity: 0.3,
        glowEffect: true,
        showLegend: true,
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
    title: '单系列雷达图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: [
          { dimension: 'Attack', value: 85 },
          { dimension: 'Defense', value: 70 },
          { dimension: 'Speed', value: 95 },
          { dimension: 'Magic', value: 60 },
          { dimension: 'HP', value: 75 },
        ],
        dimensionKey: 'dimension',
        series: [{ name: 'Stats', dataKey: 'value', color: '#00d4ff' }],
        showGrid: true,
        fillOpacity: 0.4,
        glowEffect: true,
        showLegend: false,
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
