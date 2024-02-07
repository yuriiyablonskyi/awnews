import { createSlice } from '@reduxjs/toolkit'
import { fetchArticles } from './articlesActions'

interface Source {
  id?: string
  name: string
}
export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  content: string
}

export interface RootState {
  totalResults: number;
  articles: Article[];
  searchQuery?: string;
}

interface ArticlesState {
  articlesData: RootState
  loading: boolean
  error?: null | string
}

const initialState: ArticlesState = {
  articlesData: { totalResults: 0, articles: [], searchQuery: '' },
  loading: false,
  error: null,
}

const articlesSlice = createSlice({
  name: 'articlesData',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.articlesData.searchQuery = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articlesData = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSearchQuery } = articlesSlice.actions
export default articlesSlice.reducer