import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../types'

export interface FilterOptions {
  keyword: string
  language?: string
  sortBy?: string
}

export const fetchSearchedArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ keyword, language, sortBy }: FilterOptions) => {
    try {
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY

      let request: string = `${baseURL}/everything?q=${keyword}&`

      if (language) {
        request += `language=${language}&`
      }
      if (sortBy) {
        request += `sortBy=${sortBy}&`
      }
      request += `page=1&pageSize=9&apiKey=${apiKey}`

      const response = await fetch(request)

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data: RootState = await response.json()
      return data
    } catch (error) {
      // Handle errors here
      console.error('Error fetching articles:', error)
      throw error
    }
  }
)
