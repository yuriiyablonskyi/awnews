import { FC, ReactNode } from 'react'

const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mx-auto max-w-screen-2xl px-3.5">{children}</div>
)

export default Container
