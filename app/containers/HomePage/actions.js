import { SET_PREVIEW_TRACKS, SET_ACTIVE_ROOM, ADD_LOG } from './constants';

export function setPreviewTracks(previewTracks) {
  return {
    type: SET_PREVIEW_TRACKS,
    previewTracks,
  };
}

export function setActiveRoom(room) {
  return {
    type: SET_ACTIVE_ROOM,
    room,
  };
}

export function addLog(log) {
  return {
    type: ADD_LOG,
    log,
  };
}
