import { useAuth0 } from '@auth0/auth0-react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import AccessDenied from '../components/AccessDenied'
import AddNewsModal from '../components/AddNewsModal'
import Article from '../components/Article'
import Container from '../components/Container'
import { ArticleInterface, useAppSelector } from '../store/articles/articlesTypes'
import { articlesData } from '../store/articlesSelectors'

const AddNews: FC = () => {
  const { customArticles, currentArticle } = useAppSelector(articlesData)
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth0()
  useEffect(() => setOpen(!!currentArticle), [currentArticle])

  if (!isAuthenticated) {
    return <AccessDenied />
  }

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
          className="mx-auto mb-4 w-full sm:max-w-xl lg:ml-auto lg:mr-0 lg:w-14 rounded-md flex justify-center 
          bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
        <AddNewsModal isOpen={open} onOpen={setOpen} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 mb-12">
          {customArticles.map((item: ArticleInterface) => (
            <Article key={item.id} {...item} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AddNews
