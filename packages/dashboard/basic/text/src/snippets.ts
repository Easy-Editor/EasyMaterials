/**
 * Text Snippets
 * 文本组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

// 生成静态数据源
const generateStaticDataSource = (text: string) => {
  return {
    sourceType: "static",
    staticData: [
      {
        text
      }
    ],
    fieldMappings: [
      {
        componentField: "text",
        sourceField: "text"
      }
    ]
  }
}

export const snippets: Snippet[] = [
  {
    title: '普通文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '普通文本',
      props: {
        fontSize: 16,
        color: '#ffffff',
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource('普通文本'),
      },
      $dashboard: {
        rect: {
          width: 120,
          height: 40,
        },
      },
    },
  },
  {
    title: '标题文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '标题文本',
      props: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource('标题文本'),
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 60,
        },
      },
    },
  },
  {
    title: '发光标题',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '发光标题',
      props: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#00d4ff',
        textAlign: 'center',
        glowEnable: true,
        glowColor: '#00d4ff',
        glowIntensity: 1.5,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource('发光标题')
      },
      $dashboard: {
        rect: {
          width: 240,
          height: 80,
        },
      },
    },
  },
  {
    title: '链接文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '链接文本',
      props: {
        fontSize: 16,
        color: '#00d4ff',
        isLink: true,
        href: 'https://easy-editor-docs.vercel.app/',
        target: '_blank',
        underline: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource('点击跳转'),
      },
      $dashboard: {
        rect: {
          width: 120,
          height: 40,
        },
      },
    },
  },
  {
    title: '标签文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '标签文本',
      props: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
        verticalAlign: 'middle',
        rotation: 0,
        opacity: 100,
        background: 'rgba(0, 212, 255, 0.2)',
        $data: generateStaticDataSource('标签'),
      },
      $dashboard: {
        rect: {
          width: 80,
          height: 32,
        },
      },
    },
  },
]
