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
  const [category, setCategory] = useState(categoriesData[0])
  const [country, setCountry] = useState(countriesData[52])

  useEffect(() => {
    if (country.short || category.name) {
      dispatch(fetchArticles({ country: country.short, category: category.name }))
    }
  }, [country, category, dispatch])

  return (
    <Container>
      <div className='flex max-w-md'>
        <Select dataSelect={category} options={categoriesData} onSelect={setCategory} />
        <Select dataSelect={country} options={countriesData} onSelect={setCountry} />
      </div>
      {/* <div>
        <label htmlFor='country'>Country:</label>
        <select id='country' value={country} onChange={e => setCountry(e.target.value)}>
          <option value=''>Select a country</option>
          {countriesData.map(({ short, full }: Country) => <option key={short} value={short}>{full}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor='category'>Category:</label>
        <select id='category' value={category} onChange={e => setCategory(e.target.value)}>
          <option value=''>Select a category</option>
          {categoriesData.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </div> */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {country.short || category.name ?
          articles.map((item: ArticleInterface) => <Article {...item} />)
          :
          <p className='text-gunmetal'>Select one or two options. At least one filter must be selected.</p>
        }
      </div>
    </Container>
  )
}

export default MainPage