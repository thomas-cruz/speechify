import React from 'react';

import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  const handlePlayPause: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state !== 'playing') {
      play();
    } else {
      pause();
    }
  }

  const handleLoadNewContent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state === 'playing') {
      pause();
    }

    loadNewContent();
  }

  return <div>
    <button type='button' onClick={handlePlayPause}>{state === "playing" ? "Pause" : "Play"}</button>
    <button type='button' onClick={handleLoadNewContent}>Load new content</button>
  </div>;
};
