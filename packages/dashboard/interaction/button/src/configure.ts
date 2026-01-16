/**
 * Button Configure
 * 按钮组件配置
 */

import type { Configure } from '@easy-editor/core'

export const configure: Configure = {
  props: [
    {
      type: 'group',
      title: '属性',
      setter: 'TabSetter',
      items: [
        {
          type: 'group',
          key: 'config',
          title: '配置',
          setter: {
            componentName: 'CollapseSetter',
            props: {
              icon: false,
            },
          },
          items: [
            // 基础配置
            {
              name: 'id',
              title: 'ID',
              setter: 'NodeIdSetter',
              extraProps: {
                // @ts-expect-error label is not a valid extra prop
                label: false,
              },
            },
            {
              name: 'title',
              title: '标题',
              setter: 'StringSetter',
              extraProps: {
                getValue(target) {
                  return target.getExtraPropValue('title')
                },
                setValue(target, value) {
                  target.setExtraPropValue('title', value)
                },
              },
            },
            {
              type: 'group',
              title: '基础属性',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'rect',
                  title: '位置尺寸',
                  setter: 'RectSetter',
                  extraProps: {
                    getValue(target) {
                      return target.getExtraPropValue('$dashboard.rect')
                    },
                    setValue(target, value) {
                      target.setExtraPropValue('$dashboard.rect', value)
                    },
                  },
                },
              ],
            },
            // 组件配置
            {
              type: 'group',
              title: '内容',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'text',
                  title: '按钮文本',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '按钮',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '样式',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'variant',
                  title: '变体',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '主要', value: 'primary' },
                        { label: '次要', value: 'secondary' },
                        { label: '轮廓', value: 'outline' },
                        { label: '幽灵', value: 'ghost' },
                        { label: '危险', value: 'danger' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'primary',
                  },
                },
                {
                  name: 'size',
                  title: '尺寸',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '小', value: 'small' },
                        { label: '中', value: 'medium' },
                        { label: '大', value: 'large' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'medium',
                  },
                },
                {
                  name: 'glowEnable',
                  title: '发光效果',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '链接',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'href',
                  title: '链接地址',
                  setter: 'StringSetter',
                },
                {
                  name: 'target',
                  title: '打开方式',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '新窗口', value: '_blank' },
                        { label: '当前窗口', value: '_self' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: '_blank',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '行为',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'disabled',
                  title: '禁用',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'loading',
                  title: '加载中',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'loadingText',
                  title: '加载文本',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '加载中...',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          key: 'data',
          title: '数据',
          items: [
            {
              name: 'dataBinding',
              title: '数据绑定',
              setter: 'DataBindingSetter',
            },
          ],
        },
        {
          type: 'group',
          key: 'advanced',
          title: '高级',
          items: [
            {
              name: 'condition',
              title: '显隐控制',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
                supportVariable: true,
              },
            },
          ],
        },
      ],
    },
  ],
  component: {},
  supports: {},
  advanced: {},
}

export default configure
