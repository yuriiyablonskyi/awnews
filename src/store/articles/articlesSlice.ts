import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { mockedArticles } from '../../mock/mockedArticles'
import { fetchArticles } from './articlesActions'
import { ArticleInterface, ArticlesState, CalendarPayload, FetchArticlesPayload } from './articlesTypes'

const initialState: ArticlesState = {
  articles: [],
  customArticles: mockedArticles,
  totalResults: 0,
  loading: false,
  currentArticle: {},
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
    setCalendar: (state, action: PayloadAction<CalendarPayload>) => {
      state.filterCalendar = action.payload
    },
    addArticle: (state, action: PayloadAction<ArticleInterface>) => {
      state.customArticles.push(action.payload)
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      state.customArticles = state.customArticles.filter(article => article.id !== action.payload)
    },
    setCurrentArticle: (state, action: PayloadAction<ArticleInterface>) => {
      state.currentArticle = action.payload
    },
    changeCurrentArticle: (state, action: PayloadAction<ArticleInterface>) => {
      const { id, title, description, isHotNews } = action.payload
      const existingArticle = state.customArticles.find(article => article.id === id)

      if (existingArticle) {
        existingArticle.title = title
        existingArticle.description = description
        existingArticle.isHotNews = isHotNews
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<FetchArticlesPayload>) => {
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

export const { clearArticles, setCalendar, removeArticle, addArticle, setCurrentArticle, changeCurrentArticle } =
  articlesSlice.actions
export default articlesSlice.reducer
