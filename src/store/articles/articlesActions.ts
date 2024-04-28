import { createAsyncThunk } from '@reduxjs/toolkit'

interface FetchArticlesParams {
  endpoint: string
  searchParams: string
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ endpoint, searchParams }: FetchArticlesParams, { rejectWithValue }) => {
    try {
      const baseURL: string = import.meta.env.VITE_API_URL
      const apiKey: string = import.meta.env.VITE_API_KEY
      const params: URLSearchParams = new URLSearchParams()
      params.append('pageSize', '9')
      params.append('apiKey', apiKey)

      const request = `${baseURL}/${endpoint}?${searchParams}&${params.toString()}`
      const response = await fetch(request)

      if (!response.ok) {
        const text = await response.text()
        const parsedText = JSON.parse(text).message
        throw new Error(parsedText)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)
