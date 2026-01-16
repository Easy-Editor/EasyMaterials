/**
 * Audio Configure
 * 音频组件配置
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
                      accept: '.mp3,.wav,.ogg',
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
                  title: '音频地址',
                  setter: 'StringSetter',
                },
                {
                  name: 'title',
                  title: '标题',
                  setter: 'StringSetter',
                  extraProps: {
                    defaultValue: '音频文件',
                  },
                },
              ],
            },
            {
              type: 'group',
              title: '播放',
              setter: {
                componentName: 'CollapseSetter',
                props: {
                  icon: false,
                },
              },
              items: [
                {
                  name: 'autoPlay',
                  title: '自动播放',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'loop',
                  title: '循环播放',
                  setter: 'SwitchSetter',
                  extraProps: {
                    defaultValue: false,
                  },
                },
                {
                  name: 'audioStyle',
                  title: '样式类型',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '自定义', value: 'custom' },
                        { label: '原生', value: 'native' },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 'custom',
                  },
                },
                {
                  name: 'playbackRate',
                  title: '播放速度',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: [
                        { label: '0.5x', value: 0.5 },
                        { label: '0.75x', value: 0.75 },
                        { label: '1x (正常)', value: 1 },
                        { label: '1.25x', value: 1.25 },
                        { label: '1.5x', value: 1.5 },
                        { label: '2x', value: 2 },
                      ],
                    },
                  },
                  extraProps: {
                    defaultValue: 1,
                  },
                },
                {
                  name: 'volume',
                  title: '音量',
                  setter: {
                    componentName: 'SliderSetter',
                    props: {
                      min: 0,
                      max: 100,
                      step: 1,
                      suffix: '%',
                    },
                  },
                  extraProps: {
                    defaultValue: 100,
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
