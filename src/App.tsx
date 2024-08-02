import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'

const App: FC = () => {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  )
}

export default App
