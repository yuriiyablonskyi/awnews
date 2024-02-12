import { ArticleInterface } from '../store/articles/articlesSlice'
import formatDate from '../utils/functions/formatDate'
import DefaultImg from '../assets/al.png'

const Article: React.FC = ({ author, title, description, url, urlToImage, publishedAt }: ArticleInterface) => {
  const date: string = formatDate(publishedAt)

  return (
    <a className='flex justify-between items-center text-gunmetal gap-x-5 max-w-custom2 border-solid border-y-light border-b-2' href={url} target='_blank'>
      <img src={urlToImage || DefaultImg} className='max-w-custom1 h-auto max-h-height0 min-h-height0 block my-0 mx-auto h-7' alt='article img' />
      <div>
        <h3 className='font-serif font-medium text-2xl'>{title}</h3>
        <p className='text-lg'>{description}</p>
        <div className='flex'>
          <span className='text-lg text-steel'>{author}</span>
          <span className='text-lg text-silver'>{date}</span>
        </div>
      </div>
    </a>
  )
}

export default Article