/**
 * Gauge Chart Configure
 * 仪表盘组件配置
 */

import type { Configure } from '@easy-editor/core'

const configure: Configure = {
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
                  name: 'min',
                  title: '最小值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'max',
                  title: '最大值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 100,
                  },
                },
                {
                  name: 'unit',
                  title: '单位',
                  setter: 'StringSetter',
                },
              ],
            },
            {
              type: 'group',
              title: '数值格式',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'valuePrefix',
                  title: '前缀',
                  setter: 'StringSetter',
                },
                {
                  name: 'valueSuffix',
                  title: '后缀',
                  setter: 'StringSetter',
                },
                {
                  name: 'valueDecimals',
                  title: '小数位数',
                  setter: {
                    componentName: 'NumberSetter',
                    props: {
                      suffix: '位',
                    },
                  },
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'valueSeparator',
                  title: '千分位分隔',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '刻度',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'showScale',
                  title: '显示刻度',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'divisions',
                  title: '刻度数量',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 2,
                      max: 20,
                      step: 1,
                    },
                  },
                  extraProps: {
                    defaultValue: 10,
                  },
                },
                {
                  name: 'showLabels',
                  title: '显示刻度值',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
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
                  name: 'pointerType',
                  title: '指针类型',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '针形', value: 'needle' },
                        { label: '三角形', value: 'triangle' },
                        { label: '矩形', value: 'rect' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'needle',
                  },
                },
                {
                  name: 'pointerColor',
                  title: '指针颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#ffffff',
                  },
                },
                {
                  name: 'glowEffect',
                  title: '发光效果',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
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
