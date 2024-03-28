import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { FC } from "react"
import ReactPaginate from "react-paginate"
import { useSearchParams } from "react-router-dom"

// 1)что делать с параметром page=2 в url когда изменились параметры (keyword/language/sortBy). (сейчас сделал что при изменении параметра page=1)

// 2)важно ли расположение (порядок) параметров в url? для сервера не имеет значения, проверял (сейчас хоть и работает корректно но разное расположение всегда)
// вот чтоб проверить лично 1)https://newsapi.org/v2/everything?sort=relevancy&q=wd&page=2&language=de&pageSize=9&apiKey=1199426782d246648b7e2ae2737ed44d
//                          2)https://newsapi.org/v2/everything?q=wd&page=2&sort=relevancy&language=de&pageSize=9&apiKey=1199426782d246648b7e2ae2737ed44d 
//                          3)https://newsapi.org/v2/everything?page=2&sort=relevancy&language=de&pageSize=9&q=wd&apiKey=1199426782d246648b7e2ae2737ed44d 

const Pagination: FC<{ totalResults: number }> = ({ totalResults }) => {
  console.log('pagination rerendered');

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage: number = Number(searchParams.get('page')) || 1
  // сечас вижу ошибку - не знаю как изменить current page в библиотеке, тоесть при копировании url адреса с параметром - не применяеться к библиотеке
  const handlePageClick = (event: { selected: number }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', (event.selected + 1).toString())
    setSearchParams(newSearchParams)
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
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(Number(searchParams.get('page')) - 1) * 9 + 1}</span> to
          <span className="font-medium">{endIndex}</span>
          of <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
      <ReactPaginate
        nextLabel={
          <button
            className={buttonNextClass}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        pageCount={Math.ceil(totalResults / 9)}
        previousLabel={
          <button className={buttonPrevClass}  >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        }
        // здесь стили еще не до конца готовы
        pageClassName="page-item"
        pageLinkClassName="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-1 focus:z-20 focus:outline-offset-0 md:inline-flex"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        breakLinkClassName="page-link"
        containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
        activeClassName="z-10 bg-indigo-600 text-white outline-offset-2 outline-indigo-600"
      />
    </div>
  )
}

export default Pagination