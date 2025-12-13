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
              setter: 'TextAreaSetter',
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
                  name: 'fontWeight',
                  title: '字体粗细',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '正常', value: 'normal' },
                        { label: '粗体', value: 'bold' },
                        { label: '100', value: '100' },
                        { label: '200', value: '200' },
                        { label: '300', value: '300' },
                        { label: '400', value: '400' },
                        { label: '500', value: '500' },
                        { label: '600', value: '600' },
                        { label: '700', value: '700' },
                        { label: '800', value: '800' },
                        { label: '900', value: '900' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'normal',
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
                {
                  name: 'textAlign',
                  title: '文本对齐',
                  setter: {
                    componentName: 'RadioGroupSetter',
                    props: {
                      options: [
                        { label: '左对齐', value: 'left' },
                        { label: '居中', value: 'center' },
                        { label: '右对齐', value: 'right' },
                        { label: '两端对齐', value: 'justify' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'left',
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
