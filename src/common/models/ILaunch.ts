export interface ILaunch {
  id: string
  name: string
  rocket: string
  upcoming: boolean
  date_local: string
  flight_number: number
}

export interface ILaunchState {
  pastLaunches: ILaunch[]
  nextLaunches: ILaunch[]
  bookedLaunches: ILaunch[]
  allLaunches: ILaunch[]
  currentLaunch: ILaunch | null
  isLoading: boolean
  error: string | null
}

export interface ICurrentLaunch {
  currentLaunch: ILaunch
}
