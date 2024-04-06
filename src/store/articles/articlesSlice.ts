import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { ArticleInterface } from './articlesTypes'
import { fetchArticles } from './articlesActions'

interface RootState {
  articles: ArticleInterface[]
  totalResults: number
  error: string | null
  loading: boolean
}

const initialState: RootState = {
  totalResults: 0,
  articles: [],
  error: null,
  loading: false,
}

const articlesSlice = createSlice({
  name: 'articlesData',
  initialState,
  reducers: {
    clearArticles: state => {
      state.articles = []
      state.totalResults = 0
      state.error = null
      state.loading = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.totalResults = action.payload.totalResults
        state.error = null
        state.loading = false
      })
      .addMatcher(isAnyOf(fetchArticles.rejected), (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addMatcher(isAnyOf(fetchArticles.pending), (state, action) => {
        state.loading = action.meta.requestStatus === 'pending'
      })
  },
})

export const { clearArticles } = articlesSlice.actions
export default articlesSlice.reducer
