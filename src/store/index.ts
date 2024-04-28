import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles/articlesSlice'
const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export default store
