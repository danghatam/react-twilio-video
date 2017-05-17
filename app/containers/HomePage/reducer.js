/*
 *
 * App reducer
 *
 */
import { fromJS } from 'immutable';

import {
  SET_PREVIEW_TRACKS,
  SET_ACTIVE_ROOM,
  ADD_LOG,
} from './constants';

const initialState = fromJS({
  previewTracks: [],
  activeRoom: {},
  logs: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PREVIEW_TRACKS:
      return state
        .set('previewTracks', action.previewTracks);
    case SET_ACTIVE_ROOM:
      return state
        .set('activeRoom', action.room);
    case ADD_LOG:
      return state
        .update('logs', (arr) => arr.push(action.log));
    default: return state;
  }
}

export default appReducer;
