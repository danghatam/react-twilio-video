import { createSelector } from 'reselect';
const selectHome = (state) => state.get('home');

const makeSelectPreviewTracks = () => createSelector(
  selectHome,
  (homeState) => homeState.get('previewTracks')
);

const makeSelectActiveRoom = () => createSelector(
  selectHome,
  (homeState) => homeState.get('activeRoom')
);

const makeSelectLogs = () => createSelector(
  selectHome,
  (homeState) => homeState.get('logs')
);

export {
  makeSelectPreviewTracks,
  makeSelectActiveRoom,
  makeSelectLogs,
};
