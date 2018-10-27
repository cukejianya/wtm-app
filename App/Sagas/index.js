import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import MovesApi from '../Services/MovesApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { MovesTypes } from '../Redux/MovesRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getMoves } from './MovesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const movesApi = DebugConfig.useFixtures ? FixtureAPI : MovesApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(MovesTypes.MOVES_REQUEST, getMoves, movesApi)
  ])
}
