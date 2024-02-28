import { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  styles?: string
}

const Container: FC<ContainerProps> = ({ children, styles }) => (
  <div className={`mx-auto max-w-screen-2xl px-3.5 ${styles}`}>
    {children}
  </div>
)

export default Container
