import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles/articlesSlice'
export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
})
