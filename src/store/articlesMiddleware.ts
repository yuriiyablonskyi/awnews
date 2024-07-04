import { Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { FetchArticlesPayload } from './articles/articlesTypes'

export const articlesMiddleware: Middleware = () => (next: (action: any) => unknown) => (action: any) => {
  if (action.type.startsWith('articles/fetchArticles')) {
    const actionTypeEnding = action.type.split('/').pop()

    switch (actionTypeEnding) {
      case 'fulfilled':
        if ((action.payload as FetchArticlesPayload).totalResults > 0) {
          toast.success('Articles successfully loaded!')
        } else {
          toast.info('Request successful, but no articles found.')
        }
        break

      case 'rejected':
        toast.error(action.payload as string)
        break

      default:
        break
    }
  }

  return next(action)
}
