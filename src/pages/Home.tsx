import { FC, useEffect, useState } from 'react'
import countriesData from '../utils/data/countriesData'
import categoriesData from '../utils/data/categoriesData'
import Container from '../components/Container'
import { fetchArticles } from '../store/articles/articlesActions'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../types'
import Article from '../components/Article'
import Select from '../components/Select'
import { SelectableItem } from '../types'
import Pagination from '../components/Pagination'
import SkeletonArticle from '../components/SkeletonArticle'
import { clearArticles } from '../store/articles/articlesSlice'
import Calendar from '../components/Calendar'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface ArticlesState {
  articles: ArticleInterface[]
  totalResults: number
  loading: boolean
  error: string | null
}

const Home: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const [category, setCategory] = useState<string>(searchParams.get('category') || '')
  const [country, setCountry] = useState<{ short: string }>({ short: 'ua' })
  const isBothSelected = country.short || category

  const updateURLParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    setSearchParams(newSearchParams)
  }

  const handleClearFilter = () => {
    setCategory('')
    setCountry({ short: '' })
    dispatch(clearArticles())
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('page')
    setSearchParams(newSearchParams)
  }

  const handleCountry = (value: string) => {
    updateURLParams('country', value)
    setCountry({ short: value })
  }

  const handleCategory = (value: string) => {
    updateURLParams('category', value)
    setCategory(value)
  }

  useEffect(() => {
    // тут плохой код - задача стояла чтоб по дефолту был параметр при первом заходе на страницу
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('country', 'ua')
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }, [])

  useEffect(() => {
    // тут проверка что если нету хотяб одного параметра то не отправлять запрос
    if (searchParams.get('country') || searchParams.get('category')) {
      dispatch(
        fetchArticles({
          endpoint: 'top-headlines',
          searchParams: searchParams.toString()
        }),
      )
    }
  }, [searchParams])

  const renderContent = () => {
    if (loading) {
      return [...Array(9)].map((_, index) => <SkeletonArticle key={index} />)
    }
    if (error) {
      handleClearFilter()
      return <p>Error: {error}</p>
    }
    if (!isBothSelected) {
      handleClearFilter()
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
      <div className="flex flex-col sm:flex-row">
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
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} />}
    </Container>
  )
}

export default Home
