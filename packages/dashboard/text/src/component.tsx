import type { CSSProperties, Ref } from 'react'

interface TextProps {
  ref?: Ref<HTMLDivElement>
  text?: string
  fontSize?: number | string
  color?: string
  fontWeight?: string | number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: number | string
  className?: string
  style?: CSSProperties
}

const Text = (props: TextProps) => {
  const {
    ref,
    text = 'Text',
    fontSize = 14,
    color = '#ffffff',
    fontWeight = 'normal',
    textAlign = 'left',
    lineHeight = 1.5,
    className = '',
    style: externalStyle,
    ...rest
  } = props

  const internalStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    color,
    fontWeight,
    textAlign,
    lineHeight,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  }

  const mergedStyle = { ...internalStyle, ...externalStyle }

  return (
    <div className={className} ref={ref} style={mergedStyle}>
      {text}
    </div>
  )
}

export default Text
