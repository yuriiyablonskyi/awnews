import { Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { FetchArticlesPayload } from './articles/articlesTypes'

const CHANGE_CURRENT_ARTICLE = 'articlesData/changeCurrentArticle'
const ADD_ARTICLE = 'articlesData/addArticle'
const REMOVE_ARTICLE = 'articlesData/removeArticle'
const FETCH_ARTICLES_FULFILLED = 'articles/fetchArticles/fulfilled'
const FETCH_ARTICLES_REJECTED = 'articles/fetchArticles/rejected'

export const articlesMiddleware: Middleware = () => (next: (action: any) => unknown) => (action: any) => {
  switch (action.type) {
    case CHANGE_CURRENT_ARTICLE:
      toast.success('Article successfully edited!')
      break

    case ADD_ARTICLE:
      toast.success('Article successfully added!')
      break

    case REMOVE_ARTICLE:
      toast.success('Article successfully removed!')
      break

    case FETCH_ARTICLES_FULFILLED:
      if ((action.payload as FetchArticlesPayload).totalResults === 0) {
        toast.info('Request successful, but no articles found.')
      }
      break

    case FETCH_ARTICLES_REJECTED:
      toast.error(action.payload as string)
      break

    default:
      break
  }

  return next(action)
}
