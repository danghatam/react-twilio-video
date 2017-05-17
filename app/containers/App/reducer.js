/*
 *
 * App reducer
 *
 */
import { fromJS } from 'immutable';

import {
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
} from './constants';

const initialState = fromJS({
  auth: {
    token: '',
    identity: '',
  },
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      return state
        .setIn(['auth', 'token'], action.auth.token)
        .setIn(['auth', 'identity'], action.auth.identity);
    case GET_TOKEN_FAILURE:
      return state
        .set('error', action.error);
    default: return state;
  }
}

export default appReducer;
