import { FC, KeyboardEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from './Container'
import Select from './Select'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import { fetchSearchedArticles } from '../store/search/searchActions'
import { searchedArticlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../types'
import Article from './Article'

const Search: FC = () => {
  const dispatch = useDispatch()
  const { articles } = useSelector(searchedArticlesData)
  console.log(articles)

  const [keyword, setKeyword] = useState('')
  const [language, setLanguage] = useState('Select a language')
  const [sortBy, setSortBy] = useState('publishedAt')


  const containsSelect = /Select/i.test(language)
  const languageToSendOrEmpty = containsSelect ? '' : language.short
  console.log(languageToSendOrEmpty);

  const handleSearch = () => {
    console.log('cc')

    dispatch(fetchSearchedArticles({ keyword, language: languageToSendOrEmpty, sortBy }))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Container>
      <div className='flex border-b border-b-stone-300 mb-4'>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          className='w-full py-4 outline-none'
          placeholder='Searching by keyword...'
        />
        <div className='flex justify-between items-center min-w-20'>
          <button className=' text-gray-400 hover:text-gray-500'>
            <span className='sr-only'>Clear text</span>
            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
          </button>
          <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
          <button onClick={handleSearch} className='text-gray-400 hover:text-gray-500'>
            <span className='sr-only'>Search</span>
            <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row'>
        <Select dataSelect={language} options={languagesData}
          onSelect={(newLanguage) => {
            setLanguage(newLanguage)
            dispatch(fetchSearchedArticles({ keyword, language: languageToSendOrEmpty, sortBy }))
          }} optionName='language' />
        <Select dataSelect={sortBy} options={sortByData}
          onSelect={(newLanguage) => {
            setSortBy(newLanguage)
            dispatch(fetchSearchedArticles({ keyword, language: languageToSendOrEmpty, sortBy: sortBy.name }))
          }} optionName={'sort by'} />
      </div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12'>
        {articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)}
      </div>
    </Container>
  )
}

export default Search