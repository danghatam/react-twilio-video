import { GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE } from './constants';

export function getToken() {
  return {
    type: GET_TOKEN_REQUEST,
  };
}

export function getTokenSuccess(auth) {
  return {
    type: GET_TOKEN_SUCCESS,
    auth,
  };
}

export function getTokenError(err) {
  return {
    type: GET_TOKEN_FAILURE,
    error: err,
  };
}
