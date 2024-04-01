import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { FC } from "react"
import ReactPaginate from "react-paginate"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { fetchArticles } from "../store/articles/articlesActions"

// важно ли расположение (порядок) параметров в url? для сервера не имеет значения, проверял (сейчас хоть и работает корректно но разное расположение всегда)
// вот чтоб проверить лично 1)https://newsapi.org/v2/everything?sort=relevancy&q=wd&page=2&language=de&pageSize=9&apiKey=1199426782d246648b7e2ae2737ed44d
//                          2)https://newsapi.org/v2/everything?q=wd&page=2&sort=relevancy&language=de&pageSize=9&apiKey=1199426782d246648b7e2ae2737ed44d 
//                          3)https://newsapi.org/v2/everything?page=2&sort=relevancy&language=de&pageSize=9&q=wd&apiKey=1199426782d246648b7e2ae2737ed44d 

const Pagination: FC<{ totalResults: number, endpoint: string }> = ({ totalResults, endpoint }) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage: number = Number(searchParams.get('page')) || 1
  // нужен ли useState в currentPage - без состояния тоже отлично работает

  const sendRequest = (urlParams: string) => {
    dispatch(
      fetchArticles({
        endpoint,
        searchParams: urlParams
      }),
    )
  }

  const handlePageClick = (event: { selected: number }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', (event.selected + 1).toString())
    setSearchParams(newSearchParams)
    sendRequest(newSearchParams.toString())
  }

  // этот кусок кода нужне лишь для отображения пользователю информации о диапазоне результатов (0 - 9, 10-18 итд)
  let endIndex = currentPage * 9;
  if (endIndex > totalResults) {
    endIndex = totalResults;
  }

  // динамические стили для активной/неактивной кнопки 
  const commonClasses = `relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`
  const buttonPrevClass = `${commonClasses} rounded-l-md ${currentPage === 1 ? 'cursor-not-allowed' : ''}`
  const buttonNextClass = `${commonClasses} rounded-r-md ${currentPage === Math.ceil(totalResults / 9) ? 'cursor-not-allowed' : ''}`

  return (
    <div className="flex flex-1 flex-col sm:flex-row  items-center sm:justify-between justify-center mb-4 ">
      <div className="order-2 sm:order-1">
        {/* сделал чтоб на маленьких екрана текст "Showing 1 to 9 of 30 results" появлялся под кнопками (свойство order-2) */}
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(Number(searchParams.get('page')) - 1) * 9 + 1}</span> to
          <span className="font-medium"> {endIndex} </span>
          of <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
      <ReactPaginate
        nextLabel={
          <button className={buttonNextClass} >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(totalResults / 9)}
        previousLabel={
          <button className={buttonPrevClass}  >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>}
        pageLinkClassName="items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-1 focus:z-20 focus:outline-offset-0 inline-flex"
        breakLabel="..."
        forcePage={currentPage - 1}
        breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        // breakLinkClassName="page-link"
        containerClassName="isolate inline-flex rounded-md shadow-sm order-1 sm:order-2 mb-2 sm:mb-0"
        activeClassName="z-10 bg-stone-400 text-white outline-offset-2 outline-indigo-600"
      />
    </div>
  )
}

export default Pagination