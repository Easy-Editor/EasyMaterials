/**
 * Text Configure
 * 文本组件配置 - 使用新的三 Tab 结构
 */

import type { Configure, FieldConfig } from '@easy-editor/core'

/** 创建折叠组配置 */
const createCollapseGroup = (title: string, items: FieldConfig[], props?: Record<string, unknown>): FieldConfig => ({
  type: 'group',
  title,
  setter: {
    componentName: 'CollapseSetter',
    props: {
      icon: false,
      ...props,
    },
  },
  items,
})

const globalConfigGroup: FieldConfig = {
  name: 'nodeInfo',
  title: '节点信息',
  setter: 'NodeInfoSetter',
  extraProps: {
    // @ts-expect-error label is not a valid extra prop
    label: false,
  },
}

/** 基础配置 - 所有组件通用 */
const basicConfigGroup: FieldConfig = createCollapseGroup('基础配置', [
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
  {
    name: 'rotation',
    title: '旋转角度',
    setter: {
      componentName: 'SliderSetter',
      props: {
        min: 0,
        max: 360,
        suffix: '°',
      },
    },
    extraProps: {
      defaultValue: 0,
    },
  },
  {
    name: 'opacity',
    title: '不透明度',
    setter: {
      componentName: 'SliderSetter',
      props: {
        min: 0,
        max: 100,
        suffix: '%',
      },
    },
    extraProps: {
      defaultValue: 100,
    },
  },
  {
    name: 'background',
    title: '背景颜色',
    setter: 'ColorSetter',
    extraProps: {
      defaultValue: 'transparent',
    },
  },
])

/** 组件配置 - 文本组件独有 */
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
              name: 'isLink',
              title: '作为链接',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'href',
              title: '链接地址',
              setter: 'StringSetter',
            },
            {
              name: 'target',
              title: '打开方式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '新窗口', value: '_blank' },
                    { label: '当前窗口', value: '_self' },
                  ],
                },
              },
              extraProps: {
                defaultValue: '_blank',
              },
            },
          ],
        },
        // 字体 Tab
        {
          type: 'group',
          key: 'font',
          title: '字体',
          items: [
            {
              name: 'fontSize',
              title: '字体大小',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 16,
              },
            },
            {
              name: 'fontWeight',
              title: '字体粗细',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '正常', value: 'normal' },
                    { label: '粗体', value: 'bold' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'normal',
              },
            },
            {
              name: 'color',
              title: '颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#ffffff',
              },
            },
            {
              name: 'lineHeight',
              title: '行高',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 1.5,
              },
            },
          ],
        },
        // 对齐 Tab
        {
          type: 'group',
          key: 'align',
          title: '对齐',
          items: [
            {
              name: 'textAlign',
              title: '水平对齐',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '左', value: 'left' },
                    { label: '中', value: 'center' },
                    { label: '右', value: 'right' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'left',
              },
            },
            {
              name: 'verticalAlign',
              title: '垂直对齐',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '上', value: 'top' },
                    { label: '中', value: 'middle' },
                    { label: '下', value: 'bottom' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'middle',
              },
            },
          ],
        },
        // 效果 Tab
        {
          type: 'group',
          key: 'effect',
          title: '效果',
          items: [
            {
              name: 'underline',
              title: '下划线',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
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
            {
              name: 'glowColor',
              title: '发光颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
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
const dataConfigGroup: FieldConfig = {
  name: '$data',
  title: '数据配置',
  setter: {
    componentName: 'DataSetter',
    props: {
      expectedFields: [
        { name: 'text', label: 'text', type: 'string', required: true, description: '文本内容' },
      ],
      showPreview: true,
      previewLimit: 10,
    },
  },
  extraProps: {
    // @ts-ignore
    label: false,
  },
}

/** 事件绑定配置 */
const eventConfigGroup: FieldConfig = createCollapseGroup('事件绑定', [
  {
    name: 'events',
    title: '事件',
    setter: {
      componentName: 'EventSetter',
      props: {
        events: [
          {
            title: '点击事件',
            children: [
              { label: '点击', value: 'onClick', description: '鼠标点击时触发' },
              { label: '双击', value: 'onDoubleClick', description: '鼠标双击时触发' },
            ],
          },
          {
            title: '鼠标事件',
            children: [
              { label: '鼠标进入', value: 'onMouseEnter', description: '鼠标进入时触发' },
              { label: '鼠标离开', value: 'onMouseLeave', description: '鼠标离开时触发' },
            ],
          },
        ],
      },
    },
    extraProps: {
      // @ts-ignore
      label: false,
    },
  },
])

/** 高级配置 */
const advancedConfigGroup: FieldConfig = createCollapseGroup('高级配置', [
  {
    title: '条件渲染',
    setter: 'SwitchSetter',
    extraProps: {
      supportVariable: true,
      getValue(target) {
        return target.getNode().getExtraPropValue('condition')
      },
      setValue(target, value: boolean) {
        target.getNode().setExtraProp('condition', value)
      },
    },
  },
  // {
  //   name: 'loop',
  //   title: '循环渲染',
  //   setter: 'SwitchSetter',
  //   extraProps: {
  //     defaultValue: false,
  //   },
  // },
])

export const configure: Configure = {
  props: [
    {
      type: 'group',
      title: '属性',
      setter: 'TabSetter',
      items: [
        // 配置 Tab
        {
          type: 'group',
          key: 'config',
          title: '配置',
          items: [globalConfigGroup, basicConfigGroup, componentConfigGroup],
        },
        // 数据 Tab
        {
          type: 'group',
          key: 'data',
          title: '数据',
          items: [globalConfigGroup, dataConfigGroup],
        },
        // 高级 Tab
        {
          type: 'group',
          key: 'advanced',
          title: '高级',
          items: [globalConfigGroup, eventConfigGroup, advancedConfigGroup],
        },
      ],
    },
  ],
  component: {},
  supports: {},
  advanced: {},
}
