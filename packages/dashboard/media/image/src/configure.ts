/**
 * Image Configure
 * 图片组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import type { UploadValue } from '@easy-editor/materials-shared'
import {
  createCollapseGroup,
  createSimpleConfigure,
  MATERIAL_THEME,
  withAgentCapability,
} from '@easy-editor/materials-shared'

/** 组件配置 - 图片独有 */
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
                  accept: '.jpg,.jpeg,.png,.gif,.svg',
                  mediaKind: 'image',
                },
              },
              extraProps: withAgentCapability(
                {
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
                { expose: false },
              ),
            },
            {
              name: 'src',
              title: '图片地址',
              setter: 'StringSetter',
              extraProps: withAgentCapability(
                {},
                {
                  fieldId: 'image.source',
                  access: 'read-write',
                  readPath: ['props', 'src'],
                  writeTargets: [{ path: ['props', 'src'] }],
                  unsetTargets: [{ path: ['props', 'src'] }],
                  valueSchema: { type: 'string', minLength: 1 },
                  verifyPaths: [['props', 'src']],
                },
              ),
            },
            {
              name: 'alt',
              title: '替代文本',
              setter: 'StringSetter',
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
                    { label: '实线', value: 'solid' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'solid',
              },
            },
            {
              name: 'borderColor',
              title: '边框颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: MATERIAL_THEME.border,
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
                defaultValue: 'rgba(15, 23, 42, 0.18)',
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

export const configure = createSimpleConfigure(componentConfigGroup, { showEmptyState: true })
