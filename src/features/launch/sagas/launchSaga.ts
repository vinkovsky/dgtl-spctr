import { call, put, takeEvery } from 'redux-saga/effects'
import { launchActions } from '@features/launch/slices/launchSlice'

const fetchLaunchesFromApi = () => fetch('https://api.spacexdata.com/v5/launches')

function* getLaunchFetch() {
  try {
    const data = yield call(fetchLaunchesFromApi)
    const json = yield call(() => new Promise((res) => res(data.json())))
    yield put(launchActions.setLaunchSuccess(json))
  } catch (error) {
    console.log((error as Error).message)
    yield put(launchActions.getLaunchFailure('Failed to fetch launches list.'))
  }
}

export default function* launchSaga() {
  const { type } = launchActions.getLaunchFetch
  yield takeEvery(type, getLaunchFetch)
}
