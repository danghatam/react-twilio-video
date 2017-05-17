/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeEvery } from 'redux-saga/effects';
import { getTokenSuccess, getTokenError } from 'containers/App/actions';
import { GET_TOKEN_REQUEST } from './constants';
/**
 * Github repos request/response handler
 */
export function* getToken() {
  const url = `${window.location.origin}/token`;
  const fetchGetToken = () => fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  try {
    // Call our request helper (see 'utils/request')
    const auth = yield call(fetchGetToken);
    yield put(getTokenSuccess(auth));
  } catch (err) {
    yield put(getTokenError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tokenData() {
  yield takeEvery(GET_TOKEN_REQUEST, getToken);
}

// Bootstrap sagas
export default [tokenData];
