import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import * as R from 'ramda'

import { ILaunch, ILaunchState } from '@models/ILaunch'
import { insert } from '@utils/insert'
import { AcceptType } from '@models/AcceptType'

const initialState: ILaunchState = {
  pastLaunches: [],
  nextLaunches: [],
  bookedLaunches: [],
  allLaunches: [],
  currentLaunch: null,
  isLoading: false,
  error: null,
}

type ActionIndexesType = { id: string; hoverId: string }

export const launchSlice = createSlice({
  name: AcceptType.Launch,
  initialState,
  reducers: {
    getLaunchFetch: (state: ILaunchState) => {
      state.isLoading = true
    },
    setLaunchSuccess: (state: ILaunchState, action: PayloadAction<ILaunch[]>) => {
      // const currentDate: Date = new Date()
      // state.pastLaunches = action.payload.filter(
      //   item => new Date(item.date_local).getTime() < currentDate.getTime()
      // )
      // state.nextLaunches = action.payload.filter(
      //   item => new Date(item.date_local).getTime() > currentDate.getTime()
      // )

      state.pastLaunches = action.payload.filter((item) => !item.upcoming)
      state.nextLaunches = action.payload.filter((item) => item.upcoming)
      state.allLaunches = action.payload
      state.isLoading = false
    },
    getLaunchFailure: (state: ILaunchState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setBookedLaunch: (state: ILaunchState, action: PayloadAction<ActionIndexesType>) => {
      const elem: ILaunch[] = state.nextLaunches.filter(({ id }) => id === action.payload.id)
      const idx: number = state.bookedLaunches.findIndex(({ id }) => id === action.payload.hoverId)
      // console.log(
      //   idx !== -1
      //     ? R.insert(idx, elem, [state.bookedLaunches])
      //     : R.concat(state.bookedLaunches, elem)
      // )

      state.bookedLaunches = idx !== -1 ? insert(state.bookedLaunches, idx, elem) : [...state.bookedLaunches, ...elem]

      state.nextLaunches = state.nextLaunches.filter(({ id }) => id !== action.payload.id)
    },
    setCancelBookedLaunch: (state: ILaunchState, action: PayloadAction<ActionIndexesType>) => {
      const elem: ILaunch[] = state.bookedLaunches.filter(({ id }) => id === action.payload.id)

      const idx: number = state.nextLaunches.findIndex(({ id }) => id === action.payload.hoverId)

      state.nextLaunches = idx !== -1 ? insert(state.nextLaunches, idx, elem) : [...state.nextLaunches, ...elem]
      state.bookedLaunches = state.bookedLaunches.filter(({ id }) => id !== action.payload.id)
    },
    getCurrentLaunch: (state: ILaunchState, action: PayloadAction<string>) => {
      const [currentLaunch] = state.allLaunches.filter((launch: ILaunch) => launch.id === action.payload)

      state.currentLaunch = currentLaunch
    },
  },
})

const launchActions = launchSlice.actions
const launchReducer = launchSlice.reducer

export { launchActions }
export default launchReducer
