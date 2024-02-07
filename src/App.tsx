import { useSelector } from 'react-redux'
import { articlesData } from './store/articlesSelectors'
import Header from './components/Header'
import { Article } from './store/articles/articlesActions'
import Search from './components/Search'
import Hdsad from './components/Hdsad'


const App: React.FC = () => {
  const { articles, totalResults, searchQuery } = useSelector(articlesData)
  // console.log({ articles, totalResults, searchQuery })

  return (
    <div className='max-w-screen-xl mt-0 mb-0 mx-auto'>
      <Header />
      <Search />
      <h3>{totalResults} results related to {searchQuery}</h3>
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
      <Hdsad />
    </div>
  )
}

export default App

