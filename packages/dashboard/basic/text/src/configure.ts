/**
 * Text Configure
 * 文本组件配置
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
              setter: 'NodeInfoSetter',
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
                  name: 'content',
                  title: '文本内容',
                  setter: 'TextAreaSetter',
                  extraProps: {
                    defaultValue: '文本内容',
                  },
                },
                {
                  name: 'isLink',
                  title: '作为链接',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
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
              title: '字体',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'fontSize',
                  title: '字体大小',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 16,
                  },
                },
                {
                  name: 'fontWeight',
                  title: '字体粗细',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '正常', value: 'normal' },
                        { label: '粗体', value: 'bold' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'normal',
                  },
                },
                {
                  name: 'color',
                  title: '颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#ffffff',
                  },
                },
                {
                  name: 'lineHeight',
                  title: '行高',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 1.5,
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '对齐',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'textAlign',
                  title: '水平对齐',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '左', value: 'left' },
                        { label: '中', value: 'center' },
                        { label: '右', value: 'right' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'left',
                  },
                },
                {
                  name: 'verticalAlign',
                  title: '垂直对齐',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '上', value: 'top' },
                        { label: '中', value: 'middle' },
                        { label: '下', value: 'bottom' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'middle',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '效果',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'underline',
                  title: '下划线',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
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
                {
                  name: 'glowColor',
                  title: '发光颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
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
