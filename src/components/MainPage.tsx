import { useEffect, useState } from 'react'
import countriesData, { Country } from '../utils/data/countriesData'
import areFilterOptionsEmpty from '../utils/functions/areFilterOptionsEmpty'
import withContainer from './withContainer '
import { FilterOptions, fetchArticles } from '../store/articles/articlesActions'
import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from '../store/articlesSelectors'
import categoriesData from '../utils/data/categoriesData'
import { ArticleInterface } from '../store/articles/articlesSlice'
import Article from './Article'


const defaultFilterOptions: FilterOptions = {
  country: 'us',
  category: ''
}

const MainPageWithoutContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { articles } = useSelector(articlesData)
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions)

  useEffect(() => {
    if (!areFilterOptionsEmpty(filterOptions)) {
      dispatch(fetchArticles(filterOptions))
    }
  }, [filterOptions, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, filterKey: string) => {
    setFilterOptions({
      ...filterOptions,
      [filterKey]: e.target.value
    })
  }

  return (
    <div>
      <div>
        <label htmlFor='country'>Country:</label>
        <select id='country' value={filterOptions.country} onChange={e => handleChange(e, 'country')}>
          <option value=''>Select a country</option>
          {countriesData.map(({ short, full }: Country) => <option key={short} value={short}>{full}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor='category'>Category:</label>
        <select id='category' value={filterOptions.category} onChange={e => handleChange(e, 'category')}>
          <option value=''>Select a category</option>
          {categoriesData.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>
      <div className='flex flex-wrap gap-x-10'>
        {areFilterOptionsEmpty(filterOptions) ?
          <p className='text-gunmetal'>Select one or two options. At least one filter must be selected.</p>
          :
          articles.map((item: ArticleInterface) => <Article {...item} />)
        }
      </div>
    </div>
  )
}

const MainPage = withContainer(MainPageWithoutContainer)
export default MainPage