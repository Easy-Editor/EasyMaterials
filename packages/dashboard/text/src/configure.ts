import type { Configure } from '@easy-editor/core'
import Text from './component'

const configure: Configure = {
  props: [
    {
      type: 'group',
      title: '功能',
      setter: 'TabSetter',
      items: [
        {
          type: 'group',
          key: 'basic',
          title: '基本',
          items: [
            {
              name: 'id',
              title: 'ID',
              setter: 'NodeIdSetter',
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
            {
              name: 'text',
              title: '文本内容',
              setter: 'StringSetter',
            },
            {
              type: 'group',
              title: '字体样式',
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
                    defaultValue: 14,
                  },
                },
                {
                  name: 'color',
                  title: '文字颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#000000',
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
          ],
        },
        {
          type: 'group',
          key: 'advanced',
          title: '高级',
          items: [
            {
              type: 'group',
              title: '高级设置',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  title: '显隐',
                  setter: 'SwitchSetter',
                  extraProps: {
                    supportVariable: true,
                    getValue(target) {
                      return target.getExtraPropValue('condition')
                    },
                    setValue(target, value: boolean) {
                      target.setExtraPropValue('condition', value)
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  component: {},
  supports: {},
  advanced: {
    view: Text,
  },
}

export default configure
