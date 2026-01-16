/**
 * Progress Configure
 * 进度条组件配置
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
              title: '数值',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'value',
                  title: '当前值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'maxValue',
                  title: '最大值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 100,
                  },
                },
                {
                  name: 'valueFormat',
                  title: '值格式',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '百分比', value: 'percent' },
                        { label: '数值', value: 'number' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'percent',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '显示',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'type',
                  title: '进度条类型',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '环形', value: 'ring' },
                        { label: '线性', value: 'bar' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'ring',
                  },
                },
                {
                  name: 'showValue',
                  title: '显示数值',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'showLabel',
                  title: '显示标签',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'label',
                  title: '标签文本',
                  setter: 'StringSetter',
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
                  name: 'strokeWidthRatio',
                  title: '线条粗细',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0.02,
                      max: 0.2,
                      step: 0.01,
                    },
                  },
                  extraProps: {
                    defaultValue: 0.07,
                  },
                },
                {
                  name: 'trackColor',
                  title: '轨道颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                {
                  name: 'progressColor',
                  title: '进度颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00ffff',
                  },
                },
                {
                  name: 'gradientEnable',
                  title: '启用渐变',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'gradientColors',
                  title: '渐变颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: ['#00d4ff', '#9b59b6'],
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
