import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://newsapi.org/v2'
const apiKey = 'apiKey=72310decc144431baadd3552440e662f'
const request = url + '/everything?q=карто&' + apiKey

export const fetchNews = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // async (param, { rejectWithValue, dispatch }) => {
    const response = await fetch(request)
    const data = await response.json()
    return data.articles
  }
)
