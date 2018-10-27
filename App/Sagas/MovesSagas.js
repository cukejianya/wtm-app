import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import MovesActions from '../Redux/MovesRedux'

export function * getMoves(api, action) {
  const { moves } = action
  // make the call to the api
  const response = yield call(api.getMoves, moves)

  if (response.ok) {
    const events = path(['title', 'street'], response)
    // do data conversion here if needed
    yield put(MovesActions.userSuccess(events))
  } else {
    yield put(MovesActions.userFailure())
  }
}
