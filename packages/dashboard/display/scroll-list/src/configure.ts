/**
 * Scroll List Configure
 * 滚动列表组件配置
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
                  title: '列表数据',
                  setter: 'JsonSetter',
                },
                {
                  name: 'maxItems',
                  title: '最大显示数',
                  setter: {
                    componentName: 'NumberSetter',
                    props: {
                      min: 1,
                      max: 20,
                    },
                  },
                  extraProps: {
                    defaultValue: 5,
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
                  name: 'showRank',
                  title: '显示排名',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'showMedal',
                  title: '显示奖牌',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'progressBarEnable',
                  title: '显示进度条',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'progressBarGradient',
                  title: '渐变效果',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
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
              title: '数值格式',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'valueFormat',
                  title: '格式类型',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '数字', value: 'number' },
                        { label: '货币', value: 'currency' },
                        { label: '百分比', value: 'percent' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'number',
                  },
                },
                {
                  name: 'valuePrefix',
                  title: '数值前缀',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '',
                  },
                },
                {
                  name: 'valueSuffix',
                  title: '数值后缀',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '颜色',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'progressBarColors',
                  title: '进度条颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: ['#00d4ff', '#9b59b6'],
                  },
                },
                {
                  name: 'nameColor',
                  title: '名称颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#e6e6e6',
                  },
                },
                {
                  name: 'valueColor',
                  title: '数值颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
                  },
                },
                {
                  name: 'backgroundColor',
                  title: '背景颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(10, 10, 26, 0.95)',
                  },
                },
                {
                  name: 'borderColor',
                  title: '边框颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(26, 26, 62, 0.8)',
                  },
                },
                {
                  name: 'itemBackgroundColor',
                  title: '行背景颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(15, 15, 42, 0.9)',
                  },
                },
                {
                  name: 'itemBorderColor',
                  title: '行边框颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(26, 26, 62, 0.6)',
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
            {
              type: 'group',
              title: '滚动配置',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'scrollEnable',
                  title: '启用滚动',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'scrollDirection',
                  title: '滚动方向',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '向上', value: 'up' },
                        { label: '向下', value: 'down' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'up',
                  },
                },
                {
                  name: 'scrollSpeed',
                  title: '滚动速度',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 1,
                      max: 10,
                      step: 1,
                      suffix: 'x',
                    },
                  },
                  extraProps: {
                    defaultValue: 3,
                  },
                },
                {
                  name: 'hoverPause',
                  title: '悬停暂停',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'scrollInterval',
                  title: '滚动间隔',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 1000,
                      max: 10_000,
                      step: 500,
                      suffix: 'ms',
                    },
                  },
                  extraProps: {
                    defaultValue: 3000,
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '动画',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'animationEnable',
                  title: '启用动画',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'animationDuration',
                  title: '动画时长',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0,
                      max: 2000,
                      step: 100,
                      suffix: 'ms',
                    },
                  },
                  extraProps: {
                    defaultValue: 500,
                  },
                },
                {
                  name: 'animationEasing',
                  title: '缓动函数',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '线性', value: 'linear' },
                        { label: '缓入', value: 'ease-in' },
                        { label: '缓出', value: 'ease-out' },
                        { label: '缓入缓出', value: 'ease-in-out' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'ease-out',
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
  advanced: {},
}

export default configure
