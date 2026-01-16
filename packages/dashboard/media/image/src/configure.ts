/**
 * Image Configure
 * 图片组件配置
 */

import type { Configure } from '@easy-editor/core'
import type { UploadValue } from '@easy-editor/materials-shared'

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
              title: '内容',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: '__upload',
                  title: '上传',
                  setter: {
                    componentName: 'UploadSetter',
                    props: {
                      accept: '.jpg,.jpeg,.png,.gif,.svg',
                    },
                  },
                  extraProps: {
                    setValue(target, value: UploadValue) {
                      if (value) {
                        const { base64, raw } = value
                        if (base64) {
                          target.parent.setPropValue('src', base64)
                        }
                        if (raw?.width) {
                          target.parent.setExtraPropValue('$dashboard.rect.width', raw.width)
                        }
                        if (raw?.height) {
                          target.parent.setExtraPropValue('$dashboard.rect.height', raw.height)
                        }
                      } else {
                        target.parent.clearPropValue('src')
                      }
                    },
                  },
                },
                {
                  name: 'src',
                  title: '图片地址',
                  setter: 'StringSetter',
                },
                {
                  name: 'alt',
                  title: '替代文本',
                  setter: 'StringSetter',
                },
              ],
            },
            {
              type: 'group',
              title: '加载',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'lazyLoad',
                  title: '懒加载',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'lazyLoadThreshold',
                  title: '懒加载阈值',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0,
                      max: 500,
                      step: 50,
                      suffix: 'px',
                    },
                  },
                  extraProps: {
                    defaultValue: 100,
                  },
                },
                {
                  name: 'placeholder',
                  title: '占位图',
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
                  name: 'objectFit',
                  title: '填充方式',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '覆盖', value: 'cover' },
                        { label: '包含', value: 'contain' },
                        { label: '填充', value: 'fill' },
                        { label: '无', value: 'none' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'cover',
                  },
                },
                {
                  name: 'borderRadius',
                  title: '圆角',
                  setter: 'NumberSetter',
                  extraProps: {
                    defaultValue: 0,
                  },
                },
                {
                  name: 'borderStyle',
                  title: '边框样式',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '无', value: 'none' },
                        { label: '霓虹', value: 'neon' },
                        { label: '渐变', value: 'gradient' },
                        { label: '科技感', value: 'tech' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'none',
                  },
                },
                {
                  name: 'borderColor',
                  title: '边框颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: '#00d4ff',
                  },
                },
                {
                  name: 'shadow',
                  title: '启用阴影',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'shadowColor',
                  title: '阴影颜色',
                  setter: 'ColorSetter',
                  extraProps: {
                    defaultValue: 'rgba(0, 212, 255, 0.3)',
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
