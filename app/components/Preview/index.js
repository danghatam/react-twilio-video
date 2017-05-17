import React, { PureComponent } from 'react';
import Video from 'twilio-video';
import './style.css';

export default class Preview extends PureComponent {
  constructor() {
    super();
    this.handleShowPreview = this.handleShowPreview.bind(this);
  }

  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach());
    });
  }

  handleShowPreview() {
    const localTracksPromise = this.props.previewTracks && this.props.previewTracks.length > 0
      ? Promise.resolve(this.props.previewTracks)
      : Video.createLocalTracks();
    localTracksPromise.then((tracks) => {
      this.props.onSetPreviewTracks(tracks);
      const previewContainer = document.getElementById('local-media');
      if (!previewContainer.querySelector('video')) {
        this.attachTracks(tracks, previewContainer);
      }
    }, (error) => {
      console.error('Unable to access local media', error);
      this.props.onAddLog('Unable to access Camera and Microphone');
    });
  }

  render() {
    return (
      <div id="preview">
        <p className="instructions">Hello Guy !</p>
        <div id="local-media"></div>
        <button onClick={this.handleShowPreview}>Preview My Camera</button>
      </div>
    );
  }
}

Preview.propTypes = {
  previewTracks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  onSetPreviewTracks: React.PropTypes.func,
  onAddLog: React.PropTypes.func,
};
