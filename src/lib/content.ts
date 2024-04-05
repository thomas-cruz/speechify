const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    const error = "<speak><s>There was an error</s></speak>";
    try {
        const res = await fetch(API_URL);
        if (res.ok) {
            const text = await res.text();
            return text;
        }

        return error;
    } catch (err) {
        return error;
    }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    const sentences = content.match(/<s>(.*?)<\/s>/g);
    return sentences ? sentences.map(s => s.replace(/<\/?s>/g, "")) : [];
};

export { fetchContent, parseContentIntoSentences };
