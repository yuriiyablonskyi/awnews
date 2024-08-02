import { useAuth0 } from '@auth0/auth0-react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { FC, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import useDropDownMenu from '../hooks/useDropDownMenu'
import { clearArticles } from '../store/articles/articlesSlice'
import { useAppDispatch } from '../store/articles/articlesTypes'
import Container from './Container'
import DropdownMenu from './DropdownMenu'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const { userItems } = useDropDownMenu()

  const handleLogin = async () => {
    await loginWithRedirect()
  }

  const handleSignOut: () => Promise<void> = () => logout({ logoutParams: { returnTo: window.location.origin } })

  return (
    <div className="bg-white border-b border-b-stone-300 mb-8">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link to="add-news" className="-m-2 block p-2 font-medium text-gray-900">
                      AddNews
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/search"
                      onClick={() => dispatch(clearArticles())}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Search
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {isAuthenticated ? (
                    <div className="flow-root">
                      <button onClick={handleSignOut} className="-m-2 block p-2 font-medium text-gray-900">
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <button onClick={handleLogin} className="-m-2 block p-2 font-medium text-gray-900">
                        Sign In / Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <Container>
          <nav aria-label="Top" className="flex h-16 items-center">
            <button
              type="button"
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="absolute -inset-0.5" />
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-4 flex lg:ml-0">
              <Link to="/?country=us" className="hover:opacity-70 transition-opacity duration-100 ease-linear">
                <img className="max-w-24 h-7" src={Logo} alt="logo" />
              </Link>
            </div>

            {isAuthenticated && (
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <Link
                  to="add-news"
                  className="flex h-full space-x-8 items-center text-lg font-medium text-gray-900 hover:opacity-70
                 transition-opacity duration-100 ease-linear"
                >
                  AddNews
                </Link>
              </Popover.Group>
            )}

            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <Link
                to="/search"
                onClick={() => dispatch(clearArticles())}
                className="flex h-full space-x-8 items-center text-lg font-medium text-gray-900 hover:opacity-70
                 transition-opacity duration-100 ease-linear"
              >
                Search
              </Link>
            </Popover.Group>
            <div className="ml-auto flex items-center">
              {!isAuthenticated ? (
                <button
                  className="hidden lg:inline-block text-lg font-medium text-gray-900 hover:text-gray-500"
                  onClick={handleLogin}
                >
                  Sign In / Sign Up
                </button>
              ) : (
                <DropdownMenu dropdownData={userItems} />
              )}
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
