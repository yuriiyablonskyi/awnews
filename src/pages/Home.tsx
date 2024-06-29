import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Article from '../components/Article'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import Select from '../components/Select'
import SkeletonArticle from '../components/SkeletonArticle'
import { fetchArticles } from '../store/articles/articlesActions'
import { clearArticles } from '../store/articles/articlesSlice'
import {
  ArticleInterface,
  ArticlesState,
  SelectableItem,
  useAppDispatch,
  useAppSelector,
} from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'
import categoriesData from '../utils/categoriesData'
import classNames from '../utils/classNames'
import countriesData from '../utils/countriesData'
import findByShort from '../utils/findByShort'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { articles, totalResults, loading }: ArticlesState = useAppSelector(articlesData)
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? '')
  const [country, setCountry] = useState<SelectableItem>({ name: '' })

  const sendRequest = (urlParams: string) => {
    dispatch(
      fetchArticles({
        endpoint: 'top-headlines',
        searchParams: urlParams,
      }),
    )
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (!newSearchParams.toString()) {
      newSearchParams.set('country', 'ua')
      newSearchParams.set('page', '1')
      setCountry({ name: 'Ukraine', short: 'ua' })
    } else if (searchParams.get('country')) {
      const newCountry = findByShort(searchParams.get('country') ?? '', countriesData)
      newCountry && setCountry(newCountry)
    }

    sendRequest(newSearchParams.toString())
    setSearchParams(newSearchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCategory = (value: string) => {
    handleSelectChange('category', value)
    setCategory(value)
  }

  const handleCountry = (value: SelectableItem) => {
    handleSelectChange('country', value.short)
    setCountry(value)
  }

  const handleSelectChange = (key: string, value: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    if (newSearchParams.has('category') || newSearchParams.has('country')) {
      newSearchParams.set('page', '1')
      sendRequest(newSearchParams.toString())
    } else {
      newSearchParams.delete('page')
      dispatch(clearArticles())
    }
    setSearchParams(newSearchParams)
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
    return <p className={errorMessageStyles}>Select one or two options. At least one filter must be selected.</p>
  }

  return (
    <Container>
      <div className="mb-4">
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
          dataSelect={country.name}
          options={countriesData}
          onSelect={(newCountry: SelectableItem) => handleCountry(newCountry)}
          optionName="country"
        />
      </div>
      <div
        className={classNames(
          loading || !!articles.length
            ? 'grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:grid-cols-3 mb-12'
            : 'text-center',
        )}
      >
        {renderContent()}
      </div>
      {!!articles.length && !loading && <Pagination totalResults={totalResults} endpoint="top-headlines" />}
    </Container>
  )
}

export default Home
