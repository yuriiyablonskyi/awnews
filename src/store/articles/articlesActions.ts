import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addArticlesFailure,
  addArticlesSuccess,
  setLoading,
} from './articlesSlice'

interface FetchArticlesParams {
  endpoint: string
  searchParams: string
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ endpoint, searchParams }: FetchArticlesParams, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY
      const params = new URLSearchParams()
      // params.append('page', page)
      params.append('pageSize', '9')
      params.append('apiKey', apiKey)

      const request = `${baseURL}/${endpoint}?${searchParams}&${params.toString()}`
      const response = await fetch(request)

      if (!response.ok) {
        const text = await response.text()
        const parsedText = JSON.parse(text).message
        throw new Error(parsedText)
      }

      const data = await response.json()
      return dispatch(addArticlesSuccess(data))
    } catch (error) {
      // забрати console.error
      console.error('Error fetching articles:', error)
      dispatch(addArticlesFailure(error.message || 'Failed to fetch articles'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  },
)
