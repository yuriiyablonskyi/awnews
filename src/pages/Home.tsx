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

const Home: FC = () => {
  console.log('Home* updated');
  const dispatch = useDispatch()
  const { articles, totalResults, loading, error } = useSelector(articlesData)
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState(countriesData[50])
  const [searchParams, setSearchParams] = useSearchParams()
  const isBothSelected = country.short || category

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())

    if (params.country) {
      setCountry({ short: params.country })
    }
    if (params.category) {
      setCategory(params.category)
    }
  }, [])

  useEffect(() => {
    const paramsToUpdate = {}

    if (country.short) {
      paramsToUpdate.country = country.short
    }
    if (category) {
      paramsToUpdate.category = category
    }

    setSearchParams(paramsToUpdate)

    if (isBothSelected) {
      // dispatch виконується з старими даними, треба шоб спочатку обновилось searchParams а тоді вже dispatch
      dispatch(
        fetchArticles({
          endpoint: 'top-headlines',
          searchParams: searchParams.toString(),
        }),
      )
    } else {
      dispatch(clearArticles())
    }
  }, [country.short, category, searchParams, dispatch])

  return (
    <Container>
      <Calendar />
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
          onSelect={(newCategory: SelectableItem) =>
            setCategory(newCategory.name)
          }
          optionName="category"
        />
        <Select
          dataSelect={country.short}
          options={countriesData}
          onSelect={(newCountry: SelectableItem) => setCountry(newCountry)}
          optionName="country"
        />
        {/* <CalendarIcon /> */}
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {loading ? [...Array(3)].map((_, index) => <SkeletonArticle key={index} />)
          : error ? <p>Error: {error}</p>
            : !isBothSelected ? <p className="text-gunmetal">Select one or two options. At least one filter must be selected.</p>
              : articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
        }
      </div>
      {/* {!!articles.length && !loading && <Pagination totalResults={totalResults} />} */}
    </Container>
  )
}

export default Home
