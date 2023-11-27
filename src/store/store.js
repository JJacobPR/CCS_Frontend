import { configureStore } from '@reduxjs/toolkit'
import cookieReducer from './cookieSlice'

export const store = configureStore({
  reducer: {
    cookies: cookieReducer
  },
})