import { createAsyncThunk } from '@reduxjs/toolkit'
import { addArticles } from './articlesSlice'

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

      const data = await response.json()
      return dispatch(addArticles(data))
    } catch (error) {
      // Handle errors here
      console.error('Error fetching articles:', error)
      throw error
    }
  }
)

export const fetchSearchedArticles = createAsyncThunk(
  'articles/fetchSearchedArticles',
  async ({ keyword, language, sortBy }: FilterOptionsSearched,  { dispatch }) => {
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

      const data = await response.json()
      return dispatch(addArticles(data))
    } catch (error) {
      // Handle errors here
      console.error('Error fetching articles:', error)
      throw error
    }
  }
)
