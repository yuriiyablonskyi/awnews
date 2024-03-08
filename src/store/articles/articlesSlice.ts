import { createSlice } from '@reduxjs/toolkit'
import { ArticlesState } from '../../types'

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
}

const articlesSlice = createSlice({
  name: 'articlesData',
  initialState,
  reducers: {
    //* не получаеться сделать немутируемой
    addArticles: (state, action) => {
      state.articles = action.payload
    },
    clearArticles: (state) => {
      return {
        ...state,
        articles: []
      }
    },
  }
})

export const { addArticles, clearArticles } = articlesSlice.actions
export default articlesSlice.reducer