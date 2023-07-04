/*
 * @Author: Leo
 * @Date: 2023-07-04 12:20:52
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 12:38:23
 * @FilePath: \event-calculator\src\Redux\Store.js
 * @Description: 
 */
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice/eventSlice';

export const store = configureStore({
  reducer: {
    event: counterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})