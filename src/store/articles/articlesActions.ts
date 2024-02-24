import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../types'

export interface FilterOptions {
  country: string
  category: string
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ country, category }: FilterOptions) => {
    try {
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY

      let request: string = `${baseURL}/top-headlines?`

      if (country) {
        request += `country=${country}&`
      }
      if (category) {
        request += `category=${category}&`
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
