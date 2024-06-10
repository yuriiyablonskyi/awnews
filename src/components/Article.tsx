import { FireIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import { FC } from 'react'
import DefaultImg from '../assets/al.png'
import { ArticleInterface } from '../store/articles/articlesTypes'
import DropdownMenu from './DropdownMenu'
import classNames from '../utils/classNames'

const Article: FC<ArticleInterface> = ({ id, author, title, description, url, urlToImage, publishedAt, isHotNews }) => {
  const date = dayjs(publishedAt).utc(false).format('DD.MM.YYYY HH:mm:ss')
  const isCustomArticle = author === 'Finnegan Whitmore'
  const handleClick = () => !isCustomArticle && url && window.open(url, '_blank')

  return (
    <div
      className={classNames(
        'mx-auto relative flex max-w-xl flex-col justify-between border-b border-b-stone-300 pb-1',
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
      {!url && <DropdownMenu id={String(id)} />}
      <div className="border border-stone-300 mb-3 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={urlToImage || DefaultImg}
          alt={urlToImage}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-col justify-between min-h-52">
        <div className="group relative">
          <h3 className="font-serif font-medium text-3xl leading-6 break-all">{title}</h3>
          <p className="mt-4 text-lg leading-6 text-gray-600 break-all">{description}</p>
        </div>
        <div className="flex items-center justify-between text-xs mt-3 w-full">
          {!isCustomArticle && <p className="text-gray-600">{author}</p>}
          <time dateTime={date} className="text-gray-500">
            {date}
          </time>
        </div>
      </div>
    </div>
  )
}

export default Article
