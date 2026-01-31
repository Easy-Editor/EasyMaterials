/**
 * 配置项工厂函数
 * 提供通用的配置组和工厂函数，简化物料配置编写
 */

import type { Configure, FieldConfig } from '@easy-editor/core'

/** 期望字段配置 */
export interface ExpectedField {
  /** 字段名 */
  name: string
  /** 显示标签 */
  label: string
  /** 字段类型 */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  /** 是否必填 */
  required?: boolean
  /** 字段描述 */
  description?: string
}

/** 事件配置项 */
export interface EventItem {
  /** 事件显示名称 */
  label: string
  /** 事件值（如 onClick） */
  value: string
  /** 事件描述 */
  description: string
}

/** 事件分组 */
export interface EventGroup {
  /** 分组标题 */
  title: string
  /** 分组下的事件列表 */
  children: EventItem[]
}

/**
 * 创建折叠组配置
 * @param title 折叠组标题
 * @param items 折叠组内的配置项
 * @param props 额外的 CollapseSetter props
 */
export const createCollapseGroup = (
  title: string,
  items: FieldConfig[],
  props?: Record<string, unknown>,
): FieldConfig => ({
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

/** 节点信息配置（所有组件通用） */
export const globalConfigGroup: FieldConfig = {
  name: 'nodeInfo',
  title: '节点信息',
  setter: 'NodeInfoSetter',
  extraProps: {
    // @ts-expect-error label is not a valid extra prop
    label: false,
  },
}

/** 基础配置组（所有组件通用） */
export const basicConfigGroup: FieldConfig = createCollapseGroup('基础配置', [
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

/** 默认事件配置 */
export const defaultEvents: EventGroup[] = [
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
]

/**
 * 创建事件绑定配置组
 * @param events 事件配置，默认使用 defaultEvents
 */
export const createEventConfigGroup = (events: EventGroup[] = defaultEvents): FieldConfig =>
  createCollapseGroup('事件绑定', [
    {
      name: 'events',
      title: '事件',
      setter: {
        componentName: 'EventSetter',
        props: {
          events,
        },
      },
      extraProps: {
        // @ts-expect-error label is not a valid extra prop
        label: false,
      },
    },
  ])

/** 事件绑定配置组（使用默认事件） */
export const eventConfigGroup: FieldConfig = createEventConfigGroup()

/** 高级配置组（条件渲染等） */
export const advancedConfigGroup: FieldConfig = createCollapseGroup('高级配置', [
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
])

/**
 * 创建数据配置组
 * @param expectedFields 期望的字段配置
 * @param options 额外选项
 */
export const createDataConfigGroup = (
  expectedFields: ExpectedField[],
  options?: {
    showPreview?: boolean
    previewLimit?: number
  },
): FieldConfig => ({
  name: '$data',
  title: '数据配置',
  setter: {
    componentName: 'DataSetter',
    props: {
      expectedFields,
      showPreview: options?.showPreview ?? true,
      previewLimit: options?.previewLimit ?? 10,
    },
  },
  extraProps: {
    // @ts-expect-error label is not a valid extra prop
    label: false,
  },
})

/**
 * 创建标准三 Tab 配置结构
 * @param componentConfigGroup 组件特有的配置组
 * @param dataConfigGroup 数据配置组
 * @param options 额外选项
 */
export const createStandardConfigure = (
  componentConfigGroup: FieldConfig,
  dataConfigGroup: FieldConfig,
  options?: {
    eventConfigGroup?: FieldConfig
    advancedConfigGroup?: FieldConfig
  },
): Configure => {
  const eventGroup = options?.eventConfigGroup ?? eventConfigGroup
  const advancedGroup = options?.advancedConfigGroup ?? advancedConfigGroup

  return {
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
            items: [globalConfigGroup, eventGroup, advancedGroup],
          },
        ],
      },
    ],
    component: {},
    supports: {},
    advanced: {},
  }
}

/**
 * 创建无数据源的两 Tab 配置结构（适用于 filter、image 等不需要数据源的组件）
 * @param componentConfigGroup 组件特有的配置组
 * @param options 额外选项
 */
export const createSimpleConfigure = (
  componentConfigGroup: FieldConfig,
  options?: {
    eventConfigGroup?: FieldConfig
    advancedConfigGroup?: FieldConfig
  },
): Configure => {
  const eventGroup = options?.eventConfigGroup ?? eventConfigGroup
  const advancedGroup = options?.advancedConfigGroup ?? advancedConfigGroup

  return {
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
          // 高级 Tab
          {
            type: 'group',
            key: 'advanced',
            title: '高级',
            items: [globalConfigGroup, eventGroup, advancedGroup],
          },
        ],
      },
    ],
    component: {},
    supports: {},
    advanced: {},
  }
}
