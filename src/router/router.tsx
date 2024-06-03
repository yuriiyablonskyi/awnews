import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import AddNews from '../pages/AddNews.tsx'
import Home from '../pages/Home.tsx'
import Search from '../pages/Search.tsx'

interface RouteType {
  path: string
  element: JSX.Element
  children?: RouteType[]
}

const routes: RouteType[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'add-news',
        element: <AddNews />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
