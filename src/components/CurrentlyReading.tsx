/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {

  const isCurrentWord = (word: string) => {
    const wordIndex = sentences?.[currentSentenceIdx]?.indexOf(word);
    const wordIsBetweenCurrentWordRange = wordIndex >= currentWordRange[0] && wordIndex < currentWordRange[1];
    return wordIsBetweenCurrentWordRange;
  }

  return <div data-testid="currently-reading" className="currently-reading">
    <p
      data-testid="current-sentence"
      className="currently-reading-text"
    >
      {sentences?.[currentSentenceIdx]?.split(" ").map((word, wordIndex) => {
        const isCurrent = isCurrentWord(word);

        return (
          <>
            <Word key={`w-${wordIndex}`} highlighted={isCurrent} content={word} />
            {" "}
          </>
        )
      })}
      <br /><br />
    </p>

    {sentences.map((sentence, index) => (
      <p
        key={`p-${index}`}
        data-testid={index === currentSentenceIdx ? "current-sentence" : ""}
      >

        {sentence.split(" ").map((word, wordIndex) => {
          // const wordIsBetweenCurrentWordRange = wordIndex >= currentWordRange[0] && wordIndex < currentWordRange[1];
          // const wordIsInCurrentSentence = index === currentSentenceIdx;
          // const wordIsTheCurrentWord = wordIsInCurrentSentence && wordIsBetweenCurrentWordRange;

          return (
            <>
              <Word key={`w-${wordIndex}`} highlighted={false} content={word} />
              {" "}
            </>
          )
        })}
      </p>
    ))}
    <br />
  </div>;
};

function Word({ content, highlighted }: { highlighted: boolean, content: string }): JSX.Element {
  return (
    <span
      data-testid={highlighted ? "current-word" : ""}
      className={highlighted ? "currentword" : ""}
    >
      {content}
    </span>
  );
};
