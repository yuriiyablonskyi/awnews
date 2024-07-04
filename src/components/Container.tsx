import { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => (
  <div className="mx-auto max-w-screen-2xl px-3.5">{children}</div>
)

export default Container
