import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/Container'
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Test from '../components/Test'
import Article from '../components/Article'
import { ArticleInterface, ArticlesState } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'

const AddNews = () => {
  const { customArticles }: ArticlesState = useSelector(articlesData)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Container>
        <div className="mb-4">
          <h2 className="text-2xl font-bold font-serif tracking-tight sm:text-3xl">
            Submit Your News: Share Your Stories with AWNews
          </h2>
          <p className="text-base leading-8 font-sans mb-1.5">
            Add your articles, share important events, and edit or delete them anytime. Become part of our community and
            help us keep everyone updated with the latest news.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="mb-4 w-14 ml-auto rounded-md flex justify-center bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
        <Test isOpen={open} onOpen={setOpen} />
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-12">
          {customArticles.map((item: ArticleInterface) => (
            <Article key={item.id} {...item} />
          ))}
        </div>
        {/* <button onClick={() => dispatch(removeNote(note.id))}>Delete</button> */}
      </Container>
    </div>
  )
}

export default AddNews
