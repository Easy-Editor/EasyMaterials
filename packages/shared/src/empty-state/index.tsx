import type { CSSProperties } from 'react'
import type { DesignMode } from '@easy-editor/core'
import { DEFAULT_EMPTY_TEXT, normalizeEmptyBehavior, type EmptyBehavior } from './model'

export * from './model'

export interface MaterialEmptyStateProps {
  behavior?: EmptyBehavior
  designMode?: DesignMode
  text?: string
}

const emptyStateStyle: CSSProperties = {
  alignItems: 'center',
  color: 'var(--ee-material-muted-foreground, #64748b)',
  display: 'flex',
  fontSize: 12,
  height: '100%',
  justifyContent: 'center',
  lineHeight: 1.5,
  minHeight: 48,
  padding: 12,
  textAlign: 'center',
  width: '100%',
}

export const MaterialEmptyState = ({ behavior, designMode, text = DEFAULT_EMPTY_TEXT }: MaterialEmptyStateProps) => {
  const resolvedBehavior = normalizeEmptyBehavior(behavior)
  if (resolvedBehavior === 'blank' || (resolvedBehavior === 'hide' && designMode !== 'design')) {
    return null
  }

  const message = resolvedBehavior === 'hide' ? `${text}（运行时隐藏）` : text
  return (
    <output aria-live='polite' style={emptyStateStyle}>
      {message}
    </output>
  )
}
