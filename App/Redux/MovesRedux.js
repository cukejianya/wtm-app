import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  movesRequest: ['all'],
  movesSuccess: ['events'],
  movesFailure: null
})

export const MovesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  events: null,
  fetching: null,
  error: null,
  all: null
})

/* ------------- Selectors ------------- */

export const MovesSelectors = {
  selectEvent: state => state.moves
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { all }) =>
  state.merge({ fetching: true, all, events: null })

// successful avatar lookup
export const success = (state, action) => {
  const { events } = action
  return state.merge({ fetching: false, error: null, events })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, events: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVES_REQUEST]: request,
  [Types.MOVES_SUCCESS]: success,
  [Types.MOVES_FAILURE]: failure
})
