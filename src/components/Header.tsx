import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { clearArticles } from '../store/articles/articlesSlice'
import Container from './Container'
import { AppDispatch } from '../store'
import { articlesData } from '../store/articlesSelectors'

const navigation = {
  pages: [{ name: 'AddNews', href: 'add-news' }],
}

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)

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
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map(page => (
                    <div key={page.name} className="flow-root">
                      <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <Container>
          <nav aria-label="Top">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="max-w-24 h-7" src={Logo} alt="" />
                </Link>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map(page => (
                    <Link
                      to={page.href}
                      className="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <Link
                    to="/search"
                    className="p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => dispatch(clearArticles())}
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
