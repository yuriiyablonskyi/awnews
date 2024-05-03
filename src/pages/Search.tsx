import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Article from '../components/Article'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import Select from '../components/Select'
import SkeletonArticle from '../components/SkeletonArticle'
import { fetchArticles } from '../store/articles/articlesActions'
import { clearArticles, setCalendar } from '../store/articles/articlesSlice'
import { ArticleInterface, ArticlesState, SelectableItem } from '../store/articles/articlesTypes'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import classNames from '../utils/functions/classNames'
import Datepicker from '../components/Datepicker'
import { articlesData } from '../store/articlesSelectors'
import { AppDispatch } from '../store'

const Search: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') ?? '')
  const [language, setLanguage] = useState<SelectableItem>({ name: '', short: searchParams.get('language') ?? '' })
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') ?? '')

  const sendRequest = (urlParams: string) => {
    console.log({ sendRequest: urlParams })
    if (keyword) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: urlParams,
        }),
      )
    }
  }

  const dispatchUrlParams = () => {
    const urlParamFrom = searchParams.get('from')
    const urlParamTo = searchParams.get('to')

    console.log({ urlParamFrom, urlParamTo })

    if (urlParamFrom && !urlParamTo) {
      return dispatch(setCalendar({ type: 'from', singleDate: urlParamFrom }))
    } else if (!urlParamFrom && urlParamTo) {
      return dispatch(setCalendar({ type: 'to', singleDate: urlParamTo }))
    } else if (urlParamFrom && urlParamTo) {
      return dispatch(setCalendar({ type: 'range', singleDate: urlParamFrom, dateRange: urlParamTo }))
    }
  }

  useEffect(() => {
    console.log('use')

    dispatchUrlParams()
    sendRequest(searchParams.toString())
  }, [])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword) {
      handleSelectChange('q', keyword)
    }
  }

  const handleLanguage = (value: SelectableItem) => {
    handleSelectChange('language', value.short)
    setLanguage(value)
  }

  const handleSorting = (value: string) => {
    handleSelectChange('sortBy', value)
    setSortBy(value)
  }

  const handleSelectChange = (key: string, value: string | undefined) => {
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
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
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
    if (error) {
      return <p className={errorMessageStyles}>Error: {error}</p>
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
    if (!searchParams.get('q')) {
      return <p className={errorMessageStyles}>Start your search to see results.</p>
    }
    return <p className={errorMessageStyles}>No articles found.</p>
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
        Article Search: Explore Content Based on Your Query
      </h2>
      <p className="text-base leading-8 font-sans mb-1.5">
        Search articles effortlessly and refine your query using convenient filters
      </p>
      <div className="flex border-b border-b-stone-300 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full py-4 outline-none"
          placeholder="Searching by keyword..."
        />
        <div className="flex justify-between items-center min-w-20">
          <button
            onClick={handleClearFilter}
            className=" text-gray-400 hover:text-gray-500"
            aria-label="Clear all filters"
          >
            <span className="sr-only">Clear filter</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button
            onClick={() => handleSelectChange('q', keyword)}
            className={classNames(
              'text-gray-400',
              keyword && 'hover:text-gray-500 cursor-pointer',
              !keyword && 'cursor-auto',
            )}
            aria-label="Start search"
            disabled={!keyword}
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-wrap ">
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
        <Datepicker />
      </div>
      <div
        className={classNames(
          'mx-auto',
          loading || !!articles.length
            ? 'grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12'
            : 'text-center',
        )}
      >
        {renderContent()}
      </div>
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} endpoint="everything" />}
    </Container>
  )
}

export default Search
