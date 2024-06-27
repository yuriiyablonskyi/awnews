import { toast } from 'react-toastify'

export const articlesMiddleware = () => (next) => (action) => {
  if (action.type.startsWith('articles/fetchArticles')) {
    const actionTypeEnding = action.type.split('/').pop()

    switch (actionTypeEnding) {
      case 'fulfilled':
        if (action.payload.totalResults > 0) {
          toast.success('Articles successfully loaded!')
        } else {
          toast.info('Request successful, but no articles found.')
        }
        break

      case 'rejected':
        toast.error(action.payload)
        break

      default:
        break
    }
  }

  return next(action)
}
