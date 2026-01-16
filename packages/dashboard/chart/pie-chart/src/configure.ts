/**
 * Pie Chart Configure
 * 饼图组件配置
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
              title: '数据',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'data',
                  title: '数据',
                  setter: 'JsonSetter',
                },
                {
                  name: 'dimensionField',
                  title: '维度字段',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: 'name',
                  },
                },
                {
                  name: 'metricField',
                  title: '指标字段',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: 'value',
                  },
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
              title: '样式',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'innerRadius',
                  title: '内半径',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0,
                      max: 100,
                      step: 5,
                      suffix: '%',
                    },
                  },
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'outerRadius',
                  title: '外半径',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 50,
                      max: 100,
                      step: 5,
                      suffix: '%',
                    },
                  },
                  extraProps: {
                    defaultValue: 100,
                  },
                },
                {
                  name: 'colors',
                  title: '颜色',
                  setter: {
                    componentName: 'ArraySetter',
                    props: {
                      itemSetter: 'ColorSetter',
                    },
                  },
                },
                {
                  name: 'showLabel',
                  title: '显示标签',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'labelType',
                  title: '标签类型',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '百分比', value: 'percent' },
                        { label: '数值', value: 'value' },
                        { label: '名称', value: 'name' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'percent',
                  },
                },
                {
                  name: 'showLegend',
                  title: '显示图例',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'legendPosition',
                  title: '图例位置',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '顶部', value: 'top' },
                        { label: '底部', value: 'bottom' },
                        { label: '左侧', value: 'left' },
                        { label: '右侧', value: 'right' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'bottom',
                  },
                },
                {
                  name: 'glowEffect',
                  title: '发光效果',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
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
