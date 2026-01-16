import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME, DEFAULT_DATA } from './constants'

const snippets: Snippet[] = [
  {
    title: '柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        xField: 'name',
        yFields: ['value1', 'value2'],
        layout: 'vertical',
        stacked: false,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
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
    title: '堆叠柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        xField: 'name',
        yFields: ['value1', 'value2'],
        layout: 'vertical',
        stacked: true,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
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
    title: '水平柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        data: DEFAULT_DATA,
        xField: 'name',
        yFields: ['value1'],
        layout: 'horizontal',
        stacked: false,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
        showLegend: false,
      },
      $dashboard: {
        rect: {
          width: 400,
          height: 250,
        },
      },
    },
  },
]

export default snippets
