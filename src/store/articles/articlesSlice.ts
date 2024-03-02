import { createSlice } from '@reduxjs/toolkit'
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
    addArticles: (state, action) => {
      state.articlesData = action.payload
    },
  }
})

export const { addArticles } = articlesSlice.actions
export default articlesSlice.reducer