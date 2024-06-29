import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles/articlesSlice'
import { articlesMiddleware } from './articlesMiddleware'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(articlesMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
