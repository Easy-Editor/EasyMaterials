import type { DesignMode } from '@easy-editor/core'

export type EmptyBehavior = 'blank' | 'message' | 'hide'

export const DEFAULT_EMPTY_BEHAVIOR: EmptyBehavior = 'message'
export const DEFAULT_EMPTY_TEXT = '暂无数据'

export const normalizeEmptyBehavior = (value: unknown): EmptyBehavior => {
  if (value === 'blank' || value === 'hide' || value === 'message') {
    return value
  }
  return DEFAULT_EMPTY_BEHAVIOR
}

export const shouldHideEmptyMaterial = (
  isEmpty: boolean,
  behavior: EmptyBehavior | undefined,
  designMode: DesignMode | undefined,
): boolean => isEmpty && normalizeEmptyBehavior(behavior) === 'hide' && designMode !== 'design'
