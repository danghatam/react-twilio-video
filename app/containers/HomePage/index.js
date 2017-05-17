/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectToken, makeSelectIdentity } from '../App/selectors';
import { makeSelectPreviewTracks, makeSelectActiveRoom, makeSelectLogs } from './selectors';
import {
  Camera,
  Preview,
  Room,
  Log,
} from '../../components';
import { getToken } from '../App/actions';
import { setPreviewTracks, setActiveRoom, addLog } from './actions';
import './style.css';

class HomePage extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetToken();
  }
  render() {
    return (
      <div>
        <Camera />
        <div id="controls">
          <Preview
            onSetPreviewTracks={this.props.onSetPreviewTracks}
            previewTracks={this.props.previewTracks}
            onAddLog={this.props.onAddLog}
          />
          <Room
            token={this.props.token}
            identity={this.props.identity}
            previewTracks={this.props.previewTracks}
            activeRoom={this.props.activeRoom}
            onSetActiveRoom={this.props.onSetActiveRoom}
            onAddLog={this.props.onAddLog}
          />
        </div>
        <Log logs={this.props.logs} />
      </div>
    );
  }
}

HomePage.propTypes = {
  token: React.PropTypes.string,
  identity: React.PropTypes.string,
  previewTracks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  logs: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  activeRoom: React.PropTypes.object,
  onGetToken: React.PropTypes.func,
  onSetPreviewTracks: React.PropTypes.func,
  onSetActiveRoom: React.PropTypes.func,
  onAddLog: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  identity: makeSelectIdentity(),
  previewTracks: makeSelectPreviewTracks(),
  logs: makeSelectLogs(),
  activeRoom: makeSelectActiveRoom(),
});

const mapDispatchToProps = (dispatch) => ({
  onGetToken: () => {
    dispatch(getToken());
  },
  onSetPreviewTracks: (tracks) => {
    dispatch(setPreviewTracks(tracks));
  },
  onSetActiveRoom: (room) => {
    dispatch(setActiveRoom(room));
  },
  onAddLog: (log) => {
    dispatch(addLog(log));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
