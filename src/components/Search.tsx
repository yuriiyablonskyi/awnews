import { useState } from 'react'
import { fetchArticles } from '../store/articles/articlesActions'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from "../store/articles/articlesSlice"
import SearchSvg from '../assets/search.svg'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    dispatch(fetchArticles(searchTerm))
    dispatch(setSearchQuery(searchTerm))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='flex bg-gray-300'>
      <img src={SearchSvg} alt="" />
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full p-2 outline-none bg-gray-300"
        placeholder="Searching by keyword..."
      />
      <button onClick={handleSearch}>search</button>
      {/* <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-y-0 w-screen bg-gray-300 h-full z-0'></div> */}
    </div>
  )
}

export default Search