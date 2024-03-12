import { createBrowserRouter } from 'react-router-dom'
import { RouteType } from '../types.ts'
import Home from '../pages/Home.tsx'
import Search from '../pages/Search.tsx'
import App from '../App.tsx'

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
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
