/**
 * Number Flip Configure
 * 数字翻牌组件配置
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
                  title: '数值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'decimals',
                  title: '小数位数',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'separator',
                  title: '千分位分隔',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'prefix',
                  title: '前缀',
                  setter: 'StringSetter',
                },
                {
                  name: 'suffix',
                  title: '后缀',
                  setter: 'StringSetter',
                },
              ],
            },
            {
              type: 'group',
              title: '趋势',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'trendEnable',
                  title: '显示趋势',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'trendValue',
                  title: '趋势值',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'trendType',
                  title: '趋势类型',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '上升', value: 'up' },
                        { label: '下降', value: 'down' },
                        { label: '持平', value: 'flat' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'up',
                  },
                },
                {
                  name: 'trendSuffix',
                  title: '趋势后缀',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '%',
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
                  name: 'fontSize',
                  title: '字体大小',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 48,
                  },
                },
                {
                  name: 'fontFamily',
                  title: '字体类型',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '数码字体', value: 'digital' },
                        { label: '默认字体', value: 'default' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'digital',
                  },
                },
                {
                  name: 'color',
                  title: '颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
                  },
                },
                {
                  name: 'glowIntensity',
                  title: '发光强度',
                  setter: {
                    componentName: 'NumberSetter',
                    props: {
                      min: 0,
                      max: 2,
                      step: 0.1,
                    },
                  },
                  extraProps: {
                    defaultValue: 0.5,
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
                  name: 'animationType',
                  title: '动画类型',
                  setter: {
                    componentName: 'SegmentedSetter',
                    props: {
                      options: [
                        { label: '滚动', value: 'scroll' },
                        { label: '翻转', value: 'flip' },
                        { label: '渐变', value: 'fade' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'scroll',
                  },
                },
                {
                  name: 'animationDuration',
                  title: '动画时长',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0,
                      max: 3000,
                      step: 100,
                      suffix: 'ms',
                    },
                  },
                  extraProps: {
                    defaultValue: 1000,
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
