import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Article from '../components/Article'
import Container from '../components/Container'
import Datepicker from '../components/Datepicker'
import Pagination from '../components/Pagination'
import Select from '../components/Select'
import SkeletonArticle from '../components/SkeletonArticle'
import { fetchArticles } from '../store/articles/articlesActions'
import { clearArticles, setCalendar } from '../store/articles/articlesSlice'
import {
  ArticleInterface,
  ArticlesState,
  CalendarType,
  SelectableItem,
  useAppDispatch,
  useAppSelector,
} from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import addTimeZoneToDates from '../utils/addTimeZoneToDates'
import classNames from '../utils/classNames'
import findByShort from '../utils/findByShort'
import languagesData from '../utils/languagesData'
import sortByData from '../utils/sortByData'

const Search: FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading }: ArticlesState = useAppSelector(articlesData)
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') ?? '')
  const [language, setLanguage] = useState<SelectableItem>({ name: '' })
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') ?? '')
  const urlParamFrom = searchParams.get(CalendarType.FROM)
  const urlParamTo = searchParams.get(CalendarType.TO)

  const dispatchUrlParams = () => {
    if (urlParamFrom && !urlParamTo) {
      return dispatch(setCalendar({ type: CalendarType.FROM, singleDate: urlParamFrom }))
    } else if (!urlParamFrom && urlParamTo) {
      return dispatch(setCalendar({ type: CalendarType.TO, singleDate: urlParamTo }))
    } else if (urlParamFrom && urlParamTo) {
      return dispatch(setCalendar({ type: CalendarType.RANGE, singleDate: urlParamFrom, dateRange: urlParamTo }))
    }
  }

  const sendRequest = (urlParams: URLSearchParams) => {
    if (keyword) {
      const updatedParams = addTimeZoneToDates(urlParams)
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: updatedParams,
        }),
      )
    }
  }

  useEffect(() => {
    if (searchParams.get('language')) {
      const newLanguage = findByShort(searchParams.get('language') ?? '', languagesData)
      newLanguage && setLanguage(newLanguage)
    }

    dispatchUrlParams()
    sendRequest(searchParams)
  }, [])

  const handleSelectChange = (key: string, value?: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    if (keyword) {
      newSearchParams.set('page', '1')
    } else {
      newSearchParams.delete('page')
    }
    setSearchParams(newSearchParams)
    return newSearchParams
  }

  const handleLanguage = (value: SelectableItem) => {
    const newSearchParams = handleSelectChange('language', value.short)
    setLanguage(value)
    sendRequest(newSearchParams)
  }

  const handleSorting = (value: string) => {
    const newSearchParams = handleSelectChange('sortBy', value)
    setSortBy(value)
    sendRequest(newSearchParams)
  }

  const handleClearFilter = () => {
    setKeyword('')
    setLanguage({ name: '', short: '' })
    setSortBy('')
    dispatch(clearArticles())
    setSearchParams(new URLSearchParams())
  }

  const renderContent = () => {
    const errorMessageStyles = 'text-base mt-8 text-center'
    const skeletonCount = !articles.length ? 3 : 9
    if (loading) {
      return [...Array(skeletonCount)].map((_, index) => <SkeletonArticle key={index} />)
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
    return <p className={errorMessageStyles}>Start your search to see results.</p>
  }

  return (
    <Container>
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
          Article Search: Explore Content Based on Your Query
        </h2>
        <p className="text-base leading-8 font-sans mb-1.5">
          Search articles effortlessly and refine your query using convenient filters
        </p>
      </div>
      <div className="flex border-b border-b-stone-300 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value)
            handleSelectChange('q', e.target.value)
          }}
          onKeyDown={e => e.key === 'Enter' && sendRequest(searchParams)}
          className="w-full py-4 outline-none"
          placeholder="Searching by keyword..."
        />
        <div className="flex justify-between items-center min-w-20">
          <button
            onClick={handleClearFilter}
            className=" text-gray-400 hover:text-gray-500"
            aria-label="Clear all filters"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button
            onClick={() => sendRequest(searchParams)}
            className={classNames(
              'text-gray-400',
              keyword && 'hover:text-gray-500 cursor-pointer',
              !keyword && 'cursor-auto',
            )}
            aria-label="Start search"
            disabled={!keyword}
          >
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-wrap">
        <div className="flex flex-wrap sm:flex-wrap">
          <Select
            dataSelect={language.name}
            options={languagesData}
            onSelect={(newLanguage: SelectableItem) => handleLanguage(newLanguage)}
            optionName="language"
          />
          <Select
            dataSelect={sortBy}
            options={sortByData}
            onSelect={(newSortByData: SelectableItem) => handleSorting(newSortByData.name)}
            optionName="sort by"
          />
        </div>
        <Datepicker />
      </div>
      <div
        className={classNames(
          'mx-auto',
          loading || !!articles.length
            ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 mb-12'
            : 'text-center',
        )}
      >
        {renderContent()}
      </div>
      {!!articles.length && !loading && <Pagination totalResults={totalResults} endpoint="everything" />}
    </Container>
  )
}

export default Search
