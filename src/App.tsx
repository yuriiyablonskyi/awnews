  import { useDispatch, useSelector } from 'react-redux'
  import { articlesData } from './store/articlesSelectors'
  import Header from './components/Header'
  import { fetchArticles } from './store/articles/articlesActions'
  import Search from './components/Search'
  import { useEffect, useState } from 'react'
  import countriesData, { Country } from './utils/data/countriesData'
  import categoriesData from './utils/data/categoriesData'
  import languagesData from './utils/data/languagesData'
  import { Article } from './store/articles/articlesSlice'
  import areFilterOptionsEmpty from './utils/functions/areFilterOptionsEmpty'

  const App: React.FC = () => {

    const [filterOptions, setFilterOptions] = useState({
      country: '',
      category: 'general',
      language: '',
    });

    const dispatch = useDispatch()

    useEffect(() => {
      if (!areFilterOptionsEmpty(filterOptions)) {
        dispatch(fetchArticles(filterOptions));
      }
    }, [filterOptions]);

    const { articles } = useSelector(articlesData)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, filterKey: string) => {
      setFilterOptions({
        ...filterOptions,
        [filterKey]: e.target.value
      });
    }

    return (
      <div className='max-w-screen-xl mt-0 mb-0 mx-auto'>
        <Header />
        <Search />
        <div>
          <label htmlFor="country">Country:</label>
          <select id="country" value={filterOptions.country} onChange={e => handleChange(e, 'country')}>
            <option value="">Select a country</option>
            {countriesData.map(({ short, full }: Country) => <option key={short} value={short}>{full}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={filterOptions.category} onChange={e => handleChange(e, 'category')}>
            <option value="">Select a category</option>
            {categoriesData.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <select id="language" value={filterOptions.language} onChange={e => handleChange(e, 'language')}>
            <option value="">Select a language</option>
            {languagesData.map(({ short, full }: Country) => <option key={short} value={short}>{full}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto', maxWidth: '1500px', fontFamily: 'sans-serif' }}>
          {articles.map((item: Article) => (
            <div style={{ border: '3px solid #eee', borderRadius: '10px', width: '400px', height: 'auto', padding: '10px', cursor: 'pointer', margin: '0 10px 10px' }}>
              <img src={item.urlToImage} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} alt="Article" />
              <h3>{item.title}</h3>
              <p>{item.author}</p>
              <p>{item.content}</p>
              <p>{item.description}</p>
            </div>
          ))}
          {areFilterOptionsEmpty(filterOptions) && <p style={{ textAlign: 'center' }}>No articles to display. Please select at least one filter option.</p>}
        </div>
      </div>
    )
  }

  export default App
