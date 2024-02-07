import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './articlesSlice'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (param) => {

    const baseURL: string = import.meta.env.VITE_API_URL
    const apiKey: string = import.meta.env.VITE_API_KEY

    let request: string = `${baseURL}${param}&apiKey=${apiKey}`


    const response = await fetch(request)

    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }

    const data: RootState = await response.json()
    return data
  }
)
