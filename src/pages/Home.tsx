import { CalendarIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Article from '../components/Article'
import Calendar from '../components/Calendar'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import Select from '../components/Select'
import SkeletonArticle from '../components/SkeletonArticle'
import { fetchArticles } from '../store/articles/articlesActions'
import { clearArticles } from '../store/articles/articlesSlice'
import { ArticleInterface, ArticlesState, SelectableItem } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import categoriesData from '../utils/data/categoriesData'
import countriesData from '../utils/data/countriesData'
import classNames from '../utils/functions/classNames'
import updateSearchParams from '../utils/functions/updateSearchParams'

const Home: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading, error }: ArticlesState = useSelector(articlesData)
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? '')
  const [country, setCountry] = useState<SelectableItem>({
    name: '' ?? 'Ukraine',
    short: searchParams.get('country') ?? 'ua',
  })

  const [dateType, setDateType] = useState('')

  const [showCalendar, setShowCalendar] = useState(false)

  const handleDataFromCalendar = (data: string) => {
    setShowCalendar(false)
    if (dateType === 'From date') {
      handleSelectChange('from', data)
    } else if (dateType === 'To date') {
      handleSelectChange('to', data)
    }
    // } else if (dateType === 'From date to date' ) {
  }

  const handleCategory = (value: string) => {
    handleSelectChange('category', value)
    setCategory(value)
  }

  const handleCountry = (value: SelectableItem) => {
    handleSelectChange('country', value.short)
    setCountry(value)
  }

  const handleDate = (newDate: string) => {
    if (newDate) {
      setShowCalendar(true)
    } else {
      setShowCalendar(false)
    }
    setDateType(newDate)
  }

  const handleSelectChange = (key: string, value: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams)
    const updatedSearchParams = updateSearchParams(newSearchParams, key, value)
    if (updatedSearchParams.has('category') || updatedSearchParams.has('country')) {
      updatedSearchParams.set('page', '1')
      sendRequest(updatedSearchParams.toString())
    } else {
      updatedSearchParams.delete('page')
      dispatch(clearArticles())
    }
    setSearchParams(updatedSearchParams)
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (!newSearchParams.toString()) {
      newSearchParams.set('country', 'ua')
      newSearchParams.set('page', '1')
    }
    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
  }, [])

  const sendRequest = (urlParams: string) => {
    // dispatch(
    //   fetchArticles({
    //     endpoint: 'top-headlines',
    //     searchParams: urlParams,
    //   }),
    // )
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
      <div className="mb-4 sm:mb-4">
        <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">Stay update with AWNews</h2>
        <p className="text-base leading-8 font-sans">Select Category and/or Country</p>
      </div>
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
          onSelect={(newCountry: SelectableItem) => handleCountry(newCountry)}
          optionName="country"
        />
        {/* from=2024-04-07&to=2024-04-07 */}
        <Select
          dataSelect={dateType}
          options={[
            { id: 0, name: 'From date' },
            { id: 1, name: 'To date' },
            { id: 2, name: 'From date to date' },
          ]}
          onSelect={(newDate: SelectableItem) => handleDate(newDate.name)}
          optionName="date range"
        />
        {/* <CalendarIcon /> */}
      </div>
      {showCalendar && <Calendar onDataFromChild={handleDataFromCalendar} />}
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
      {!!articles.length && !loading && !error && <Pagination totalResults={totalResults} endpoint="top-headlines" />}
    </Container>
  )
}

export default Home
