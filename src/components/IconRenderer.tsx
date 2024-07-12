import { ElementType, FC } from 'react'

interface IconRendererProps {
  IconComponent: ElementType
  className: string
}

const IconRenderer: FC<IconRendererProps> = ({ IconComponent, className }) => {
  if (!IconComponent) {
    return null
  }
  return <IconComponent className={className} />
}

export default IconRenderer
