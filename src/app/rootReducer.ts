import { combineReducers } from '@reduxjs/toolkit'
import launchReducer from '@features/launch/slices/launchSlice'
export const rootReducer = combineReducers({
  launchReducer,
})
