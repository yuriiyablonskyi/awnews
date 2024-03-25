import {FC, KeyboardEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Container from '../components/Container'
import Select from '../components/Select'
import languagesData from '../utils/data/languagesData'
import sortByData from '../utils/data/sortByData'
import {fetchArticles} from '../store/articles/articlesActions'
import {articlesData} from '../store/articlesSelectors'
import {ArticleInterface} from '../types'
import Article from '../components/Article'
import {clearArticles} from '../store/articles/articlesSlice'
import SkeletonArticle from '../components/SkeletonArticle'
import Pagination from '../components/Pagination'
import {useSearchParams} from 'react-router-dom'

const Search: FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const {articles, totalResults, loading, error} = useSelector(articlesData)
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [language, setLanguage] = useState<{ short: string }>({short: ''})
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '')

  const handleClearFilter = () => {
    setKeyword('')
    setLanguage({short: ''})
    setSortBy('')
    dispatch(clearArticles())
  }

  //TODO: этот юз эффект сбрасывает урлу

  // useEffect(() => {
  //   // console.log('Search* first useEffect');
  //
  //   if (isKeywordEmpty) return console.log('Search* No keywords (setSearchParams(paramsToUpdate))')
  //
  //   const paramsToUpdate: ParamsToUpdate = {}
  //
  //   // if (!isKeywordEmpty) {
  //   //   paramsToUpdate.q = keyword
  //   // }
  //   if (language.short) {
  //     paramsToUpdate.language = language.short
  //   }
  //   if (sortBy) {
  //     paramsToUpdate.sortBy = sortBy
  //   }
  //   setSearchParams(paramsToUpdate)
  // }, [keyword, language, sortBy])

  const handleKeyword = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('q', value);
    setSearchParams(newSearchParams);

    setKeyword(value)
  }

  //TODO: change sort, lan, page, keyword
  const updateURLParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set('sort', value);
    } else {
      newSearchParams.delete('sort')
    }
    setSearchParams(newSearchParams);
  }

  const handleSorting = (value: string) => {
    updateURLParams('sort', value)
    setSortBy(value)
  }

  //TODO: change logic
  useEffect(() => {
    if (keyword) {
      dispatch(
        fetchArticles({
          endpoint: 'everything',
          searchParams: searchParams.toString()
        }),
      )
    }
  }, [searchParams])

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams.entries())
  //
  //   // if (params.q) {
  //   //   setKeyword(params.q)
  //   // }
  //   if (params.language) {
  //     setLanguage({short: params.language})
  //   }
  //   // if (params.sortBy) {
  //   //   setSortBy(params.sortBy)
  //   // }
  // }, [])


  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Search* EnterEnterEnterEnterEnterEnterEnter');
      //TODO: add logic
    }
  }

  const renderContent = () => {
    if (loading) {
      return [...Array(3)].map((_, index) => <SkeletonArticle key={index}/>)
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    if (keyword === '') {
      return <p className="text-gunmetal">Start your search to see results.</p>
    }
    if (articles.length) {
      return articles.map((item: ArticleInterface, id: number) => <Article key={id} {...item} />)
    }
    return <p className="text-gunmetal">No articles found.</p>
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
        <input type="text"
               value={keyword}
               onChange={e => handleKeyword(e.target.value)}
               onKeyDown={handleKeyPress}
               className="w-full py-4 outline-none"
               placeholder="Searching by keyword..."/>
        <div className="flex justify-between items-center min-w-20">
          <button onClick={handleClearFilter}
                  className=" text-gray-400 hover:text-gray-500">
            <span className="sr-only">Clear filter</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
          <button
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <Select
          dataSelect={language.short}
          options={languagesData}
          onSelect={newLanguage => setLanguage(newLanguage)}
          optionName="language"
        />
        <Select
          dataSelect={sortBy}
          options={sortByData}
          onSelect={newSortByData => handleSorting(newSortByData.name)}
          optionName={'sort by'}
        />
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
        {renderContent()}
      </div>
      {!!articles.length && !loading && <Pagination totalResults={totalResults}/>}
    </Container>
  )
}

export default Search
