import React, { Component } from 'react';
import Video from 'twilio-video';
import {
  attachTracks,
  attachParticipantTracks,
  detachTracks,
  detachParticipantTracks,
} from '../../utils/twilio-tracks';
import './style.css';

export default class Room extends Component {
  constructor() {
    super();
    this.state = {
      roomName: '',
    };
    this.roomJoined = this.roomJoined.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
    this.handleInputRoomName = this.handleInputRoomName.bind(this);
  }

  roomJoined(room) {
    this.props.onSetActiveRoom(room);

    this.props.onAddLog(`Joined as '${this.props.identity}'`);

    // Attach LocalParticipant's Tracks, if not already attached.
    const previewContainer = document.getElementById('local-media');
    if (!previewContainer.querySelector('video')) {
      attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      this.props.onAddLog(`Already in Room: '${participant.identity}'`);
      const previewContainer = document.getElementById('remote-media');
      attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      this.props.onAddLog(`Joining: '${participant.identity}'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      this.props.onAddLog(`${participant.identity} added track: ${track.kind}`);
      const previewContainer = document.getElementById('remote-media');
      attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.props.onAddLog(`${participant.identity} removed track: ${track.kind}`);
      detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      this.props.onAddLog(`Participant '${participant.identity}' left the room`);
      detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      this.props.onAddLog('Left');
      detachParticipantTracks(room.localParticipant);
      room.participants.forEach(detachParticipantTracks);
      this.props.onSetActiveRoom({});
    });
  }

  handleInputRoomName(e) {
    this.setState({
      roomName: e.target.value,
    });
  }

  handleJoinRoom() {
    const roomName = this.state.roomName;
    if (!roomName) {
      alert('Please enter a room name.');
      return;
    }

    this.props.onAddLog(`Joining room ${roomName} ...`);
    const connectOptions = {
      name: roomName,
      logLevel: 'debug',
    };
    if (this.props.previewTracks && this.props.previewTracks.length > 0) {
      connectOptions.tracks = this.props.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.props.token, connectOptions).then(this.roomJoined, (error) => {
      this.props.onAddLog(`Could not connect to Twilio: ${error.message}`);
    });
  }

  handleLeaveRoom() {
    this.props.onAddLog('Leaving room...');
    this.props.activeRoom.disconnect();
  }

  render() {
    console.log(this.props.activeRoom);
    return (
      <div id="room-controls">
        <p className="instructions">Room Name:</p>
        <input type="text" value={this.state.roomName} placeholder="Enter a room name" onChange={this.handleInputRoomName} />
        {!this.props.activeRoom.state && <button onClick={this.handleJoinRoom}>Join Room</button>}
        {(this.props.activeRoom.state === 'connected') && <button onClick={this.handleLeaveRoom}>Leave Room</button>}
      </div>
    );
  }
}

Room.propTypes = {
  token: React.PropTypes.string,
  identity: React.PropTypes.string,
  activeRoom: React.PropTypes.object,
  previewTracks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  onSetActiveRoom: React.PropTypes.func,
  onAddLog: React.PropTypes.func,
};
