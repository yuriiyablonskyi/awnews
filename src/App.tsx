import { useDispatch, useSelector } from 'react-redux'
import { articlesData } from './store/articlesSelectors'
import Header from './components/Header'
import { fetchArticles } from './store/articles/articlesActions'
import Search from './components/Search'
// import Hdsad from './components/Hdsad'
import { useEffect, useState } from 'react'
import countriesData, { Country } from './utils/countriesData'
import categoriesData from './utils/categoriesData'
import languagesData from './utils/languagesData'
import { Article } from './store/articles/articlesSlice'

const App: React.FC = () => {


  const [country, setCountry] = useState('us')
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    const queryParams = `/top-headlines?country=${country}${category !== '' ? `&category=${category}` : ''}${language !== '' ? `&language=${language}` : ''}`
    dispatch(fetchArticles(queryParams));
  }, [country, category, language])

  const { articles } = useSelector(articlesData)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value)
  }

  return (
    <div className='max-w-screen-xl mt-0 mb-0 mx-auto'>
      <Header />
      <Search />
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" value={country} onChange={e => handleChange(e, setCountry)}>
          {countriesData.map(({ short, full }: Country) => <option value={short}>{full}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={e => handleChange(e, setCategory)}>
          {categoriesData.map((category) => <option value={category}>{category}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="country">Language:</label>
        <select id="country" value={language} onChange={e => handleChange(e, setLanguage)}>
          {languagesData.map(({ short, full }: Country) => <option value={short}>{full}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto', maxWidth: '1500px', fontFamily: 'sans-serif' }}>

        {articles.map((item: Article) => (
          <div style={{ border: '3px solid #eee', borderRadius: '10px', width: '400px', height: 'auto', padding: '10px', cursor: 'pointer', margin: '0 10px 10px' }}>

            <img src={item.urlToImage} style={{
              maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto'
            }} />
            <h3>{item.title}</h3>
            <p>{item.author}</p>
            <p>{item.content}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {/* <Hdsad /> */}
    </div>
  )
}

export default App

