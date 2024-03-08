import { FC } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div >
      <Header />
      <Outlet />
    </div>
  )
}

export default App
