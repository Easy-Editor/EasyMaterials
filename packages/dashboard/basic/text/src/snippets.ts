/**
 * Text Snippets
 * 文本组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '普通文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        content: '这是一段普通文本',
        fontSize: 16,
        color: '#ffffff',
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
      props: {
        content: '标题文本',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
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
      props: {
        content: '发光标题',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#00d4ff',
        textAlign: 'center',
        glowEnable: true,
        glowColor: '#00d4ff',
        glowIntensity: 1.5,
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
      props: {
        content: '点击跳转',
        fontSize: 16,
        color: '#00d4ff',
        isLink: true,
        href: 'https://easy-editor-docs.vercel.app/',
        target: '_blank',
        underline: true,
      },
      $dashboard: {
        rect: {
          width: 120,
          height: 40,
        },
      },
    },
  },
]
