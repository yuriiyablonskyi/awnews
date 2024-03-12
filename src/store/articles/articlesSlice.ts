import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleInterface, RootState } from '../../types'

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addArticlesSuccess: (
      state,
      action: PayloadAction<{
        articles: ArticleInterface[]
        totalResults: number
      }>,
    ) => {
      state.articles = action.payload.articles
      state.totalResults = action.payload.totalResults
      state.error = null
      state.loading = false
    },
    addArticlesFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
      state.loading = false
    },
    clearArticles: state => {
      state.articles = []
      state.totalResults = 0
      state.error = null
      state.loading = false
    },
  },
})

export const {
  addArticlesSuccess,
  addArticlesFailure,
  clearArticles,
  setLoading,
} = articlesSlice.actions
export default articlesSlice.reducer
