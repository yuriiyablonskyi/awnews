import { createSlice } from '@reduxjs/toolkit'
import { fetchNews } from './newsActions'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    loading: 'idle',
    error: null
  },

  reducers: {
    // addNewTask(state, action) {
    //   state.tasks.push(action.payload.newTask)
    // },
    // updateTaskProperty(state, action) {
    //   const { id, property, value } = action.payload
    //   state.tasks = state.tasks.map((task) =>
    //     task.id === id ? { ...task, [property]: value } : task
    //   );
    // },
    // deleteTask(state, action) {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.news = action.payload
        }
      })
      .addCase(fetchNews.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          // state.error = action.payload
        }
      })
  }
})

// export const { updateTaskProperty, deleteTask, addNewTask } = todosSlice.actions

export default newsSlice.reducer