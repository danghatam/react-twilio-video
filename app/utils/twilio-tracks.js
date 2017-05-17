// Attach the Tracks to the DOM.
export function attachTracks(tracks, container) {
  tracks.forEach((track) => {
    container.appendChild(track.attach());
  });
}

// Attach the Participant's Tracks to the DOM.
export function attachParticipantTracks(participant, container) {
  const tracks = Array.from(participant.tracks.values());
  attachTracks(tracks, container);
}

// Detach the Tracks from the DOM.
export function detachTracks(tracks) {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove();
    });
  });
}

// Detach the Participant's Tracks from the DOM.
export function detachParticipantTracks(participant) {
  const tracks = Array.from(participant.tracks.values());
  detachTracks(tracks);
}
