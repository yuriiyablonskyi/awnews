import { ArticleInterface } from '../types'
import DefaultImg from '../assets/al.png'
import { FC } from 'react'

const Article: FC<ArticleInterface> = ({ author, title, description, url, urlToImage, publishedAt }) => {
  const date = new Date(publishedAt).toLocaleString().replace(/,/g, '')
  return (
    <>
      <a className='flex max-w-xl flex-col items-start justify-between border-b border-light pb-1' href={url} target='_blank'>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={urlToImage || DefaultImg}
            alt={urlToImage}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className='group relative'>
          <h3 className='font-serif font-medium text-2xl leading-6'>{title}</h3>
          <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{description}</p>
        </div>
        <div className='flex items-center justify-between text-xs mt-3 w-full'>
          <p className='text-gray-600'>{author}</p>
          <time dateTime={date} className='text-gray-500'>
            {date}
          </time>
        </div>
      </a >
    </>
  )
}

export default Article