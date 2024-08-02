import { useAuth0 } from '@auth0/auth0-react'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
