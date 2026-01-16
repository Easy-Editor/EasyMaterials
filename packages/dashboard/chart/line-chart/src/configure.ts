/**
 * Line Chart Configure
 * 折线图组件配置
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
                  name: 'xField',
                  title: 'X轴字段',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: 'name',
                  },
                },
                {
                  name: 'yFields',
                  title: 'Y轴字段',
                  setter: {
                    componentName: 'ArraySetter',
                    props: {
                      itemSetter: 'StringSetter',
                    },
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '坐标轴',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'xAxisLabel',
                  title: 'X轴标签',
                  setter: 'StringSetter',
                },
                {
                  name: 'yAxisLabel',
                  title: 'Y轴标签',
                  setter: 'StringSetter',
                },
                {
                  name: 'xAxisVisible',
                  title: '显示X轴',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'yAxisVisible',
                  title: '显示Y轴',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'axisLabelRotate',
                  title: '标签旋转',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: -90,
                      max: 90,
                      step: 15,
                      suffix: '°',
                    },
                  },
                  extraProps: {
                    defaultValue: 0,
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
                  name: 'strokeWidth',
                  title: '线条宽度',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 1,
                      max: 10,
                      step: 1,
                      suffix: 'px',
                    },
                  },
                  extraProps: {
                    defaultValue: 2,
                  },
                },
                {
                  name: 'smooth',
                  title: '平滑曲线',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'areaFill',
                  title: '区域填充',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'showGrid',
                  title: '显示网格',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
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
                  name: 'showTooltip',
                  title: '显示提示',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
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
