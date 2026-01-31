/**
 * 数据源处理工具
 * 提供数据源解析、字段映射等通用功能
 */

import { useMemo } from 'react'

/** 字段映射配置 */
export interface FieldMapping {
  /** 组件字段名 */
  componentField: string
  /** 数据源字段名（支持点号路径，如 'user.name'） */
  sourceField: string
}

/** 数据配置类型（来自 DataSetter） */
export interface DataConfig {
  /** 数据源类型：静态数据 | 组件数据源 | 全局数据源 */
  sourceType: 'static' | 'datasource' | 'global'
  /** 静态数据（sourceType === 'static'） */
  staticData?: unknown[]
  /** 数据源 ID（sourceType === 'datasource' | 'global'） */
  datasourceId?: string
  /** 字段映射配置 */
  fieldMappings?: FieldMapping[]
}

/** 数据源上下文（由渲染器 HOC 传递） */
export interface DataSourceContext {
  /** 组件级数据源 */
  component: Record<string, unknown>
  /** 页面级数据源（全局） */
  page: Record<string, unknown>
}

/**
 * 根据路径从对象中获取值
 * @param obj 源对象
 * @param path 路径字符串，支持点号分隔（如 'user.profile.name'）
 * @returns 路径对应的值，不存在则返回 undefined
 *
 * @example
 * getValueByPath({ user: { name: '张三' } }, 'user.name') // '张三'
 * getValueByPath({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 */
export const getValueByPath = (obj: unknown, path: string): unknown => {
  if (!path) {
    return obj
  }
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) {
      return
    }
    if (typeof current !== 'object') {
      return
    }
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

/**
 * 从数据源数据中提取数组
 * @param dsData 数据源原始数据
 * @returns 数组形式的数据
 *
 * @example
 * extractDataFromSource([1, 2, 3]) // [1, 2, 3]
 * extractDataFromSource({ name: '张三' }) // [{ name: '张三' }]
 * extractDataFromSource(undefined) // []
 */
export const extractDataFromSource = (dsData: unknown): unknown[] => {
  if (dsData === undefined) {
    return []
  }

  if (Array.isArray(dsData)) {
    return dsData
  }

  if (dsData && typeof dsData === 'object') {
    return [dsData]
  }

  return []
}

/**
 * 应用字段映射，将原始数据转换为组件所需格式
 * @param rawData 原始数据数组
 * @param mappings 字段映射配置
 * @returns 映射后的数据数组
 *
 * @example
 * const data = [{ user: { name: '张三' } }]
 * const mappings = [{ componentField: 'text', sourceField: 'user.name' }]
 * applyFieldMappings(data, mappings) // [{ text: '张三' }]
 */
export const applyFieldMappings = (rawData: unknown[], mappings?: FieldMapping[]): Record<string, unknown>[] => {
  if (!mappings || mappings.length === 0) {
    return rawData as Record<string, unknown>[]
  }

  return rawData.map(item => {
    const result: Record<string, unknown> = {}
    for (const { componentField, sourceField } of mappings) {
      if (componentField && sourceField) {
        result[componentField] = getValueByPath(item, sourceField)
      }
    }
    return result
  })
}

/**
 * 解析数据配置，获取原始数据数组
 * @param $data 数据配置
 * @param __dataSource 数据源上下文
 * @returns 原始数据数组
 */
export const resolveRawData = (
  $data: DataConfig | undefined,
  __dataSource: DataSourceContext | undefined,
): unknown[] => {
  if (!$data) {
    return []
  }

  if ($data.sourceType === 'static') {
    return Array.isArray($data.staticData) ? $data.staticData : []
  }

  if ($data.sourceType === 'global' && $data.datasourceId) {
    const dsData = __dataSource?.page?.[$data.datasourceId]
    return extractDataFromSource(dsData)
  }

  if ($data.sourceType === 'datasource' && $data.datasourceId) {
    const dsData = __dataSource?.component?.[$data.datasourceId]
    return extractDataFromSource(dsData)
  }

  return []
}

/**
 * 解析数据配置，获取映射后的数据数组
 * @param $data 数据配置
 * @param __dataSource 数据源上下文
 * @returns 映射后的数据数组
 */
export const resolveMappedData = (
  $data: DataConfig | undefined,
  __dataSource: DataSourceContext | undefined,
): Record<string, unknown>[] => {
  const rawData = resolveRawData($data, __dataSource)
  return applyFieldMappings(rawData, $data?.fieldMappings)
}

/**
 * React Hook: 解析数据源，返回映射后的数据数组
 *
 * @example
 * // 单值组件（如 Text、Button）
 * const data = useDataSource($data, __dataSource)[0]
 * const text = data?.text as string
 *
 * // 列表组件（如图表、轮播图）
 * const chartData = useDataSource($data, __dataSource)
 */
export function useDataSource(
  $data: DataConfig | undefined,
  dataSource: DataSourceContext | undefined,
): Record<string, unknown>[] {
  return useMemo(() => resolveMappedData($data, dataSource), [$data, dataSource])
}

/**
 * 生成静态数据源配置（用于 snippets）
 * @param data 静态数据，可以是单个对象或数组
 * @param fieldMappings 字段映射配置，默认自动生成同名映射
 * @returns DataConfig 配置对象
 *
 * @example
 * // 单值数据
 * generateStaticDataSource({ text: '你好' })
 * // => { sourceType: 'static', staticData: [{ text: '你好' }], fieldMappings: [{ componentField: 'text', sourceField: 'text' }] }
 *
 * // 数组数据
 * generateStaticDataSource([{ name: 'A', value: 100 }, { name: 'B', value: 200 }])
 */
export const generateStaticDataSource = <T extends Record<string, unknown>>(
  data: T | T[],
  fieldMappings?: FieldMapping[],
): DataConfig => {
  const dataArray = Array.isArray(data) ? data : [data]
  const firstItem = dataArray[0] || {}

  return {
    sourceType: 'static',
    staticData: dataArray,
    fieldMappings:
      fieldMappings ??
      Object.keys(firstItem).map(key => ({
        componentField: key,
        sourceField: key,
      })),
  }
}
