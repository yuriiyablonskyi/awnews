import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews } from "./store/news/newsActions"
import { newsData } from './store/newsSelectors'
import Header from "./components/Header"


const App = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchNews())
  // }, [dispatch])


  const data = useSelector(newsData)
  console.log(data);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto', maxWidth: '1500px', fontFamily: 'sans-serif' }}>

        <h1 className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
          Hello world!
        </h1>
        {data.map((item, id: number) => (
          <div style={{ border: '3px solid #eee', borderRadius: '10px', width: '400px', height: 'auto', padding: '10px', cursor: 'pointer', margin: '0 10px 10px' }}>

            <img src={item.urlToImage} key={id} style={{
              maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto'
            }} />
            <h3>{item.title}</h3>
            <p>{item.author}</p>
            <p>{item.content}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App