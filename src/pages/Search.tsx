import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from '../components/Container'
import Select from '../components/Select'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import { fetchArticles } from '../store/articles/articlesActions'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../types'
import Article from '../components/Article'
import { clearArticles } from '../store/articles/articlesSlice'
import SkeletonArticle from '../components/SkeletonArticle'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'

interface ArticlesState {
  articles: ArticleInterface[]
  totalResults: number
  loading: boolean
  error: string | null
}

const Search: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') || '')
  const [language, setLanguage] = useState<{ short: string }>({ short: searchParams.get('language') } || '')
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || '')
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false)
  // создал такую переменную (isRequestSent) чтоб отображать "Start your search to see results." когда запрос не уходил и нету статей

  const handleClearFilter = () => {
    setKeyword('')
    setLanguage({ short: '' })
    setSortBy('')
    dispatch(clearArticles())
    setIsRequestSent(false)

    // тут сброс всех параметров при очистке фильтра
    const paramsToDelete = ['page', 'sortBy', 'q', 'language']
    const newSearchParams = new URLSearchParams(searchParams)
    paramsToDelete.forEach(param => {
      newSearchParams.delete(param)
    })
    setSearchParams(newSearchParams)
  }

  const updateURLParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    newSearchParams.set('page', '1') // когда только отправился запрос (первый раз) то отображает в параметрах page=1
    setSearchParams(newSearchParams)
  }

  const handleSorting = (value: string) => {
    // нашел почему не изменялись статьи при изменении фильтра - у нас стало "sort" а надо "sortBy"
    updateURLParams('sortBy', value)
    setSortBy(value)
  }

  const handleLanguage = (value: string) => {
    updateURLParams('language', value)
    setLanguage({ short: value })
  }

  const sendRequest = () => {
    if (keyword) {
      setIsRequestSent(true)
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: searchParams.toString()
        }),
      )
    }
  }

  useEffect(() => {
    sendRequest()
  }, [searchParams])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleKeyword()
    }
  }

  const handleKeyword = () => {
    updateURLParams('q', keyword)
    setKeyword(keyword)
  }

  const renderContent = () => {
    if (loading) {
      return [...Array(9)].map((_, index) => <SkeletonArticle key={index} />)
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
    if (isRequestSent) {
      return <p className="text-gunmetal">No articles found.</p>
    }
    return <p className="text-gunmetal">Start your search to see results.</p>
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
        Article Search: Explore Content Based on Your Query
      </h2>
      <p className="text-base leading-8 font-sans mb-1.5">
        Search articles effortlessly and refine your query using convenient
        filters
      </p>
      <div className="flex border-b border-b-stone-300 mb-4">
        <input type="text"
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value)
            if (!e.target.value) {
              handleClearFilter()// когда пользователь убирает текст из input, нужно наверн все сбросить?
              // также сброс делаю когда ошибка
            }
          }
          }
          onKeyDown={handleKeyPress}
          className="w-full py-4 outline-none"
          placeholder="Searching by keyword..." />
        <div className="flex justify-between items-center min-w-20">
          <button onClick={handleClearFilter}
            className=" text-gray-400 hover:text-gray-500">
            <span className="sr-only">Clear filter</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button onClick={handleKeyword}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <Select
          dataSelect={language.short}
          options={languagesData}
          onSelect={newLanguage => handleLanguage(newLanguage.short)}
          optionName="language"
        />
        <Select
          dataSelect={sortBy}
          options={sortByData}
          onSelect={newSortByData => handleSorting(newSortByData.name)}
          optionName='sort by'
        />
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {renderContent()}
      </div>
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} />}
    </Container>
  )
}

export default Search
