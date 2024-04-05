import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {
    currentWordRange,
    currentSentenceIdx,
    playbackState,
    play,
    pause,
    reset,
  } = useSpeech(sentences);

  const fetch = async () => {
    const content = await fetchContent();
    const sentencesArr = parseContentIntoSentences(content);
    setSentences(sentencesArr)
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLoadNewContent = () => {
    fetch();
    reset();
  };

  return (
    <div className="App">
      {/* <h1>Text to speech</h1> */}
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={handleLoadNewContent}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
