import { createSlice } from '@reduxjs/toolkit'
import { fetchSearchedArticles } from './searchActions'

const initialState = {
  searchedArticlesData: { articles: [] },
  loading: false,
  error: null,
}

const searchedArticlesSlice = createSlice({
  name: 'searchedArticlesData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchedArticles.fulfilled, (state, action) => {
        state.loading = false
        state.searchedArticlesData = action.payload
      })
      .addCase(fetchSearchedArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default searchedArticlesSlice.reducer  