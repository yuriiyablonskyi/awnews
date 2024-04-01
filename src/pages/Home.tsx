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

const Home: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const category: string | undefined = (searchParams.get('category') || '')
  const country: { short: string | null } = ({ short: searchParams.get('country') } || { short: '' })

  const getDataByParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }

  const handleClearFilter = () => {
    dispatch(clearArticles())
    const paramsToDelete = ['category', 'country', 'page']
    const newSearchParams = new URLSearchParams(searchParams)
    paramsToDelete.forEach(param => {
      newSearchParams.delete(param)
    })
    setSearchParams(newSearchParams)
    // здесь почему-то не удаляет параметр "page", не пойму почему
  }

  const handleCountry = (value: string | undefined) => {
    getDataByParams('country', value)

  }

  const handleCategory = (value: string) => {
    getDataByParams('category', value)
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('country', 'ua')
    if (!newSearchParams.get('page')) {
      newSearchParams.set('page', '1')
    }
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }, [])


  const sendRequest = (urlParams: string) => {
    // задача стояла проверить применен ли хотяб один фильтр - если да то делать запрос, иначе очистка фильтров
    // там встречаеться английская литера c (си) (вначале проверял все слово, но уникаль даже одна буква в конкретном случае)
    if (/c/.test(urlParams)) {
      dispatch(
        fetchArticles({
          endpoint: 'top-headlines',
          searchParams: urlParams
        }),
      )
    } else {
      handleClearFilter() // если оба фильтра пустые то очищаю все (стор и параметры)
    }
  }

  const renderContent = () => {
    const isAnyFilterTrue = Boolean(country.short) || Boolean(category) // тут опять проверка что применен ли хотяб один фильтр
    if (loading) {
      return [...Array(9)].map((_, index) => <SkeletonArticle key={index} />)
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    if (!isAnyFilterTrue) {
      return <p className="text-gunmetal">Select one or two options. At least one filter must be selected.</p>
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
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
      {/* <div className="flex flex-wrap sm:flex-wrap flex-col sm:flex-row"> */}
      <div className="flex flex-wrap sm:flex-wrap">
        <Select
          dataSelect={category}
          options={categoriesData}
          onSelect={(newCategory: SelectableItem) => handleCategory(newCategory.name)}
          optionName="category"
        />
        <Select
          dataSelect={country.short}
          options={countriesData}
          onSelect={(newCountry: SelectableItem) => handleCountry(newCountry.short)}
          optionName="country"
        />
        {/* <CalendarIcon /> */}
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {renderContent()}
      </div>
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} endpoint='top-headlines' />}
    </Container>
  )
}

export default Home
