import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import AddNews from '../pages/AddNews.tsx'
import Home from '../pages/Home.tsx'
import Search from '../pages/Search.tsx'
import { RouteType } from '../store/articles/articlesTypes.ts'
import UserProfile from '../pages/UserProfile.tsx'

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
      {
        path: 'profile',
        element: <UserProfile />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
