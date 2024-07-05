import { FC } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const UserMenu: FC = () => {
  const { logout, user } = useAuth0()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex items-center gap-2 rounded-md py-1 px-0.5 text-sm/6 font-semibold text-white 
      focus:outline-none data-[hover]:-graybg-700 data-[open]:bg-gray-700 data-[focus]:outline-1 
      data-[focus]:outline-white"
      >
        <img alt="" src={user.picture} className="h-10 w-10 rounded-full" />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            <Link to="/profile" className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100">
              <UserIcon className="size-4  fill-gray-600" />
              Your Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100">
              <Cog6ToothIcon className="size-4 fill-gray-600" />
              Settings
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => {
                console.log('Sign out')
                logout({ logoutParams: { returnTo: window.location.origin } })
              }}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100"
            >
              <ArrowLeftStartOnRectangleIcon className="size-4  fill-gray-600" />
              Sign out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserMenu

// qd@d.wr
// 1qA@d28fj1jd
