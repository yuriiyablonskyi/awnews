import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

const AccessDenied: FC = () => {
  return (
    <Container>
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">Access Denied</h2>
        <p className="text-base leading-8 font-sans">
          You must be logged in to access this page. Please log in to continue.
        </p>
      </div>
      <Link to="/" className="-m-2 block p-2 font-medium text-gray-900 underline">
        Go to Home Page
      </Link>
    </Container>
  )
}

export default AccessDenied
