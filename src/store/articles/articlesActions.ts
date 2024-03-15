import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addArticlesFailure,
  addArticlesSuccess,
  setLoading,
} from './articlesSlice'

interface FilterOptionsMain {
  country: string
  category: string
}

interface FilterOptionsSearched {
  keyword: string
  language?: string
  sortBy?: string
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ country, category }: FilterOptionsMain, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY
      const params = new URLSearchParams()
      if (country) {
        params.append('country', country)
      }
      if (category) {
        params.append('category', category)
      }
      params.append('page', '1')
      params.append('pageSize', '9')
      params.append('apiKey', apiKey)

      const request = `${baseURL}/top-headlines?${params.toString()}`
      const response = await fetch(request)

      if (!response.ok) {
        const text = await response.text()
        const parsedText = JSON.parse(text).message
        throw new Error(parsedText)
      }

      const data = await response.json()
      return dispatch(addArticlesSuccess(data))
    } catch (error) {
      console.error('Error fetching articles:', error)
      dispatch(addArticlesFailure(error.message || 'Failed to fetch articles'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const fetchSearchedArticles = createAsyncThunk(
  'articles/fetchSearchedArticles',
  async (
    { keyword, language, sortBy }: FilterOptionsSearched,
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true))
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY
      const params = new URLSearchParams()

      params.append('q', keyword)
      if (language) {
        params.append('language', language)
      }
      if (sortBy) {
        params.append('sortBy', sortBy)
      }
      params.append('page', '1')
      params.append('pageSize', '9')
      params.append('apiKey', apiKey)

      const request = `${baseURL}/everything?${params.toString()}`
      const response = await fetch(request)

      if (!response.ok) {
        const text = await response.text()
        const parsedText = JSON.parse(text).message
        throw new Error(parsedText)
      }

      const data = await response.json()
      return dispatch(addArticlesSuccess(data))
    } catch (error) {
      console.error('Error fetching articles:', error)
      dispatch(addArticlesFailure(error.message || 'Failed to fetch articles'))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  },
)
