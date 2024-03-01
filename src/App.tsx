import { FC } from 'react'
import Header from './components/Header'
import MainPage from './components/MainPage'
import Search from './components/Search'

const App: FC = () => {
  return (
    <div >
      <Header />
      <MainPage />
      {/* <Search /> */}
    </div>
  )
}

export default App
