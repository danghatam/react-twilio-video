import React, { PureComponent } from 'react';
import './style.css';

export default class Log extends PureComponent {
  componentDidUpdate() {
    const log = document.getElementById('log');
    log.scrollTop = log.scrollHeight;
  }

  render() {
    const listLogs = this.props.logs.map((log, index) =>
      <p key={index}>&gt;&nbsp;{log}</p>
    );
    return (
      <div id="log">{listLogs}</div>
    );
  }
}

Log.propTypes = {
  logs: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};
