/**
 * Audio Configure
 * 音频组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import type { UploadValue } from '@easy-editor/materials-shared'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 音频独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 内容 Tab
        {
          type: 'group',
          key: 'content',
          title: '内容',
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
        // 播放 Tab
        {
          type: 'group',
          key: 'playback',
          title: '播放',
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
        // 样式 Tab
        {
          type: 'group',
          key: 'style',
          title: '样式',
          items: [
            {
              name: 'audioStyle',
              title: '样式类型',
              setter: {
                componentName: 'SegmentedSetter',
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
          ],
        },
      ],
    },
  ],
  {
    padding: '6px 16px 12px',
  },
)

/** 数据配置 */
const dataConfigGroup: FieldConfig = createDataConfigGroup([
  { name: 'src', label: 'src', type: 'string', required: true, description: '音频地址' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
