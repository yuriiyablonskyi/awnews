import { FC, useEffect } from 'react'
import countriesData from '../utils/data/countriesData'
import categoriesData from '../utils/data/categoriesData'
import Container from '../components/Container'
import { fetchArticles } from '../store/articles/articlesActions'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface, ArticlesState } from '../types'
import Article from '../components/Article'
import Select from '../components/Select'
import { SelectableItem } from '../types'
import Pagination from '../components/Pagination'
import SkeletonArticle from '../components/SkeletonArticle'
import { clearArticles } from '../store/articles/articlesSlice'
import Calendar from '../components/Calendar'
import { CalendarIcon } from '@heroicons/react/24/outline'
import updateSearchParams from '../utils/functions/updateSearchParams'

const Home: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const category: string = searchParams.get('category') ?? ''
  const country: SelectableItem = { name: '', short: searchParams.get('country') ?? '' }

  const handleSelectChange = (key: string, value: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams)
    const updatedSearchParams = updateSearchParams(newSearchParams, key, value)
    if (updatedSearchParams.has('category') || updatedSearchParams.has('country')) {
      sendRequest(newSearchParams.toString())
    } else {
      updatedSearchParams.delete('page')
      dispatch(clearArticles()) // если оба фильтра пустые то очищаю стор
    }
    setSearchParams(updatedSearchParams)
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (!newSearchParams.toString()) { // если параметров нету (значит первый вход на страницу) то добавляю дефолтные
      newSearchParams.set('country', 'ua')
      newSearchParams.set('page', '1')
    }
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }, [])

  const sendRequest = (urlParams: string) => {
    dispatch(
      fetchArticles({
        endpoint: 'top-headlines',
        searchParams: urlParams
      }),
    )
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
    return <p className={errorMessageStyles}>Select one or two options. At least one filter must be selected.</p>
  }

  return (
    <Container>
      {/* <Calendar /> */}
      <div className="mb-4 sm:mb-4">
        <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
          Stay update with AWNews
        </h2>
        <p className="text-base leading-8 font-sans">
          Select Category and/or Country
        </p>
      </div>
      <div className="flex flex-wrap sm:flex-wrap">
        <Select
          dataSelect={category}
          options={categoriesData}
          onSelect={(newCategory: SelectableItem) => handleSelectChange('category', newCategory.name)}
          optionName="category"
        />
        <Select
          dataSelect={country.short}
          options={countriesData}
          onSelect={(newCountry: SelectableItem) => handleSelectChange('country', newCountry.short)}
          optionName="country"
        />
        {/* <CalendarIcon /> */}
      </div>
      <div className={`mx-auto ${loading || !!articles.length ? 'grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12' : 'text-center'}`}>
      {renderContent()}
      </div>
      {!!articles.length && !loading && !error && < Pagination totalResults={totalResults} endpoint='top-headlines' />}
    </Container>
  )
}

export default Home