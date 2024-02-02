import { createSlice } from '@reduxjs/toolkit'
import { fetchNews } from './newsActions'
import { Article } from './newsActions'

interface NewsState {
  news: Article; // Замените "YourArticleType" на фактический тип статьи
  loading: 'idle' | 'pending' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: 'idle',
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.news = action.payload
        }
      })
      .addCase(fetchNews.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
        }
      })
  }
})

export default newsSlice.reducer