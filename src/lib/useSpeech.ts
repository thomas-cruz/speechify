import { useCallback, useEffect, useState } from 'react';

import { PlayingState, SpeechEngine, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine | null>(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const play = useCallback(() => {
    if (speechEngine) {
      speechEngine.play();
    }
  }, [speechEngine]);
  
  const pause = useCallback(() => {
    if (speechEngine) speechEngine.pause();
  }, [speechEngine]);

  const reset = useCallback(() => {
    setCurrentSentenceIdx(0);
    setCurrentWordRange([0, 0]);
  }, []);

  const handleOnBoundary = useCallback((e: SpeechSynthesisEvent) => {
    const currentSentence = e.utterance.text;

    if (!currentSentence) return;

    const currentCharIndex = e.charIndex;
    const currentWordLength = currentSentence.slice(currentCharIndex).split(" ")[0]?.length;
    console.log({currentCharIndex, currentWord: currentSentence.slice(currentCharIndex).split(" ")})

    setCurrentWordRange([
      currentCharIndex,
      currentCharIndex + currentWordLength,
    ]);
  }, []);

  const handleOnEnd = useCallback((e: SpeechSynthesisEvent) => {
    setCurrentSentenceIdx((prev) => prev + 1);
  }, [speechEngine, sentences, currentSentenceIdx]);

  const handleOnStateUpdate = useCallback((newState: PlayingState) => {
    setPlaybackState(newState);
  }, []);

  useEffect(() => {
    if (!sentences.length) return;

    const speechEngine = createSpeechEngine({
      onBoundary: handleOnBoundary,
      onEnd: handleOnEnd,
      onStateUpdate: handleOnStateUpdate,
    });

    setSpeechEngine(speechEngine);

    return () => {
      speechEngine.cancel();
    };
  }, [sentences]);

  useEffect(() => {
    if (speechEngine && sentences.length && sentences[currentSentenceIdx]) {
      speechEngine.load(sentences[currentSentenceIdx]);
    }
    // if (speechEngine && currentSentenceIdx >= sentences.length) {
    //   speechEngine?.cancel();
    // }
  }, [speechEngine, sentences, currentSentenceIdx]);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    reset,
  };
};

export { useSpeech };
