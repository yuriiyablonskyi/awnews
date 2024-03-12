import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from '../components/Container'
import Select from '../components/Select'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import { fetchSearchedArticles } from '../store/articles/articlesActions'
import { articlesData } from '../store/articlesSelectors'
import { ArticleInterface } from '../types'
import Article from '../components/Article'
import { clearArticles, setLoading } from '../store/articles/articlesSlice'
import SkeletonArticle from '../components/SkeletonArticle'
import Pagination from '../components/Pagination'

const Search: FC = () => {
  const dispatch = useDispatch()
  const { articles, totalResults, loading, error } = useSelector(articlesData)
  const [keyword, setKeyword] = useState('')
  const [language, setLanguage] = useState<{ short: string }>({ short: '' })
  const [sortBy, setSortBy] = useState('')
  const languageName = language.short
  const hasArticles = !!articles.length
  const isKeywordEmpty = keyword === ''

  const handleSearch = () => {
    if (isKeywordEmpty) return alert('No keywords')
    dispatch(clearArticles())
    dispatch(setLoading(true))
    dispatch(fetchSearchedArticles({ keyword, language: languageName, sortBy }))
  }

  const handleClearFilter = () => {
    setKeyword('')
    setLanguage({ short: '' })
    setSortBy('')
    dispatch(clearArticles())
  }

  useEffect(() => {
    if (isKeywordEmpty) return
    handleSearch()
  }, [keyword, language, sortBy, dispatch])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
        Article Search: Explore Content Based on Your Query
      </h2>
      <p className="text-base leading-8 font-sans mb-1.5">
        Search articles effortlessly and refine your query using convenient
        filters
      </p>
      <div className="flex border-b border-b-stone-300 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full py-4 outline-none"
          placeholder="Searching by keyword..."
        />
        <div className="flex justify-between items-center min-w-20">
          <button
            onClick={handleClearFilter}
            className=" text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Clear filter</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button
            onClick={handleSearch}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <Select
          dataSelect={languageName}
          options={languagesData}
          onSelect={newLanguage => setLanguage(newLanguage)}
          optionName="language"
        />
        <Select
          dataSelect={sortBy}
          options={sortByData}
          onSelect={newSortByData => setSortBy(newSortByData.name)}
          optionName={'sort by'}
        />
      </div>

      {error && <p>Error: {error}</p>}
      {isKeywordEmpty && !loading && !error && !hasArticles && (
        <p className="text-gunmetal">Start your search to see results.</p>
      )}
      {!loading && !error && !hasArticles && !isKeywordEmpty && (
        <p className="text-gunmetal">No articles found.</p>
      )}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {loading &&
          [...Array(6)].map((_, index) => <SkeletonArticle key={index} />)}
        {!loading &&
          !error &&
          hasArticles &&
          articles.map((item: ArticleInterface, id: number) => (
            <Article key={id} {...item} />
          ))}
      </div>
      {hasArticles && <Pagination totalResults={totalResults} />}
    </Container>
  )
}

export default Search
