import { all } from 'redux-saga/effects'
import launchSaga from '@features/launch/sagas/launchSaga'

export function* rootSaga() {
  yield all([launchSaga()])
}
