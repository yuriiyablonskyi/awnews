import { createAsyncThunk } from '@reduxjs/toolkit'
import handleResponse from '../../utils/handleResponse'
import { FetchArticlesParams } from './articlesTypes'

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

      return handleResponse(response, rejectWithValue)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
