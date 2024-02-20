import { FC, useEffect, useState } from 'react'
import countriesData from '../utils/data/countriesData'
import categoriesData from '../utils/data/categoriesData'
import Container from './Container'
import { fetchArticles } from '../store/articles/articlesActions'
import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../store/articles/articlesSlice'
import Article from './Article'
import Select from './Select'

const MainPage: FC = () => {
  const dispatch = useDispatch()
  const { articles } = useSelector(articlesData)
  const [category, setCategory] = useState({ name: 'Select a category' })
  const [country, setCountry] = useState(countriesData[51])

  const containsSelect = /Select/i.test(category.name)
  const categoryToSendOrEmpty = containsSelect ? '' : category.name

  useEffect(() => {
    if (country.short || categoryToSendOrEmpty) {
      dispatch(fetchArticles({ country: country.short, category: categoryToSendOrEmpty }))
    }
  }, [country, categoryToSendOrEmpty, dispatch])

  return (
    <Container>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Headline Highlights: Filtered News by Country and Category</h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Explore the latest headline highlights filtered by country and category. Customize your news feed to stay up-to-date with the top headlines that matter to you.
        </p>
      </div>
      <div className='flex max-w-md'>
        <Select dataSelect={category} options={categoriesData} onSelect={setCategory} optionName='category' />
        <Select dataSelect={country} options={countriesData} onSelect={setCountry} optionName='country' />
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {country.short || categoryToSendOrEmpty ?
          articles.map((item: ArticleInterface) => <Article {...item} />)
          :
          <p className='text-gunmetal'>Select one or two options. At least one filter must be selected.</p>
        }
      </div>
    </Container>
  )
}

export default MainPage