/**
 * Text Snippets
 * 文本组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'
import { generateStaticDataSource, MATERIAL_THEME } from '@easy-editor/materials-shared'

export const snippets: Snippet[] = [
  {
    title: '普通文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '普通文本',
      props: {
        fontSize: 16,
        color: MATERIAL_THEME.foreground,
        glowEnable: false,
        glowIntensity: 0,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource({ text: '普通文本' }),
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
        color: MATERIAL_THEME.foreground,
        glowEnable: false,
        glowIntensity: 0,
        textAlign: 'center',
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource({ text: '标题文本' }),
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
    title: '说明文本',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '说明文本',
      props: {
        fontSize: 14,
        color: MATERIAL_THEME.mutedForeground,
        lineHeight: 1.6,
        textAlign: 'left',
        glowEnable: false,
        glowIntensity: 0,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource({ text: '说明文本' }),
      },
      $dashboard: {
        rect: {
          width: 240,
          height: 48,
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
        color: MATERIAL_THEME.accent,
        isLink: true,
        href: 'https://easy-editor-docs.vercel.app/',
        target: '_blank',
        underline: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
        $data: generateStaticDataSource({ text: '点击跳转' }),
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
        color: MATERIAL_THEME.foreground,
        textAlign: 'center',
        verticalAlign: 'middle',
        rotation: 0,
        opacity: 100,
        background: MATERIAL_THEME.surfaceRaised,
        $data: generateStaticDataSource({ text: '标签' }),
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
