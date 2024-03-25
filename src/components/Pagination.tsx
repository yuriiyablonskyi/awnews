import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC, useEffect, useState } from 'react'
import { Link, useSearchParams, } from 'react-router-dom'

const Pagination: FC<{ totalResults: number }> = ({ totalResults }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  const totalPages = Math.ceil(totalResults / 9)


  const updateParams = (newPage) => {
    console.log({ component: 'Pagination* ', func: 'updateParams', currentPage });
    const params = Object.fromEntries(searchParams.entries())
    const newParams = {}
    for (const [key, value] of Object.entries(params)) {
      newParams[key] = value
    }
    newParams['page'] = String(newPage)
    setSearchParams(newParams)
  }

  // useEffect(() => {
  //   console.log({ component: 'Pagination* first useEffect', currentPage });
  //   updateParams()
  // }, [currentPage])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // updateParams()
    }
  }

  const handleNextPage = (e) => {
    e.preventDefault()
    console.log({ component: 'Pagination* ', func: 'handleNextPage', currentPage });
    const newPage = currentPage + 1;
    setCurrentPage(newPage)
    updateParams(newPage)
    console.log({ component: 'Pagination* ', func: 'handleNextPage', currentPage });
    // if (currentPage < totalPages) {
    // }
  }

  const buttonClasses = `
  relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
  ${currentPage === 1 ? 'cursor-not-allowed' : ''}
`
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{Math.ceil(totalResults / 9)}</span>{' '}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={buttonClasses}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to="/1"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {currentPage}
            </Link>
            <Link
              to="/2"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {currentPage + 1}
            </Link>
            <Link
              to="/3"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              {currentPage + 2}
            </Link>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <Link
              to={String(Math.ceil(totalResults / 9) - 2)}
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              {Math.ceil(totalResults / 9) - 2}
            </Link>
            <Link
              to={String(Math.ceil(totalResults / 9) - 1)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {Math.ceil(totalResults / 9) - 1}
            </Link>
            <Link
              to={String(Math.ceil(totalResults / 9))}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {Math.ceil(totalResults / 9)}
            </Link>
            <button
              onClick={handleNextPage
              }
              disabled={currentPage === totalPages}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
