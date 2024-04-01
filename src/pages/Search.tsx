import { FC, KeyboardEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from '../components/Container'
import Select from '../components/Select'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import { fetchArticles } from '../store/articles/articlesActions'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface, ArticlesState, SelectableItem } from '../types'
import Article from '../components/Article'
import { clearArticles } from '../store/articles/articlesSlice'
import SkeletonArticle from '../components/SkeletonArticle'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'

const Search: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const keyword: string | undefined = (searchParams.get('q') || '')
  const language: { short: string | null } = ({ short: searchParams.get('language') } || '')
  const sortBy: string | undefined = (searchParams.get('sortBy') || '')
  // не пойму почему иногда надо надо указать null а иногда undefined 

  useEffect(() => sendRequest(searchParams.toString()), [])

  const handleClearFilter = () => {
    dispatch(clearArticles())
    const paramsToDelete = ['sortBy', 'q', 'language', 'page']
    const newSearchParams = new URLSearchParams(searchParams)
    paramsToDelete.forEach(param => {
      newSearchParams.delete(param)
    })
    setSearchParams(newSearchParams)
  }

  // имеет ли значение порядок размещение функций (тоесть может какую то наверх а какую то вниз подвинуть?)
  const getDataByParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    newSearchParams.set('page', '1')
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

  const handleSorting = (value: string) => {
    getDataByParams('sortBy', value)
  }

  const handleLanguage = (value: string | undefined) => {
    getDataByParams('language', value)
  }

  const sendRequest = (urlParams: string) => {
    if (keyword) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: urlParams
        }),
      )
    }
  }

  // есть 3 функции для обработки input, кажеться многовато
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleKeyword()
    }
  }

  const handleKeyword = () => {
    getDataByParams('q', keyword)
  }

  //эта функция создана для того чтоб избавиться от useState в пользу параметров как источника данных
  const inputOnChangeHandler = (keyword: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (keyword) {
      newSearchParams.set('q', keyword)
    } else {
      newSearchParams.delete('q')
    }
    setSearchParams(newSearchParams)
  }

  const renderContent = () => {
    {
      console.log({ error: Boolean(error), loading: Boolean(loading), articles: Boolean(articles.length), keyword: Boolean(searchParams.get('q')), totalResults });
    }
    // консоль чтоб проверять как сделать отображение "Start your search...", пока единственное решение это useState (для отображения пагинации тоже б пригодилось)
    if (loading) {
      return [...Array(9)].map((_, index) => <SkeletonArticle key={index} />)
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
    return <p className="text-gunmetal">No articles found.</p>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputOnChangeHandler(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full py-4 outline-none"
          placeholder="Searching by keyword..." />
        <div className="flex justify-between items-center min-w-20">
          <button onClick={handleClearFilter} className=" text-gray-400 hover:text-gray-500" title='Clear all filters'>
            <span className="sr-only">Clear filter</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button onClick={handleKeyword} className="text-gray-400 hover:text-gray-500" title='Start search'>
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <Select
          dataSelect={language.short}
          options={languagesData}
          onSelect={(newLanguage: SelectableItem) => handleLanguage(newLanguage.short)}
          optionName="language"
        />
        <Select
          dataSelect={sortBy}
          options={sortByData}
          onSelect={(newSortByData: SelectableItem) => handleSorting(newSortByData.name)}
          optionName='sort by'
        />
      </div>
      <p className="text-gunmetal text-center mt-3.5">Start your search to see results.</p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {renderContent()}
      </div>
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} endpoint='everything' />}
    </Container>
  )
}

export default Search
