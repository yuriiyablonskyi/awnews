import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { ArticlesState } from './articlesTypes'
import { fetchArticles } from './articlesActions'
import { mockedArticles } from '../../mock/mockedArticles'

const initialState: ArticlesState = {
  articles: [],
  customArticles: mockedArticles,
  totalResults: 0,
  loading: false,
  filterCalendar: {},
}

const articlesSlice = createSlice({
  name: 'articlesData',
  initialState,
  reducers: {
    clearArticles: state => {
      state.articles = []
      state.totalResults = 0
      state.loading = false
      state.filterCalendar = {}
    },
    setCalendar: (state, action) => {
      state.filterCalendar = action.payload
    },
    // addNote: (state, action: PayloadAction<Note>) => {
    //   state.notes.push(action.payload)
    // },
    // removeNote: (state, action: PayloadAction<string>) => {
    //   state.notes = state.notes.filter(note => note.id !== action.payload)
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.totalResults = action.payload.totalResults
        state.loading = false
      })
      .addMatcher(isAnyOf(fetchArticles.rejected), state => {
        state.loading = false
      })
      .addMatcher(isAnyOf(fetchArticles.pending), (state, action) => {
        state.loading = action.meta.requestStatus === 'pending'
      })
  },
})

export const { clearArticles, setCalendar } = articlesSlice.actions
export default articlesSlice.reducer
