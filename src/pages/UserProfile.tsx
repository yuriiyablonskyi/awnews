import { useAuth0 } from '@auth0/auth0-react'
import { FC } from 'react'
import AccessDenied from '../components/AccessDenied'
import Container from '../components/Container'

const UserProfile: FC = () => {
  const { isAuthenticated, user } = useAuth0()
  const userInfo = [
    { label: 'Full name', value: user?.name ?? '━' },
    { label: 'Is email verified', value: user?.email_verified ? 'Verified' : 'Not Verified' },
    { label: 'Email address', value: user?.email ?? '━' },
    { label: 'Nickname', value: user?.nickname ?? '━' },
  ]

  if (!isAuthenticated) {
    return <AccessDenied />
  }

  return (
    <Container>
      <>
        <div className="mb-4">
          <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">Profile Information</h2>
          <p className="text-base leading-8 font-sans">User details and account status</p>
        </div>
        <div className="mt-6 ">
          <dl className="divide-y divide-gray-300">
            {userInfo.map((item, index) => (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={index}>
                <dt className="text-sm font-medium leading-6 text-gray-900">{item.label}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </>
    </Container>
  )
}

export default UserProfile
