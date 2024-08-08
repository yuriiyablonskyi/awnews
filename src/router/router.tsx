import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import ProtectedRoute from '../components/ProtectedRoute.tsx'
import AddNews from '../pages/AddNews.tsx'
import Home from '../pages/Home.tsx'
import Search from '../pages/Search.tsx'
import UserProfile from '../pages/UserProfile.tsx'
import { RouteType } from '../store/articles/articlesTypes.ts'

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
        element: (
          <ProtectedRoute>
            <AddNews />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
