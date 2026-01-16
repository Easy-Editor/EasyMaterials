/**
 * Fly Line Configure
 * 飞线组件配置
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
                  name: 'mapType',
                  title: '地图类型',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '中国', value: 'china' },
                        { label: '世界', value: 'world' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'china',
                  },
                },
                {
                  name: 'mapJson',
                  title: '地图数据',
                  setter: 'JsonSetter',
                },
                {
                  name: 'flyLines',
                  title: '飞线数据',
                  setter: 'JsonSetter',
                },
                {
                  name: 'scatterPoints',
                  title: '散点数据',
                  setter: 'JsonSetter',
                },
              ],
            },
            {
              type: 'group',
              title: '视图',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'center',
                  title: '中心点',
                  setter: {
                    componentName: 'ArraySetter',
                    props: {
                      itemSetter: 'NumberSetter',
                      maxItems: 2,
                    },
                  },
                  extraProps: {
                    defaultValue: [104.114_129, 37.550_339],
                  },
                },
                {
                  name: 'zoom',
                  title: '缩放级别',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0.5,
                      max: 10,
                      step: 0.1,
                    },
                  },
                  extraProps: {
                    defaultValue: 1,
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
                  name: 'lineColor',
                  title: '飞线颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
                  },
                },
                {
                  name: 'lineGlowColor',
                  title: '飞线发光颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
                  },
                },
                {
                  name: 'scatterColor',
                  title: '散点颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#ffd700',
                  },
                },
                {
                  name: 'showScatter',
                  title: '显示散点',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'showTooltip',
                  title: '显示提示框',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'roam',
                  title: '允许缩放拖拽',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
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
                  name: 'showAnimation',
                  title: '显示飞线动画',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: true,
                  },
                },
                {
                  name: 'animationSpeed',
                  title: '动画速度',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 2,
                  },
                },
                {
                  name: 'curveness',
                  title: '飞线曲率',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0.3,
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
