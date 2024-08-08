import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'
import { fetchArticles } from '../store/articles/articlesActions'
import { PaginationProps, useAppDispatch } from '../store/articles/articlesTypes'
import classNames from '../utils/classNames'

const Pagination: FC<PaginationProps> = ({ totalResults, endpoint }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)

  let endIndex = currentPage * 9
  if (endIndex > totalResults) {
    endIndex = totalResults
  }

  const sendRequest = (urlParams: string) => {
    dispatch(
      fetchArticles({
        endpoint,
        searchParams: urlParams,
      }),
    )
  }

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', newPage.toString())
    setCurrentPage(newPage)
    setSearchParams(newSearchParams)
    sendRequest(newSearchParams.toString())
  }

  const commonClasses =
    'relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300' +
    'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
  const buttonPrevClass = classNames(commonClasses, 'rounded-l-md', currentPage === 1 && 'cursor-not-allowed')
  const buttonNextClass = classNames(
    commonClasses,
    'rounded-r-md',
    currentPage === Math.ceil(totalResults / 9) && 'cursor-not-allowed',
  )

  return (
    <div className="flex flex-1 flex-col sm:flex-row  items-center sm:justify-between justify-center mb-4 ">
      <div className="order-2 sm:order-1">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(Number(searchParams.get('page')) - 1) * 9 + 1}</span> to
          <span className="font-medium"> {endIndex} </span>
          of <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
      <ReactPaginate
        nextLabel={
          <button className={buttonNextClass}>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(totalResults / 9)}
        previousLabel={
          <button className={buttonPrevClass}>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        }
        pageLinkClassName="items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300
         hover:ring-1 focus:z-20 focus:outline-offset-0 inline-flex"
        breakLabel="..."
        forcePage={currentPage - 1}
        breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 
        ring-inset ring-gray-300 focus:outline-offset-0"
        containerClassName="isolate inline-flex rounded-md shadow-sm order-1 sm:order-2 mb-2 sm:mb-0"
        activeClassName="z-10 bg-stone-400 text-white outline-offset-2 outline-indigo-600"
      />
    </div>
  )
}

export default Pagination
