import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles/articlesSlice'
import searchedArticlesReducer from './search/searchSlice'
export default configureStore({
  reducer: {
    articles: articlesReducer,
    searchedArticles: searchedArticlesReducer
  }
})