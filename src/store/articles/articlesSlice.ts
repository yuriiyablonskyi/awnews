import { createSlice } from '@reduxjs/toolkit'
import { fetchArticles } from './articlesActions'
import { ArticlesState } from '../../types'

const initialState: ArticlesState = {
  articlesData: { articles: [] },
  loading: false,
  error: null,
}

const articlesSlice = createSlice({
  name: 'articlesData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articlesData = action.payload
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default articlesSlice.reducer  