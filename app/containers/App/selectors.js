// makeSelectLocationState expects a plain JS object for the routing state
import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectToken = () => createSelector(
  selectApp,
  (appState) => appState.getIn(['auth', 'token'])
);
const makeSelectIdentity = () => createSelector(
  selectApp,
  (appState) => appState.getIn(['auth', 'identity'])
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,
  makeSelectToken,
  makeSelectIdentity,
};
