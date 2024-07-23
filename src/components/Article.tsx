import { FireIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import { FC } from 'react'
import DefaultImg from '../assets/al.png'
import useDropDownMenu from '../hooks/useDropDownMenu'
import { removeArticle, setCurrentArticle } from '../store/articles/articlesSlice'
import { ArticleInterface, useAppDispatch } from '../store/articles/articlesTypes'
import classNames from '../utils/classNames'
import DropdownMenu from './DropdownMenu'

const Article: FC<ArticleInterface> = article => {
  const { id, author, isCustomArticle, title, description, url, urlToImage, publishedAt, isHotNews }: ArticleInterface =
    article
  const dispatch = useAppDispatch()
  const date = dayjs(publishedAt).utc(true).format('DD.MM.YYYY HH:mm:ss')
  const handleClick = () => !isCustomArticle && url && window.open(url, '_blank')
  const { articlesItems } = useDropDownMenu()

  const handleEdit = () => dispatch(setCurrentArticle(article))
  const handleDelete = () => dispatch(removeArticle(id))

  const articlesActions = {
    Edit: handleEdit,
    Delete: handleDelete,
  }

  return (
    <div
      className={classNames(
        'shadow-lg relative flex flex-col justify-between rounded-md',
        !isCustomArticle && 'cursor-pointer',
      )}
      onClick={handleClick}
    >
      {isHotNews && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded flex items-center">
          <p className="text-xs whitespace-nowrap mr-1.5">Hot News</p>
          <FireIcon className="h-6 w-6" />
        </div>
      )}
      {!url && <DropdownMenu dropdownData={articlesItems} actions={articlesActions} />}
      <div
        className="mb-3 aspect-h-1 aspect-w-1 w-full
       overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src={urlToImage || DefaultImg}
          alt={urlToImage}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-col justify-between p-3 min-h-52 break-word">
        <div className="group relative">
          <h3 className="font-serif font-medium text-3xl leading-6">{title}</h3>
          <p className="mt-4 text-lg leading-6 text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-between text-xs mt-3 w-full">
          {author && <p className="text-gray-600">{author}</p>}
          <time dateTime={date} className={classNames('text-gray-500', !author && 'ml-auto')}>
            {date}
          </time>
        </div>
      </div>
    </div>
  )
}

export default Article
