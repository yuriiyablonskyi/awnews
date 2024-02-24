import { FC, useEffect, useState } from 'react'
import countriesData from '../utils/data/countriesData'
import categoriesData from '../utils/data/categoriesData'
import Container from './Container'
import { fetchArticles } from '../store/articles/articlesActions'
import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../types'
import Article from './Article'
import Select, { SelectableItem } from './Select'

const MainPage: FC = () => {
  const dispatch = useDispatch()
  const { articles } = useSelector(articlesData)
  const [category, setCategory] = useState('Select a category')
  const [country, setCountry] = useState(countriesData[50])


  console.log({ country, category });

  const containsSelect = /Select/i.test(category)
  const categoryToSendOrEmpty = containsSelect ? '' : category
  useEffect(() => {
    if (country.short || categoryToSendOrEmpty) {
      dispatch(fetchArticles({ country: country.short, category: categoryToSendOrEmpty }))
    }
  }, [country, category, dispatch])

  return (
    <Container>
      <div className="mb-4 sm:mb-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Headline Highlights: Stay Updated with Top News</h2>
        <p className="mt-6 text-base leading-8 text-gray-300">
          Explore the latest top and breaking headlines from around the world on our Headline Highlights page. With our user-friendly interface, you can filter news by category or country, or both, to tailor your newsfeed to your interests.
        </p>
      </div>
      <div className='flex flex-col sm:flex-row'>
        <Select dataSelect={category} options={categoriesData}
          onSelect={(newCategory: SelectableItem) => setCategory(newCategory.name)} optionName='category' />
        <Select dataSelect={country} options={countriesData}
          onSelect={(newCountry: SelectableItem) => setCountry(newCountry)} optionName='country' />
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
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